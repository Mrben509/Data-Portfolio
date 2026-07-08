/**
 * Validation du formulaire de contact côté client
 * Compatible avec Formspree — configurez l'endpoint dans config.js
 */

const VALIDATION_RULES = {
  name: {
    required: true,
    minLength: 2,
    message: 'Por favor, escribe tu nombre (mínimo 2 caracteres).',
  },
  company: {
    required: false,
    minLength: 2,
    message: 'El nombre de la empresa debe tener al menos 2 caracteres.',
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Por favor, escribe un email válido.',
  },
  phone: {
    required: false,
    pattern: /^[\d\s+().-]{8,}$/,
    message: 'Por favor, escribe un número de teléfono válido.',
  },
  message: {
    required: true,
    minLength: 10,
    message: 'Tu mensaje debe tener al menos 10 caracteres.',
  },
};

/** Valide un champ individuel */
function validateField(name, value) {
  const rules = VALIDATION_RULES[name];
  if (!rules) return null;

  const trimmed = value.trim();

  if (rules.required && !trimmed) {
        return 'Este campo es obligatorio.';
  }

  if (!trimmed && !rules.required) return null;

  if (rules.minLength && trimmed.length < rules.minLength) {
    return rules.message;
  }

  if (rules.pattern && !rules.pattern.test(trimmed)) {
    return rules.message;
  }

  return null;
}

/** Affiche ou masque l'erreur d'un champ */
function showFieldError(field, error) {
  const group = field.closest('.form-group');
  const errorEl = group.querySelector('.form-error');

  if (error) {
    field.classList.add('error');
    errorEl.textContent = error;
    errorEl.classList.add('visible');
  } else {
    field.classList.remove('error');
    errorEl.classList.remove('visible');
  }
}

/** Initialise le formulaire de contact */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  // ==========================================================
  // Formspree (envío del formulario)
  // - Se configura desde js/config.js -> SITE_CONFIG.formspreeEndpoint
  // - Si el endpoint NO está configurado (contiene 'VOTRE_ID'),
  //   el formulario funciona en modo demo (solo muestra éxito).
  // - Los campos enviados se basan en el formulario:
  //   name, company, email, phone, message (+ honeypot _gotcha)
  // ==========================================================
  if (SITE_CONFIG.formspreeEndpoint && !SITE_CONFIG.formspreeEndpoint.includes('VOTRE_ID')) {
    form.action = SITE_CONFIG.formspreeEndpoint;
    form.method = 'POST';
  }

  // Validation en temps réel au blur
  form.querySelectorAll('.form-input, .form-textarea').forEach((field) => {
    field.addEventListener('blur', () => {
      const error = validateField(field.name, field.value);
      showFieldError(field, error);
    });

    field.addEventListener('input', () => {
      if (field.classList.contains('error')) {
        const error = validateField(field.name, field.value);
        showFieldError(field, error);
      }
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    let isValid = true;
    const formData = new FormData(form);

    for (const [name, value] of formData.entries()) {
      if (name === '_gotcha') continue;
      const error = validateField(name, value);
      const field = form.querySelector(`[name="${name}"]`);
      if (field) showFieldError(field, error);
      if (error) isValid = false;
    }

    if (!isValid) return;

    const successEl = form.querySelector('.form-success');
    const submitBtn = form.querySelector('[type="submit"]');

    // Envío vía Formspree si está configurado
    if (form.action && !form.action.includes('VOTRE_ID')) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Enviando...';

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: { Accept: 'application/json' },
        });

        if (response.ok) {
          form.reset();
          successEl.classList.add('visible');
          setTimeout(() => successEl.classList.remove('visible'), 5000);
        } else {
          alert('Ocurrió un error. Por favor, inténtalo de nuevo o contáctanos por email.');
        }
      } catch {
        alert('No se pudo enviar el mensaje. Verifica tu conexión.');
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Enviar el mensaje';
      }
    } else {
      // Mode démo sans Formspree
      form.reset();
      successEl.classList.add('visible');
      setTimeout(() => successEl.classList.remove('visible'), 5000);
    }
  });
}
