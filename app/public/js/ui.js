// Small enhancements, loaded on every page. The site works without this file:
// it only adds motion (reveal, sliding nav pill, spotlight) and conveniences (copy, instant links).

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

// ── Toast: window.toast('Saved') or window.toast('Failed', 'error') ─────────
export function toast(message, kind = 'ok') {
  const region = $('#toasts');
  if (!region) return;
  const el = document.createElement('div');
  el.className = `toast${kind === 'error' ? ' toast--error' : ''}`;
  el.textContent = message;
  region.append(el);
  setTimeout(() => {
    el.dataset.leaving = '';
    el.addEventListener('animationend', () => el.remove(), { once: true });
  }, 3200);
}
window.toast = toast;

// ── Header gets a hairline and a shadow once the page scrolls ───────────────
const header = $('.site-header');
if (header) {
  const update = () => (scrollY > 8 ? header.setAttribute('data-scrolled', '') : header.removeAttribute('data-scrolled'));
  addEventListener('scroll', update, { passive: true });
  update();
}

// ── Nav pill slides to the hovered or focused link and back to the current one ─
const nav = $('.nav');
const pill = $('.nav__pill', nav ?? document);
if (nav && pill) {
  const place = (link) => {
    if (!link) return pill.style.setProperty('--w', '0px');
    pill.style.setProperty('--x', `${link.offsetLeft}px`);
    pill.style.setProperty('--w', `${link.offsetWidth}px`);
  };
  const current = () => $('a[aria-current="page"]', nav);
  nav.classList.add('has-pill');
  place(current());
  // enable transitions only after the first placement, so the pill does not fly in from the left
  requestAnimationFrame(() => requestAnimationFrame(() => pill.setAttribute('data-ready', '')));

  for (const link of $$('a', nav)) {
    link.addEventListener('pointerenter', () => place(link));
    link.addEventListener('focus', () => place(link));
  }
  nav.addEventListener('pointerleave', () => place(current()));
  nav.addEventListener('focusout', () => place(current()));
  addEventListener('resize', () => place(current()), { passive: true });
}

// ── Reveal on scroll ───────────────────────────────────────────────────────
const reveals = $$('[data-reveal]');
if (reveals.length) {
  if (!('IntersectionObserver' in window) || reduceMotion) {
    for (const el of reveals) el.classList.add('is-in');
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    );
    for (const el of reveals) io.observe(el);
  }
}

// ── Card spotlight follows the pointer (one listener, one write per frame) ──
if (matchMedia('(hover: hover)').matches && !reduceMotion) {
  let frame = 0;
  addEventListener(
    'pointermove',
    (event) => {
      const card = event.target.closest?.('.card');
      if (!card || frame) return;
      frame = requestAnimationFrame(() => {
        const box = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${event.clientX - box.left}px`);
        card.style.setProperty('--my', `${event.clientY - box.top}px`);
        frame = 0;
      });
    },
    { passive: true },
  );
}

// ── Copy buttons on code blocks ────────────────────────────────────────────
for (const button of $$('[data-copy]')) {
  button.addEventListener('click', async () => {
    const code = button.closest('.code')?.querySelector('code')?.innerText ?? '';
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      return toast('Could not copy', 'error');
    }
    const label = $('span', button);
    label.textContent = 'Copied';
    button.setAttribute('data-copied', '');
    setTimeout(() => {
      label.textContent = 'Copy';
      button.removeAttribute('data-copied');
    }, 1600);
  });
}

// ── Instant navigation: fetch a page as soon as the pointer is over its link ─
const prefetched = new Set();
const prefetch = (event) => {
  const link = event.target.closest?.('a[href]');
  if (!link || link.origin !== location.origin || link.hash || link.target || prefetched.has(link.href)) return;
  if (link.pathname === location.pathname || link.pathname.startsWith('/api/')) return;
  prefetched.add(link.href);
  const hint = document.createElement('link');
  hint.rel = 'prefetch';
  hint.href = link.href;
  document.head.append(hint);
};
addEventListener('pointerover', prefetch, { passive: true });
addEventListener('touchstart', prefetch, { passive: true });
