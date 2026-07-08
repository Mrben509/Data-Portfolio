/**
 * Animations au scroll et interactions de navigation
 */

/** Initialise l'Intersection Observer pour les révélations */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  reveals.forEach((el) => observer.observe(el));
}

/** Gère le header sticky au scroll */
function initStickyHeader() {
  const header = document.getElementById('header');
  if (!header) return;

  let lastScroll = 0;

  window.addEventListener(
    'scroll',
    () => {
      const currentScroll = window.scrollY;

      if (currentScroll > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      lastScroll = currentScroll;
    },
    { passive: true }
  );
}

/** Bouton retour en haut */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener(
    'scroll',
    () => {
      if (window.scrollY > 500) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    },
    { passive: true }
  );

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/** Menu mobile */
function initMobileNav() {
  document.addEventListener('click', (e) => {
    const toggle = e.target.closest('#nav-toggle');
    const nav = document.getElementById('nav');

    if (!toggle || !nav) return;

    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
    toggle.innerHTML = isOpen ? Icons.close : Icons.menu;
  });

  // Ferme le menu au clic sur un lien
  document.addEventListener('click', (e) => {
    const link = e.target.closest('.nav__link');
    const nav = document.getElementById('nav');
    const toggle = document.getElementById('nav-toggle');

    if (link && nav && nav.classList.contains('open')) {
      nav.classList.remove('open');
      if (toggle) {
        toggle.setAttribute('aria-expanded', 'false');
        toggle.innerHTML = Icons.menu;
      }
    }
  });
}

/** Lazy loading natif pour les images */
function initLazyLoading() {
  const images = document.querySelectorAll('img[loading="lazy"]');

  if ('loading' in HTMLImageElement.prototype) return;

  // Fallback pour les navigateurs sans support natif
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
        }
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
}

/** Initialise toutes les animations et interactions */
function initAnimations() {
  initScrollReveal();
  initStickyHeader();
  initBackToTop();
  initMobileNav();
  initLazyLoading();
}
