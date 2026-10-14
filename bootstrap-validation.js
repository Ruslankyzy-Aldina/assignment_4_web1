(() => {
  const form = document.querySelector('form');
  const statusMessage = document.getElementById('form-status');

  if (!form || !statusMessage) return;

  const fields = [...form.querySelectorAll('input, textarea')].filter(
    (field) => field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement
  );
  let submitted = false;

  // Keep native validation available if JavaScript cannot load.
  form.noValidate = true;

  /** @param {HTMLInputElement | HTMLTextAreaElement} field */
  function validateField(field) {
    const valid = field.checkValidity();
    field.classList.toggle('is-valid', valid);
    field.classList.toggle('is-invalid', !valid);
    field.setAttribute('aria-invalid', String(!valid));

    const feedback = document.getElementById(`${field.id}-error`);
    if (!feedback) return valid;

    if (field.validity.valueMissing) {
      const label = field.labels?.[0]?.textContent || 'This field';
      feedback.textContent = `${label} is required.`;
    } else if (field.validity.typeMismatch) {
      feedback.textContent = 'Enter a valid email address, such as name@example.com.';
    } else if (field.validity.tooShort) {
      feedback.textContent = `Enter at least ${field.minLength} characters.`;
    } else {
      feedback.textContent = field.validationMessage;
    }
    return valid;
  }

  fields.forEach((field) => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      statusMessage.textContent = '';
      if (submitted || field.hasAttribute('aria-invalid')) validateField(field);
    });
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    submitted = true;
    const results = fields.map(validateField);
    if (results.every(Boolean)) {
      statusMessage.textContent = 'Your message is ready. Delivery is not available yet; nothing has been sent.';
    } else {
      statusMessage.textContent = 'Please correct the highlighted fields.';
      fields.find((field) => !field.validity.valid)?.focus();
    }
  });
})();
