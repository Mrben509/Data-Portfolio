(() => {
  const root = document.documentElement;
  const toggle = document.querySelector('.theme-toggle');
  const system = window.matchMedia('(prefers-color-scheme: dark)');
  let manual = false;
  try { manual = ['light', 'dark'].includes(localStorage.getItem('portfolio-theme')); } catch {}
  function updateTheme(dark) {
    root.dataset.theme = dark ? 'dark' : 'light';
    toggle.setAttribute('aria-pressed', String(dark));
    document.querySelector('meta[name="theme-color"]').content = dark ? '#132234' : '#ffffff';
  }
  toggle.hidden = false;
  updateTheme(root.dataset.theme === 'dark');
  toggle.addEventListener('click', () => {
    manual = true;
    updateTheme(root.dataset.theme !== 'dark');
    try { localStorage.setItem('portfolio-theme', root.dataset.theme); } catch {}
  });
  system.addEventListener('change', event => { if (!manual) updateTheme(event.matches); });
  document.querySelectorAll('[data-language]').forEach(link => {
    // Keep the same page, query and project anchor when changing language.
    const target = new URL(link.href);
    target.search = window.location.search;
    target.searchParams.set('lang', link.dataset.language);
    target.hash = window.location.hash;
    link.href = target.href;
    link.addEventListener('click', () => {
      try { localStorage.setItem('portfolio-language', link.dataset.language); } catch {}
    });
  });
})();
