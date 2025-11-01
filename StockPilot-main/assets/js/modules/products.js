/**
 * MODULE PRODUCTS
 *
 * Gère la vue produits avec affichage en grille de cartes,
 * filtres multi-critères, recherche et pagination
 */

class ProductsModule {
  constructor() {
    this.products = [];
    this.filteredProducts = [];
    this.currentPage = 1;
    this.perPage = 24;
    this.filters = {
      search: '',
      category: '',
      supplier: '',
      status: ''
    };
    this.initialized = false;
  }

  /**
   * Initialise le module
   */
  async init() {
    if (this.initialized) {
      console.log('📦 Module Products déjà initialisé');
      return;
    }

    console.log('📦 Initialisation du module Products...');

    try {
      // Vérifier et réparer le conteneur si nécessaire
      this.ensureContainer();

      // Charger les produits
      await this.loadProducts();

      // Initialiser les event listeners
      this.initEventListeners();

      // Afficher les produits
      this.renderProducts();

      this.initialized = true;
      console.log('✅ Module Products initialisé');
    } catch (error) {
      console.error('❌ Erreur initialisation Products:', error);
      this.showError('Erreur lors du chargement des produits');
    }
  }

  /**
   * Vérifie que le conteneur existe et le crée si nécessaire
   */
  ensureContainer() {
    let container = document.getElementById('products-grid-container');

    if (container) {
      console.log('✅ Conteneur products-grid-container présent');
      return;
    }

    console.warn('⚠️ Conteneur products-grid-container manquant, création automatique...');

    // Trouver la vue produits
    const viewProducts = document.getElementById('view-products');
    if (!viewProducts) {
      console.error('❌ Impossible de trouver view-products');
      return;
    }

    // Trouver la toolbar
    const toolbar = viewProducts.querySelector('.products-toolbar');
    if (!toolbar) {
      console.error('❌ Impossible de trouver products-toolbar');
      return;
    }

    // Créer le conteneur
    container = document.createElement('div');
    container.id = 'products-grid-container';
    container.innerHTML = `
      <div class="sp-empty-state">
        <i data-lucide="loader"></i>
        <p>Initialisation...</p>
      </div>
    `;

    // Insérer après la toolbar
    toolbar.insertAdjacentElement('afterend', container);
    console.log('✅ Conteneur products-grid-container créé');

    // Créer aussi la pagination si manquante
    let pagination = viewProducts.querySelector('.products-pagination');
    if (!pagination) {
      pagination = document.createElement('div');
      pagination.className = 'products-pagination';
      pagination.setAttribute('role', 'group');
      pagination.setAttribute('aria-label', 'Pagination des produits');
      pagination.innerHTML = `
        <div class="pagination-info">
          <label for="products-per-page">Afficher</label>
          <select id="products-per-page">
            <option value="12">12</option>
            <option value="24" selected>24</option>
            <option value="48">48</option>
            <option value="all">Tous</option>
          </select>
          <span>par page</span>
        </div>
        <div class="pagination-status">
          <span id="products-count-info">Chargement...</span>
        </div>
        <div class="pagination-controls">
          <button type="button" id="products-prev-page" class="button button--ghost" disabled>Précédent</button>
          <span id="products-page-info" class="pagination-page-info">Page 1 sur 1</span>
          <button type="button" id="products-next-page" class="button button--ghost" disabled>Suivant</button>
        </div>
      `;
      container.insertAdjacentElement('afterend', pagination);
      console.log('✅ Pagination créée');
    }
  }

  /**
   * Charge les produits depuis l'API
   */
  async loadProducts() {
    console.log('🔄 Chargement des produits...');

    try {
      const response = await api.getProducts();
      this.products = response.products || [];
      this.applyFilters();
      console.log(`✅ ${this.products.length} produits chargés`);
    } catch (error) {
      console.error('❌ Erreur chargement produits:', error);
      throw error;
    }
  }

  /**
   * Initialise les event listeners
   */
  initEventListeners() {
    // Recherche
    const searchInput = document.getElementById('stocks-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.filters.search = e.target.value.trim().toLowerCase();
        this.currentPage = 1;
        this.applyFilters();
        this.renderProducts();
      });
    }

    // Filtre catégorie
    const categoryFilter = document.getElementById('stocks-filter-category');
    if (categoryFilter) {
      categoryFilter.addEventListener('change', (e) => {
        this.filters.category = e.target.value;
        this.currentPage = 1;
        this.applyFilters();
        this.renderProducts();
      });
    }

    // Filtre fournisseur
    const supplierFilter = document.getElementById('stocks-filter-supplier');
    if (supplierFilter) {
      supplierFilter.addEventListener('change', (e) => {
        this.filters.supplier = e.target.value;
        this.currentPage = 1;
        this.applyFilters();
        this.renderProducts();
      });
    }

    // Filtre statut
    const statusFilter = document.getElementById('stocks-filter-status');
    if (statusFilter) {
      statusFilter.addEventListener('change', (e) => {
        this.filters.status = e.target.value;
        this.currentPage = 1;
        this.applyFilters();
        this.renderProducts();
      });
    }

    // Bouton réinitialiser filtres
    const clearFiltersBtn = document.getElementById('stocks-clear-filters');
    if (clearFiltersBtn) {
      clearFiltersBtn.addEventListener('click', () => {
        this.clearFilters();
      });
    }

    // Bouton ajouter produit
    const addProductBtn = document.getElementById('stocks-open-product-form');
    if (addProductBtn) {
      addProductBtn.addEventListener('click', () => {
        this.openProductForm();
      });
    }

    // Pagination - produits par page
    const perPageSelect = document.getElementById('products-per-page');
    if (perPageSelect) {
      perPageSelect.addEventListener('change', (e) => {
        const value = e.target.value;
        this.perPage = value === 'all' ? this.filteredProducts.length : parseInt(value);
        this.currentPage = 1;
        this.renderProducts();
      });
    }

    // Pagination - page précédente
    const prevPageBtn = document.getElementById('products-prev-page');
    if (prevPageBtn) {
      prevPageBtn.addEventListener('click', () => {
        if (this.currentPage > 1) {
          this.currentPage--;
          this.renderProducts();
          this.scrollToTop();
        }
      });
    }

    // Pagination - page suivante
    const nextPageBtn = document.getElementById('products-next-page');
    if (nextPageBtn) {
      nextPageBtn.addEventListener('click', () => {
        const totalPages = Math.ceil(this.filteredProducts.length / this.perPage);
        if (this.currentPage < totalPages) {
          this.currentPage++;
          this.renderProducts();
          this.scrollToTop();
        }
      });
    }

    console.log('✅ Event listeners initialisés');
  }

  /**
   * Applique les filtres aux produits
   */
  applyFilters() {
    this.filteredProducts = this.products.filter(product => {
      // Filtre recherche
      if (this.filters.search) {
        const search = this.filters.search;
        const matchesSearch =
          (product.reference && product.reference.toLowerCase().includes(search)) ||
          (product.designation && product.designation.toLowerCase().includes(search)) ||
          (product.categorie && product.categorie.toLowerCase().includes(search)) ||
          (product.fournisseur && product.fournisseur.toLowerCase().includes(search));

        if (!matchesSearch) return false;
      }

      // Filtre catégorie
      if (this.filters.category && product.categorie !== this.filters.category) {
        return false;
      }

      // Filtre fournisseur
      if (this.filters.supplier && product.fournisseur !== this.filters.supplier) {
        return false;
      }

      // Filtre statut
      if (this.filters.status) {
        const stockStatus = ProductCard.getStockStatus(product);
        const statusMap = {
          'normal': 'success',
          'warning': 'warning',
          'critical': 'danger'
        };
        if (stockStatus.variant !== statusMap[this.filters.status]) {
          return false;
        }
      }

      return true;
    });

    console.log(`🔍 ${this.filteredProducts.length} produits après filtrage`);
  }

  /**
   * Affiche les produits
   */
  renderProducts() {
    const container = document.getElementById('products-grid-container');
    if (!container) {
      console.error('❌ Conteneur #products-grid-container non trouvé');
      return;
    }

    // Afficher le loader
    Loader.show(container);

    // Calculer la pagination
    const startIndex = (this.currentPage - 1) * this.perPage;
    const endIndex = startIndex + this.perPage;
    const productsToShow = this.filteredProducts.slice(startIndex, endIndex);

    // Créer la grille
    const grid = ProductCard.renderGrid(productsToShow, {
      onEdit: (product) => this.editProduct(product),
      onDuplicate: (product) => this.duplicateProduct(product),
      onDelete: (product) => this.deleteProduct(product)
    });

    // Masquer le loader et afficher la grille
    setTimeout(() => {
      Loader.hide(container);
      container.innerHTML = '';
      container.appendChild(grid);

      // Initialiser les icônes Lucide
      if (window.lucide) {
        lucide.createIcons();
      }

      // Mettre à jour les infos de pagination
      this.updatePaginationInfo();
    }, 300);
  }

  /**
   * Met à jour les informations de pagination
   */
  updatePaginationInfo() {
    const totalPages = Math.ceil(this.filteredProducts.length / this.perPage);

    // Info nombre de résultats
    const countInfo = document.getElementById('products-count-info');
    if (countInfo) {
      const startIndex = (this.currentPage - 1) * this.perPage + 1;
      const endIndex = Math.min(startIndex + this.perPage - 1, this.filteredProducts.length);
      countInfo.textContent = `${startIndex}-${endIndex} sur ${this.filteredProducts.length} produits`;
    }

    // Info page actuelle
    const pageInfo = document.getElementById('products-page-info');
    if (pageInfo) {
      pageInfo.textContent = `Page ${this.currentPage} sur ${totalPages || 1}`;
    }

    // Bouton page précédente
    const prevBtn = document.getElementById('products-prev-page');
    if (prevBtn) {
      prevBtn.disabled = this.currentPage === 1;
    }

    // Bouton page suivante
    const nextBtn = document.getElementById('products-next-page');
    if (nextBtn) {
      nextBtn.disabled = this.currentPage >= totalPages;
    }
  }

  /**
   * Réinitialise tous les filtres
   */
  clearFilters() {
    this.filters = {
      search: '',
      category: '',
      supplier: '',
      status: ''
    };

    // Réinitialiser les champs
    const searchInput = document.getElementById('stocks-search');
    if (searchInput) searchInput.value = '';

    const categoryFilter = document.getElementById('stocks-filter-category');
    if (categoryFilter) categoryFilter.value = '';

    const supplierFilter = document.getElementById('stocks-filter-supplier');
    if (supplierFilter) supplierFilter.value = '';

    const statusFilter = document.getElementById('stocks-filter-status');
    if (statusFilter) statusFilter.value = '';

    this.currentPage = 1;
    this.applyFilters();
    this.renderProducts();

    console.log('🔄 Filtres réinitialisés');
  }

  /**
   * Édite un produit
   */
  editProduct(product) {
    console.log('✏️ Éditer produit:', product.id);
    // TODO: Ouvrir le formulaire d'édition
    // Pour l'instant, on affiche juste une alerte
    alert(`Éditer le produit: ${product.designation}\n(Fonctionnalité à implémenter)`);
  }

  /**
   * Duplique un produit
   */
  duplicateProduct(product) {
    console.log('📋 Dupliquer produit:', product.id);
    // TODO: Dupliquer le produit
    alert(`Dupliquer le produit: ${product.designation}\n(Fonctionnalité à implémenter)`);
  }

  /**
   * Supprime un produit
   */
  async deleteProduct(product) {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer le produit "${product.designation}" ?`)) {
      return;
    }

    console.log('🗑️ Supprimer produit:', product.id);

    try {
      // TODO: Appeler l'API de suppression
      // await api.deleteProduct(product.id);

      // Pour l'instant, simulation
      alert(`Produit "${product.designation}" supprimé avec succès\n(Simulation - Fonctionnalité à implémenter)`);

      // Recharger les produits
      await this.loadProducts();
      this.renderProducts();
    } catch (error) {
      console.error('❌ Erreur suppression produit:', error);
      alert('Erreur lors de la suppression du produit');
    }
  }

  /**
   * Ouvre le formulaire d'ajout de produit
   */
  openProductForm() {
    console.log('➕ Ouvrir formulaire ajout produit');
    // TODO: Ouvrir le formulaire
    alert('Ouvrir le formulaire d\'ajout de produit\n(Fonctionnalité à implémenter)');
  }

  /**
   * Scroll vers le haut de la liste
   */
  scrollToTop() {
    const container = document.getElementById('view-products');
    if (container) {
      container.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  /**
   * Affiche un message d'erreur
   */
  showError(message) {
    const container = document.getElementById('products-grid-container');
    if (container) {
      container.innerHTML = `
        <div class="sp-empty-state">
          <i data-lucide="alert-circle"></i>
          <p>${message}</p>
        </div>
      `;
      if (window.lucide) {
        lucide.createIcons();
      }
    }
  }

  /**
   * Rafraîchit les produits
   */
  async refresh() {
    console.log('🔄 Rafraîchissement des produits...');
    await this.loadProducts();
    this.renderProducts();
  }

  /**
   * Nettoie les ressources
   */
  destroy() {
    this.products = [];
    this.filteredProducts = [];
    this.initialized = false;
    console.log('🧹 Module Products nettoyé');
  }
}

// Créer une instance globale
window.productsModule = new ProductsModule();

// Export pour utilisation en module ES6
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ProductsModule;
}
