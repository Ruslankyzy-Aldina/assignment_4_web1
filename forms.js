const form = document.querySelector('form');
const statusMessage = document.getElementById('form-status');

// The browser runs HTML5 validation before firing the submit event.
form.addEventListener('submit', (event) => {
  event.preventDefault();
  statusMessage.textContent = 'Form accepted for this demo. No message was sent.';
});

form.addEventListener('input', () => {
  statusMessage.textContent = '';
});
