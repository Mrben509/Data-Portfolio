/**
 * Compteurs animés et barres de progression au scroll
 */

/** Formate un nombre avec séparateur de milliers */
function formatNumber(n) {
  return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

/** Anime un compteur de 0 à la valeur cible */
function animateCounter(el, target, suffix = '') {
  const duration = 2000;
  const start = performance.now();
  const startVal = 0;

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = startVal + (target - startVal) * eased;

    if (suffix === '%') {
      el.textContent = current.toFixed(1) + suffix;
    } else {
      el.textContent = formatNumber(current) + suffix;
    }

    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

/** Initialise les compteurs visibles */
function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || entry.target.dataset.counted) return;

        entry.target.dataset.counted = 'true';
        const target = parseFloat(entry.target.dataset.counter);
        const suffix = entry.target.dataset.suffix || '';
        animateCounter(entry.target, target, suffix);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.3 }
  );

  counters.forEach((el) => observer.observe(el));
}

/** Initialise les barres de progression */
function initProgressBars() {
  const bars = document.querySelectorAll('.progress-bar__fill[data-progress]');
  if (!bars.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.style.setProperty('--progress', el.dataset.progress + '%');
        el.classList.add('animated');
        observer.unobserve(el);
      });
    },
    { threshold: 0.2 }
  );

  bars.forEach((el) => observer.observe(el));
}

function initConversionAnimations() {
  initCounters();
  initProgressBars();
}
