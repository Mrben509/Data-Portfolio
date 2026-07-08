/**
 * Tableau de bord interactif — données et filtres (démonstration)
 */
const DASHBOARD_DATA = {
  '7j': {
    revenue: '€28 450',
    revenueChange: '+8.3%',
    monthly: '+€4 120',
    clients: '412',
    avgBasket: '€39.80',
    margin: '32.4%',
    weekBars: [45, 62, 55, 78, 70, 85, 92],
    products: [
      { name: 'Pack Premium Bio', sales: 89, pct: 78 },
      { name: 'T-shirt Collection Été', sales: 72, pct: 65 },
      { name: 'Écouteurs Sans Fil Pro', sales: 54, pct: 48 },
    ],
  },
  '30j': {
    revenue: '€124 580',
    revenueChange: '+18.2%',
    monthly: '+€19 420',
    clients: '1 847',
    avgBasket: '€42.30',
    margin: '34.1%',
    weekBars: [55, 68, 72, 80, 75, 88, 95],
    products: [
      { name: 'Pack Premium Bio', sales: 342, pct: 85 },
      { name: 'T-shirt Collection Été', sales: 287, pct: 72 },
      { name: 'Écouteurs Sans Fil Pro', sales: 198, pct: 55 },
    ],
  },
  '90j': {
    revenue: '€358 920',
    revenueChange: '+24.7%',
    monthly: '+€52 180',
    clients: '4 230',
    avgBasket: '€43.90',
    margin: '35.8%',
    weekBars: [60, 72, 78, 85, 82, 90, 98],
    products: [
      { name: 'Pack Premium Bio', sales: 1024, pct: 90 },
      { name: 'T-shirt Collection Été', sales: 856, pct: 78 },
      { name: 'Écouteurs Sans Fil Pro', sales: 612, pct: 62 },
    ],
  },
};

function initDashboardDemo() {
  const dashboard = document.getElementById('dashboard-pro');
  if (!dashboard) return;

  const filters = dashboard.querySelectorAll('.dashboard-pro__filter');

  function updateDashboard(period) {
    const data = DASHBOARD_DATA[period];
    if (!data) return;

    const set = (id, val) => {
      const el = dashboard.querySelector(`[data-kpi="${id}"]`);
      if (el) el.textContent = val;
    };

    set('revenue', data.revenue);
    set('revenueChange', data.revenueChange);
    set('monthly', data.monthly);
    set('clients', data.clients);
    set('avgBasket', data.avgBasket);
    set('margin', data.margin);

    dashboard.querySelectorAll('.week-bar__fill').forEach((bar, i) => {
      bar.style.height = (data.weekBars[i] || 50) + '%';
    });

    const tbody = dashboard.querySelector('.products-table tbody');
    if (tbody && data.products) {
      tbody.innerHTML = data.products
        .map(
          (p) => `<tr>
          <td class="product-name">${p.name}</td>
          <td>Démo</td>
          <td>${p.sales} unités</td>
          <td><div class="product-bar"><div class="product-bar__fill" style="width:${p.pct}%"></div></div></td>
        </tr>`
        )
        .join('');
    }

    filters.forEach((f) => f.classList.toggle('active', f.dataset.period === period));
  }

  filters.forEach((filter) => {
    filter.addEventListener('click', () => updateDashboard(filter.dataset.period));
  });

  updateDashboard('30j');
}
