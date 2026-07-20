/**
 * Configuration centrale du site.
 * ✅ Personnalisez ici le nom, la navigation et surtout TOUT le bloc CONTACT.
 */
const SITE_CONFIG = {
  companyName: 'DataVision Analytics',
  tagline: 'Transforma tus datos en beneficios.',
  description:
    'Ayudamos a comerciantes y pymes a aumentar sus ventas, reducir costos y tomar mejores decisiones mediante análisis de datos claros y accionables.',
  url: 'https://mrben509.github.io/Data-Analytics-',
  // =========================
  // CONTACT (fácil de editar)
  // =========================
  email: 'delarobia509@gmail.com',
  // Formato recomendado: +1 849 ... (República Dominicana)
  phone: '+1 849 515 1149',
  linkedin: 'https://www.linkedin.com/company/datavision-analytics',
  address: 'Entrada A Los Conucos, Playa Juan Dolio, República Dominicana',
  // Los envíos del formulario van a `email` vía FormSubmit (sin API key).
  // Primera vez: confirma el correo de activación que FormSubmit te envía.
  year: new Date().getFullYear(),

  navigation: [
    { label: 'Inicio', href: 'index.html' },
    { label: 'Servicios', href: 'services.html' },
    { label: 'Por qué nosotros', href: 'pourquoi-nous.html' },
    { label: 'Realizaciones', href: 'realisations.html' },
    { label: 'Precios', href: 'tarifs.html' },
    { label: 'FAQ', href: 'faq.html' },
    { label: 'Contacto', href: 'contact.html' },
  ],

  social: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/datavision-analytics', icon: 'linkedin' },
    { label: 'Twitter', href: '#', icon: 'twitter' },
    { label: 'GitHub', href: '#', icon: 'github' },
  ],
};
