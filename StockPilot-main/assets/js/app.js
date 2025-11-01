/**
 * STOCKPILOT APP
 *
 * Point d'entrée principal de l'application StockPilot
 * Initialise les modules selon la vue active
 */

class StockPilotApp {
  constructor() {
    this.currentView = 'dashboard';
    this.initialized = false;
  }

  /**
   * Initialise l'application
   */
  async init() {
    if (this.initialized) {
      console.log('📦 StockPilot déjà initialisé');
      return;
    }

    console.log('📦 Initialisation de StockPilot...');

    try {
      // Initialiser les icônes Lucide
      this.initLucideIcons();

      // Initialiser la navigation entre vues
      this.initNavigation();

      // Afficher la vue par défaut (dashboard) et cacher les autres
      this.initializeViews();

      // Initialiser le module dashboard
      await this.initDashboard();

      this.initialized = true;
      console.log('✅ StockPilot initialisé avec succès');
    } catch (error) {
      console.error('❌ Erreur initialisation StockPilot:', error);
    }
  }

  /**
   * Initialise l'affichage des vues (affiche dashboard, cache les autres)
   */
  initializeViews() {
    const allViews = document.querySelectorAll('.main-view');
    allViews.forEach(view => {
      if (view.id === 'view-dashboard') {
        view.style.display = 'block';
      } else {
        view.style.display = 'none';
      }
    });
    console.log('✅ Vues initialisées (dashboard visible)');
  }

  /**
   * Initialise les icônes Lucide
   */
  initLucideIcons() {
    if (window.lucide) {
      lucide.createIcons();
      console.log('✅ Icônes Lucide initialisées');
    } else {
      console.warn('⚠️ Lucide Icons non disponible');
    }
  }

  /**
   * Initialise la navigation entre vues
   */
  initNavigation() {
    const navLinks = document.querySelectorAll('[data-view]');

    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const view = link.getAttribute('data-view');
        this.switchView(view);
      });
    });

    console.log('✅ Navigation initialisée');
  }

  /**
   * Change de vue
   *
   * @param {string} viewName - Nom de la vue (dashboard, products, movements, etc.)
   */
  switchView(viewName) {
    console.log(`🔄 Changement de vue: ${viewName}`);

    // Masquer toutes les vues
    const allViews = document.querySelectorAll('.main-view');
    allViews.forEach(view => {
      view.style.display = 'none';
    });

    // Afficher la vue demandée
    const targetView = document.getElementById(`view-${viewName}`);
    if (targetView) {
      targetView.style.display = 'block';
    }

    // Mettre à jour la navigation active
    const navLinks = document.querySelectorAll('[data-view]');
    navLinks.forEach(link => {
      if (link.getAttribute('data-view') === viewName) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Mettre à jour l'état actuel
    this.currentView = viewName;

    // Initialiser le module correspondant si nécessaire
    this.initModuleForView(viewName);
  }

  /**
   * Initialise le module correspondant à la vue
   *
   * @param {string} viewName - Nom de la vue
   */
  async initModuleForView(viewName) {
    switch (viewName) {
      case 'dashboard':
        await this.initDashboard();
        break;
      case 'products':
        await this.initProducts();
        break;
      case 'movements':
        // TODO: Initialiser le module mouvements (Phase 5)
        console.log('📦 Module mouvements à implémenter');
        break;
      case 'reports':
        // TODO: Initialiser le module rapports (Phase 6)
        console.log('📦 Module rapports à implémenter');
        break;
      case 'settings':
        // TODO: Initialiser le module paramètres (Phase 9)
        console.log('📦 Module paramètres à implémenter');
        break;
    }
  }

  /**
   * Initialise le module dashboard
   */
  async initDashboard() {
    if (!window.dashboard) {
      console.error('❌ Module dashboard non disponible');
      return;
    }

    try {
      await window.dashboard.init();
      console.log('✅ Dashboard initialisé');
    } catch (error) {
      console.error('❌ Erreur initialisation dashboard:', error);
    }
  }

  /**
   * Initialise le module products
   */
  async initProducts() {
    if (!window.productsModule) {
      console.error('❌ Module products non disponible');
      return;
    }

    // Ne pas réinitialiser si déjà fait
    if (window.productsModule.initialized) {
      console.log('📦 Module Products déjà initialisé');
      return;
    }

    try {
      await window.productsModule.init();
      console.log('✅ Module Products initialisé');
    } catch (error) {
      console.error('❌ Erreur initialisation products:', error);
    }
  }

  /**
   * Nettoie les ressources
   */
  destroy() {
    // Nettoyer le dashboard
    if (window.dashboard && window.dashboard.destroy) {
      window.dashboard.destroy();
    }

    this.initialized = false;
    console.log('🧹 StockPilot nettoyé');
  }
}

// Initialiser l'application au chargement du DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.stockpilot = new StockPilotApp();
    window.stockpilot.init();
  });
} else {
  window.stockpilot = new StockPilotApp();
  window.stockpilot.init();
}

// Export pour utilisation en module ES6
if (typeof module !== 'undefined' && module.exports) {
  module.exports = StockPilotApp;
}
