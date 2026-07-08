/**
 * Configuration centrale du site — modifiez ces valeurs pour personnaliser l'entreprise.
 * Tous les textes dynamiques et liens de contact sont centralisés ici.
 */
const SITE_CONFIG = {
  companyName: 'DataVision Analytics',
  tagline: 'Transformez vos données en décisions rentables.',
  description:
    'Nous aidons les commerçants et les PME à comprendre leurs ventes, leurs clients et leurs performances grâce à des analyses de données claires et exploitables.',
  url: 'https://mrben509.github.io/Data-Analytics-',
  email: 'contact@datavision-analytics.fr',
  phone: '+33 1 23 45 67 89',
  linkedin: 'https://www.linkedin.com/company/datavision-analytics',
  address: '12 rue de l\'Innovation, 75002 Paris',
  formspreeEndpoint: 'https://formspree.io/f/VOTRE_ID',
  year: new Date().getFullYear(),

  navigation: [
    { label: 'Accueil', href: 'index.html' },
    { label: 'Services', href: 'services.html' },
    { label: 'Pourquoi nous', href: 'pourquoi-nous.html' },
    { label: 'Réalisations', href: 'realisations.html' },
    { label: 'Tarifs', href: 'tarifs.html' },
    { label: 'FAQ', href: 'faq.html' },
    { label: 'Contact', href: 'contact.html' },
  ],

  social: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/datavision-analytics', icon: 'linkedin' },
    { label: 'Twitter', href: '#', icon: 'twitter' },
    { label: 'GitHub', href: '#', icon: 'github' },
  ],
};
