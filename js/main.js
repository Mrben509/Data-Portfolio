/**
 * Point d'entrée principal — initialise tous les modules
 */
document.addEventListener('DOMContentLoaded', () => {
  initComponents();
  initTheme();
  initAnimations();
  initAccordion();
  initContactForm();
  if (typeof initConversionAnimations === 'function') initConversionAnimations();
  if (typeof initDashboardDemo === 'function') initDashboardDemo();
  injectIcons();
});

/** Injecte les icônes SVG dans les éléments [data-icon] */
function injectIcons() {
  if (typeof Icons === 'undefined') return;
  document.querySelectorAll('[data-icon]').forEach((el) => {
    const icon = el.dataset.icon;
    if (Icons[icon]) el.innerHTML = Icons[icon];
  });
}
