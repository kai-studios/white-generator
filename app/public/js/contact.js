// Enhances the contact form: live character meter, and sending without a page reload.
// Without this script the form still works: it posts to /contact and the server answers.

const form = document.querySelector('.form');
const limits = window.__LIMITS__ ?? {};

// ── Character meter under the message field ────────────────────────────────
const message = document.querySelector('#message');
const counter = document.querySelector('#message-counter');
const meter = document.querySelector('#message-meter');
if (message && counter) {
  const max = limits.message ?? message.maxLength;
  const update = () => {
    const length = message.value.length;
    counter.textContent = `${length} / ${max}`;
    meter?.style.setProperty('--p', Math.min(1, length / max));
    meter?.toggleAttribute('data-near', length / max > 0.9);
  };
  message.addEventListener('input', update);
  update();
}

if (form) {
  const button = form.querySelector('button[type="submit"]');
  const success = document.querySelector('#success');

  const setError = (name, text) => {
    const field = form.querySelector(`#${name}`)?.closest('.field');
    if (!field) return;
    field.querySelector('.error')?.remove();
    field.classList.toggle('has-error', Boolean(text));
    const input = field.querySelector('input, textarea');
    if (!text) return input.removeAttribute('aria-invalid');
    const p = document.createElement('p');
    p.className = 'error';
    p.id = `${name}-error`;
    p.textContent = text;
    field.append(p);
    input.setAttribute('aria-invalid', 'true');
    input.setAttribute('aria-describedby', p.id);
  };

  // An error disappears as soon as the visitor starts fixing the field
  form.addEventListener('input', (event) => {
    if (event.target.name) setError(event.target.name, '');
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    for (const name of ['name', 'email', 'message']) setError(name, '');
    button.setAttribute('aria-busy', 'true');

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'content-type': 'application/json', accept: 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });

      if (response.status === 422) {
        const { details = [] } = await response.json();
        let first;
        for (const issue of details) {
          setError(issue.path, issue.message);
          first ??= issue.path;
        }
        form.querySelector(`#${first}`)?.focus();
        return;
      }
      if (!response.ok) throw new Error(String(response.status));

      // Swap the form for a confirmation
      form.hidden = true;
      success.hidden = false;
      success.querySelector('.success__again').focus({ preventScroll: true });
      window.toast?.('Message accepted');
      form.reset();
      message?.dispatchEvent(new Event('input'));
    } catch {
      window.toast?.('Something went wrong. Please try again.', 'error');
    } finally {
      button.removeAttribute('aria-busy');
    }
  });

  success?.querySelector('.success__again').addEventListener('click', () => {
    success.hidden = true;
    form.hidden = false;
    form.querySelector('input')?.focus();
  });
}
