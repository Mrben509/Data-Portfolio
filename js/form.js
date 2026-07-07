/**
 * Validation du formulaire de contact côté client
 * Compatible avec Formspree — configurez l'endpoint dans config.js
 */

const VALIDATION_RULES = {
  name: {
    required: true,
    minLength: 2,
    message: 'Veuillez entrer votre nom (minimum 2 caractères).',
  },
  company: {
    required: false,
    minLength: 2,
    message: 'Le nom de l\'entreprise doit contenir au moins 2 caractères.',
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Veuillez entrer une adresse email valide.',
  },
  phone: {
    required: false,
    pattern: /^[\d\s+().-]{8,}$/,
    message: 'Veuillez entrer un numéro de téléphone valide.',
  },
  message: {
    required: true,
    minLength: 10,
    message: 'Votre message doit contenir au moins 10 caractères.',
  },
};

/** Valide un champ individuel */
function validateField(name, value) {
  const rules = VALIDATION_RULES[name];
  if (!rules) return null;

  const trimmed = value.trim();

  if (rules.required && !trimmed) {
    return 'Ce champ est obligatoire.';
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

  // Configure l'action Formspree si disponible
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

    // Envoi via Formspree si configuré
    if (form.action && !form.action.includes('VOTRE_ID')) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Envoi en cours...';

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
          alert('Une erreur est survenue. Veuillez réessayer ou nous contacter par email.');
        }
      } catch {
        alert('Impossible d\'envoyer le message. Vérifiez votre connexion.');
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Envoyer le message';
      }
    } else {
      // Mode démo sans Formspree
      form.reset();
      successEl.classList.add('visible');
      setTimeout(() => successEl.classList.remove('visible'), 5000);
    }
  });
}
