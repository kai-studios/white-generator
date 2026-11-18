const header = document.querySelector('.site-header');
if (header) {
  const update = () => {
    if (scrollY > 8) header.setAttribute('data-scrolled', '');
    else header.removeAttribute('data-scrolled');
  };
  addEventListener('scroll', update, { passive: true });
  update();
}

const nav = document.querySelector('.nav');
const pill = nav?.querySelector('.nav__pill');
if (nav && pill) {
  const current = nav.querySelector('a[aria-current="page"]');
  const place = (link) => {
    if (!link) return pill.style.setProperty('--w', '0px');
    pill.style.setProperty('--x', `${link.offsetLeft}px`);
    pill.style.setProperty('--w', `${link.offsetWidth}px`);
  };
  nav.classList.add('has-pill');
  place(current);
  requestAnimationFrame(() => requestAnimationFrame(() => pill.setAttribute('data-ready', '')));

  for (const link of nav.querySelectorAll('a')) {
    link.addEventListener('pointerenter', () => place(link));
    link.addEventListener('focus', () => place(link));
  }
  nav.addEventListener('pointerleave', () => place(current));
  nav.addEventListener('focusout', () => place(current));
  addEventListener('resize', () => place(current), { passive: true });
}
