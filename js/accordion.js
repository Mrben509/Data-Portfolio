/**
 * Système d'accordéon pour la FAQ
 */

function initAccordion() {
  const accordion = document.querySelector('.accordion');
  if (!accordion) return;

  accordion.addEventListener('click', (e) => {
    const trigger = e.target.closest('.accordion__trigger');
    if (!trigger) return;

    const item = trigger.closest('.accordion__item');
    const content = item.querySelector('.accordion__content');
    const isOpen = item.classList.contains('open');

    // Ferme tous les autres items
    accordion.querySelectorAll('.accordion__item.open').forEach((openItem) => {
      if (openItem !== item) {
        openItem.classList.remove('open');
        openItem.querySelector('.accordion__trigger').setAttribute('aria-expanded', 'false');
        openItem.querySelector('.accordion__content').style.maxHeight = null;
      }
    });

    // Bascule l'item courant
    if (isOpen) {
      item.classList.remove('open');
      trigger.setAttribute('aria-expanded', 'false');
      content.style.maxHeight = null;
    } else {
      item.classList.add('open');
      trigger.setAttribute('aria-expanded', 'true');
      content.style.maxHeight = content.scrollHeight + 'px';
    }
  });
}
