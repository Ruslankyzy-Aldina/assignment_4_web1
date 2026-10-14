(() => {
  const form = document.getElementById('registration-form');
  const password = document.getElementById('password');
  const confirmation = document.getElementById('confirm-password');
  const statusMessage = document.getElementById('form-status');

  if (!(form instanceof HTMLFormElement) ||
      !(password instanceof HTMLInputElement) ||
      !(confirmation instanceof HTMLInputElement) || !statusMessage) return;

  // JavaScript uses HTML5 validity and Bootstrap feedback instead of browser popups.
  form.noValidate = true;

  const checkPasswords = () => {
    confirmation.setCustomValidity(
      confirmation.value && confirmation.value !== password.value
        ? 'Passwords must match.'
        : ''
    );
  };

  form.addEventListener('input', () => {
    checkPasswords();
    statusMessage.textContent = '';
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    checkPasswords();
    form.classList.add('was-validated');

    if (!form.checkValidity()) {
      statusMessage.textContent = 'Please correct the highlighted fields.';
      const firstInvalid = form.querySelector('input:invalid, select:invalid');
      if (firstInvalid instanceof HTMLElement) firstInvalid.focus();
      return;
    }

    statusMessage.textContent = 'Registration details are valid. This preview does not create an account.';
  });

  form.addEventListener('reset', () => {
    form.classList.remove('was-validated');
    confirmation.setCustomValidity('');
    statusMessage.textContent = '';
  });
})();
