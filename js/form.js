/**
 * Validación y envío del formulario de contacto.
 * Envío vía FormSubmit con el ID activado (más seguro que el email en claro).
 *
 * Cada envío llega a delarobia509@gmail.com con:
 * - Nombre, Empresa, Email, Teléfono, Mensaje / solicitud
 * - Reply-To = email del cliente (puedes responder directo)
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

/** Endpoint FormSubmit (ID preferido, email como respaldo) */
function getFormEndpoint() {
  const id = SITE_CONFIG && SITE_CONFIG.formSubmitId;
  if (id) return 'https://formsubmit.co/ajax/' + encodeURIComponent(id);

  const email = SITE_CONFIG && SITE_CONFIG.email;
  if (email && email.includes('@')) {
    return 'https://formsubmit.co/ajax/' + encodeURIComponent(email);
  }
  return null;
}

/** Construye el payload con etiquetas claras en español para el email recibido */
function buildSubmissionPayload(form) {
  const name = (form.querySelector('[name="name"]')?.value || '').trim();
  const company = (form.querySelector('[name="company"]')?.value || '').trim();
  const email = (form.querySelector('[name="email"]')?.value || '').trim();
  const phone = (form.querySelector('[name="phone"]')?.value || '').trim();
  const message = (form.querySelector('[name="message"]')?.value || '').trim();

  const payload = {
    // Etiquetas visibles en el correo FormSubmit
    'Nombre del cliente': name,
    Empresa: company || '—',
    'Email del cliente': email,
    Teléfono: phone || '—',
    'Solicitud / Mensaje': message,
    // Metadatos FormSubmit
    _subject: 'Nueva solicitud de auditoría — ' + (name || 'Cliente'),
    _template: 'table',
    _captcha: 'false',
    _replyto: email,
  };

  return payload;
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

    const payload = buildSubmissionPayload(form);

    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.success !== 'false' && data.success !== false) {
        form.reset();
        successEl.classList.add('visible');
        setTimeout(() => successEl.classList.remove('visible'), 6000);
      } else {
        const detail =
          data.message ||
          'Ocurrió un error. Por favor, inténtalo de nuevo o escríbenos por email.';
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
