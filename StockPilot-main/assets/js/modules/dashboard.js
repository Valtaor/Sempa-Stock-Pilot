/**
 * MODULE DASHBOARD
 *
 * Gère l'affichage et la logique du dashboard avec graphiques dynamiques
 */

class DashboardModule {
  constructor() {
    this.charts = {};
    this.autoRefreshInterval = null;
    this.refreshRate = 60000; // 60 secondes
    this.isInitialized = false;
  }

  /**
   * Initialise le module dashboard
   */
  async init() {
    if (this.isInitialized) {
      console.log('📊 Dashboard déjà initialisé');
      return;
    }

    console.log('📊 Initialisation du dashboard...');

    try {
      // Charger les données
      await this.loadMetrics();
      await this.loadCharts();
      await this.loadActivityFeed();
      await this.loadAlerts();

      // Démarrer le rafraîchissement automatique
      this.startAutoRefresh();

      // Bind les événements
      this.bindEvents();

      this.isInitialized = true;
      console.log('✅ Dashboard initialisé');
    } catch (error) {
      console.error('❌ Erreur initialisation dashboard:', error);
      this.showNotification('Erreur lors du chargement du dashboard', 'error');
    }
  }

  /**
   * Charge les métriques du dashboard
   */
  async loadMetrics() {
    const container = document.getElementById('dashboard-metrics');
    if (!container) {
      console.warn('Container dashboard-metrics not found');
      return;
    }

    try {
      // Afficher loader
      container.innerHTML = Loader.render({ size: 'lg', text: 'Chargement des métriques...' });

      // Appel API
      const data = await api.getDashboardMetrics();

      // Render les métriques
      this.renderMetrics(data);
    } catch (error) {
      console.error('Erreur chargement métriques:', error);
      container.innerHTML = `<div class="sp-empty-state">Erreur de chargement</div>`;
    }
  }

  /**
   * Affiche les métriques
   */
  renderMetrics(data) {
    const container = document.getElementById('dashboard-metrics');
    if (!container) return;

    // Calculer les variations
    const valueChange = data.trends?.value_change_percent || 0;
    const valueTrend = valueChange !== 0 ? {
      value: Math.abs(valueChange).toFixed(1),
      period: 'vs semaine précédente',
      direction: valueChange >= 0 ? 'up' : 'down'
    } : null;

    const movementsChange = data.trends?.movements_change_percent || 0;
    const movementsTrend = movementsChange !== 0 ? {
      value: Math.abs(movementsChange).toFixed(1),
      period: "vs hier",
      direction: movementsChange >= 0 ? 'up' : 'down'
    } : null;

    // Générer HTML
    const html = `
      <div class="sp-metrics-grid">
        ${MetricCard.render({
          title: 'Produits en stock',
          value: (data.total_products || 0).toLocaleString('fr-FR'),
          icon: 'package',
          iconColor: '#3b82f6'
        })}

        ${MetricCard.render({
          title: 'Valeur totale du stock',
          value: (data.total_value || 0).toLocaleString('fr-FR', {
            style: 'currency',
            currency: 'EUR'
          }),
          icon: 'trending-up',
          iconColor: '#10b981',
          trend: valueTrend
        })}

        ${MetricCard.render({
          title: 'Alertes stock bas',
          value: data.low_stock_count || '0',
          icon: 'alert-triangle',
          iconColor: '#f59e0b'
        })}

        ${MetricCard.render({
          title: "Mouvements aujourd'hui",
          value: data.movements_today || '0',
          icon: 'activity',
          iconColor: '#8b5cf6',
          trend: movementsTrend
        })}
      </div>
    `;

    container.innerHTML = html;

    // Initialiser les icônes
    if (window.lucide) {
      lucide.createIcons();
    }
  }

  /**
   * Charge les graphiques
   */
  async loadCharts() {
    // Vérifier que Chart.js est chargé
    if (typeof Chart === 'undefined') {
      console.warn('Chart.js non chargé, graphiques non disponibles');
      return;
    }

    // Graphique évolution valeur stock (données simulées pour l'instant)
    this.renderStockValueChart();

    // Graphique mouvements (données simulées)
    this.renderMovementsChart();

    // Graphique répartition catégories (données simulées)
    this.renderCategoriesChart();
  }

  /**
   * Affiche le graphique évolution valeur stock
   */
  renderStockValueChart() {
    const canvas = document.getElementById('chart-stock-value');
    if (!canvas) return;

    // Détruire graphique existant
    if (this.charts.stockValue) {
      this.charts.stockValue.destroy();
    }

    // Créer nouveau graphique
    this.charts.stockValue = new ChartComponent(canvas);

    // Données simulées (30 derniers jours)
    const labels = [];
    const values = [];
    const baseValue = 45000;

    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      labels.push(date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }));

      // Variation aléatoire
      const variation = (Math.random() - 0.5) * 2000;
      values.push(baseValue + variation + (i * 100));
    }

    const chartData = {
      labels: labels,
      datasets: [{
        label: 'Valeur du stock',
        data: values,
        borderColor: '#f4a412',
        backgroundColor: 'rgba(244, 164, 18, 0.1)',
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 5,
        pointBackgroundColor: '#f4a412',
        pointBorderColor: '#fff',
        pointBorderWidth: 2
      }]
    };

    this.charts.stockValue.createLineChart(chartData);
  }

  /**
   * Affiche le graphique des mouvements
   */
  renderMovementsChart() {
    const canvas = document.getElementById('chart-movements');
    if (!canvas) return;

    if (this.charts.movements) {
      this.charts.movements.destroy();
    }

    this.charts.movements = new ChartComponent(canvas);

    // Données simulées (7 derniers jours)
    const labels = [];
    const entries = [];
    const exits = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      labels.push(date.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric' }));

      entries.push(Math.floor(Math.random() * 20) + 5);
      exits.push(Math.floor(Math.random() * 15) + 3);
    }

    const chartData = {
      labels: labels,
      datasets: [
        {
          label: 'Entrées',
          data: entries,
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          fill: true,
          tension: 0.4,
          borderWidth: 2
        },
        {
          label: 'Sorties',
          data: exits,
          borderColor: '#ef4444',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          fill: true,
          tension: 0.4,
          borderWidth: 2
        }
      ]
    };

    this.charts.movements.createLineChart(chartData);
  }

  /**
   * Affiche le graphique répartition catégories
   */
  renderCategoriesChart() {
    const canvas = document.getElementById('chart-categories');
    if (!canvas) return;

    if (this.charts.categories) {
      this.charts.categories.destroy();
    }

    this.charts.categories = new ChartComponent(canvas);

    const chartData = {
      labels: ['Électronique', 'Informatique', 'Mobilier', 'Consommables', 'Autres'],
      datasets: [{
        data: [35, 28, 20, 12, 5],
        backgroundColor: [
          '#f4a412',
          '#10b981',
          '#3b82f6',
          '#8b5cf6',
          '#ec4899'
        ],
        borderColor: '#1f2937',
        borderWidth: 2
      }]
    };

    this.charts.categories.createDoughnutChart(chartData);
  }

  /**
   * Charge le fil d'activité
   */
  async loadActivityFeed() {
    const container = document.getElementById('activity-feed');
    if (!container) return;

    // Pour l'instant, afficher un message
    container.innerHTML = `
      <div class="sp-empty-state">
        <i data-lucide="activity"></i>
        <p>Aucune activité récente</p>
      </div>
    `;

    if (window.lucide) {
      lucide.createIcons();
    }
  }

  /**
   * Charge les alertes
   */
  async loadAlerts() {
    const container = document.getElementById('alerts-panel');
    if (!container) return;

    // Pour l'instant, afficher un message
    container.innerHTML = `
      <div class="sp-empty-state">
        <i data-lucide="check-circle"></i>
        <p>Aucune alerte</p>
      </div>
    `;

    if (window.lucide) {
      lucide.createIcons();
    }
  }

  /**
   * Démarre le rafraîchissement automatique
   */
  startAutoRefresh() {
    // Arrêter l'intervalle existant
    this.stopAutoRefresh();

    // Démarrer nouveau rafraîchissement
    this.autoRefreshInterval = setInterval(() => {
      console.log('🔄 Rafraîchissement automatique du dashboard...');
      this.loadMetrics();
      this.loadActivityFeed();
      this.loadAlerts();
    }, this.refreshRate);

    console.log(`🔄 Rafraîchissement automatique activé (${this.refreshRate / 1000}s)`);
  }

  /**
   * Arrête le rafraîchissement automatique
   */
  stopAutoRefresh() {
    if (this.autoRefreshInterval) {
      clearInterval(this.autoRefreshInterval);
      this.autoRefreshInterval = null;
      console.log('⏸️ Rafraîchissement automatique désactivé');
    }
  }

  /**
   * Bind les événements
   */
  bindEvents() {
    // Bouton rafraîchir manuel
    const refreshBtn = document.getElementById('btn-refresh-dashboard');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', () => {
        this.loadMetrics();
        this.loadCharts();
        this.loadActivityFeed();
        this.loadAlerts();
      });
    }

    // Toggle auto-refresh
    const autoRefreshToggle = document.getElementById('toggle-auto-refresh');
    if (autoRefreshToggle) {
      autoRefreshToggle.addEventListener('change', (e) => {
        if (e.target.checked) {
          this.startAutoRefresh();
        } else {
          this.stopAutoRefresh();
        }
      });
    }
  }

  /**
   * Affiche une notification
   */
  showNotification(message, type = 'info') {
    console.log(`[${type.toUpperCase()}] ${message}`);
    // TODO: Implémenter avec le composant Notification
  }

  /**
   * Nettoie les ressources
   */
  destroy() {
    this.stopAutoRefresh();

    // Détruire tous les graphiques
    Object.values(this.charts).forEach(chart => {
      if (chart && chart.destroy) {
        chart.destroy();
      }
    });

    this.charts = {};
    this.isInitialized = false;
  }
}

// Créer instance globale
if (typeof window !== 'undefined') {
  window.dashboard = new DashboardModule();
}

// Export pour utilisation en module ES6
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DashboardModule;
}
