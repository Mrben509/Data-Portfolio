/**
 * Validación y envío del formulario de contacto.
 * Los mensajes se envían a SITE_CONFIG.email vía FormSubmit (sin cuenta previa).
 * Endpoint AJAX: https://formsubmit.co/ajax/<email>
 *
 * IMPORTANTE (primera vez):
 * FormSubmit envía un correo de activación a tu bandeja.
 * Debes abrir ese email y confirmar el enlace para recibir los envíos reales.
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

/** Valida un campo individual */
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

/** Muestra u oculta el error de un campo */
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

/** Endpoint de envío hacia el email de contacto */
function getFormEndpoint() {
  const email = (SITE_CONFIG && SITE_CONFIG.email) || '';
  if (!email || !email.includes('@')) return null;
  return 'https://formsubmit.co/ajax/' + encodeURIComponent(email);
}

/** Inicializa el formulario de contacto */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const endpoint = getFormEndpoint();
  const defaultSubmitLabel = form.querySelector('[type="submit"]')?.textContent || 'Enviar';

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
      if (name.startsWith('_')) continue;
      const error = validateField(name, value);
      const field = form.querySelector(`[name="${name}"]`);
      if (field) showFieldError(field, error);
      if (error) isValid = false;
    }

    if (!isValid) return;

    const successEl = form.querySelector('.form-success');
    const submitBtn = form.querySelector('[type="submit"]');

    if (!endpoint) {
      alert('El formulario no está configurado. Contacta al administrador del sitio.');
      return;
    }

    // Metadatos FormSubmit
    formData.set('_subject', 'Nueva solicitud — DataVision Analytics');
    formData.set('_template', 'table');
    formData.set('_captcha', 'false');
    formData.set('_honey', formData.get('_gotcha') || '');

    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.success !== 'false' && data.success !== false) {
        form.reset();
        successEl.classList.add('visible');
        setTimeout(() => successEl.classList.remove('visible'), 6000);
      } else {
        const detail = data.message || 'Ocurrió un error. Por favor, inténtalo de nuevo o escríbenos por email.';
        alert(detail);
      }
    } catch {
      alert('No se pudo enviar el mensaje. Verifica tu conexión e inténtalo de nuevo.');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = defaultSubmitLabel;
    }
  });
}
