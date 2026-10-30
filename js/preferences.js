/* Applied before styles to avoid a flash of the wrong theme. No external service. */
(() => {
  const root = document.documentElement;
  let theme;
  let language;
  try {
    theme = localStorage.getItem('portfolio-theme');
    language = localStorage.getItem('portfolio-language');
  } catch { /* Preferences remain optional in restricted browsers. */ }
  const dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  root.dataset.theme = ['light', 'dark'].includes(theme) ? theme : dark ? 'dark' : 'light';
  // Spanish URLs remain the historical entry point. Localised URLs are explicit.
  if (root.lang !== 'es') return;
  const supported = ['fr', 'es', 'en'];
  const current = new URL(window.location.href);
  const explicit = current.searchParams.get('lang');
  if (supported.includes(explicit)) language = explicit;
  // Internal navigation keeps the chosen locale even if storage is blocked.
  if (!supported.includes(language) && document.referrer) {
    const previous = new URL(document.referrer);
    if (previous.origin === current.origin) return;
  }
  if (!supported.includes(language)) {
    language = (navigator.languages || [navigator.language])
      .map(value => value.toLowerCase().split('-')[0])
      .find(value => supported.includes(value)) || 'es';
  }
  if (language === 'es') return;
  const filename = current.pathname.split('/').pop() || 'index.html';
  const target = new URL(`${language}/${filename}`, current);
  target.search = current.search;
  target.hash = current.hash;
  window.location.replace(target.href);
})();
