// Character counter for the message field. The form works without this script.
const field = document.querySelector('#message');
const counter = document.querySelector('#message-counter');

if (field && counter) {
  const max = window.__LIMITS__?.message ?? field.maxLength;
  const update = () => {
    counter.textContent = `${field.value.length} / ${max}`;
  };
  field.addEventListener('input', update);
  update();
}
