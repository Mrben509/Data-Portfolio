/**
 * Gestion du thème clair/sombre
 */

const THEME_KEY = 'datavision-theme';

/** Applique le thème sur le document */
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_KEY, theme);
}

/** Récupère le thème sauvegardé ou utilise le défaut (sombre) */
function getPreferredTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved) return saved;

  if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    return 'light';
  }

  return 'dark';
}

/** Bascule entre clair et sombre */
function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  setTheme(current === 'dark' ? 'light' : 'dark');
}

/** Initialise le thème et le bouton de bascule */
function initTheme() {
  setTheme(getPreferredTheme());

  document.addEventListener('click', (e) => {
    if (e.target.closest('#theme-toggle')) {
      toggleTheme();
    }
  });
}

// Applique le thème immédiatement pour éviter le flash
setTheme(localStorage.getItem(THEME_KEY) || 'dark');
