(() => {
  const form = document.querySelector('form');
  const statusMessage = document.getElementById('form-status');

  if (!form || !statusMessage) return;

  // The browser runs HTML5 validation before firing the submit event.
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    statusMessage.textContent = 'Your message is ready. Delivery is not available yet; nothing has been sent.';
  });

  form.addEventListener('input', () => {
    statusMessage.textContent = '';
  });
})();
