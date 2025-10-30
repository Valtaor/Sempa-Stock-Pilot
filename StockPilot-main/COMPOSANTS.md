# 🧩 LISTE DES COMPOSANTS STOCKPILOT

## 📋 Vue d'ensemble

Cette liste détaille tous les composants à créer ou refactoriser pour la refonte de StockPilot.

**Légende :**
- 🆕 NOUVEAU : Composant à créer de zéro
- ♻️ REFACTOR : Composant existant à améliorer
- 🔧 EXTEND : Fonctionnalité à ajouter au composant existant

---

## 🎨 COMPOSANTS UI RÉUTILISABLES

### 1. Boutons (`components/Button.js`) 🆕

**Fichier :** `assets/js/components/Button.js`

**Variantes :**
- `button--primary` : Bouton principal (gradient orange)
- `button--secondary` : Bouton secondaire (gris)
- `button--outline` : Bouton contour
- `button--ghost` : Bouton transparent
- `button--danger` : Bouton danger (rouge)
- `button--icon` : Bouton icône seul

**Props :**
```javascript
{
  variant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger',
  size: 'sm' | 'md' | 'lg',
  icon: 'lucide-icon-name',
  iconPosition: 'left' | 'right',
  loading: boolean,
  disabled: boolean,
  onClick: function,
  children: string
}
```

**CSS :** `assets/css/components/buttons.css`

---

### 2. Badges de statut (`components/Badge.js`) 🆕

**Fichier :** `assets/js/components/Badge.js`

**Variantes :**
- `badge--success` : Vert (stock normal)
- `badge--warning` : Orange (stock bas)
- `badge--danger` : Rouge (rupture)
- `badge--info` : Bleu (information)
- `badge--neutral` : Gris (neutre)

**Props :**
```javascript
{
  status: 'success' | 'warning' | 'danger' | 'info' | 'neutral',
  text: string,
  icon: 'lucide-icon-name',
  pulse: boolean  // Animation pulse pour alertes
}
```

**Usage :**
```javascript
Badge.render({
  status: 'warning',
  text: 'Stock bas',
  icon: 'alert-triangle',
  pulse: true
});
```

**CSS :** `assets/css/components/badges.css`

---

### 3. Cartes (`components/Card.js`) 🆕

**Fichier :** `assets/js/components/Card.js`

**Types :**
- `card--metric` : Carte métrique (dashboard)
- `card--product` : Carte produit (vue grille)
- `card--panel` : Panneau de contenu
- `card--interactive` : Carte cliquable

**Props :**
```javascript
{
  type: 'metric' | 'product' | 'panel' | 'interactive',
  title: string,
  value: string | number,
  icon: 'lucide-icon-name',
  trend: { value: number, direction: 'up' | 'down' },
  footer: string | element,
  onClick: function
}
```

**CSS :** `assets/css/components/cards.css`

---

### 4. Carte métrique (`components/MetricCard.js`) 🆕

**Fichier :** `assets/js/components/MetricCard.js`

**Spécifique au dashboard**

**Props :**
```javascript
{
  title: string,
  value: number | string,
  icon: 'lucide-icon-name',
  iconColor: string,
  trend: {
    value: number,       // Pourcentage de variation
    period: string,      // "vs semaine précédente"
    direction: 'up' | 'down'
  },
  loading: boolean
}
```

**Exemple de rendu :**
```javascript
MetricCard.render({
  title: 'Valeur totale du stock',
  value: '45 230 €',
  icon: 'trending-up',
  iconColor: 'var(--sp-primary-500)',
  trend: {
    value: 2.5,
    period: 'vs semaine précédente',
    direction: 'up'
  }
});
```

---

### 5. Carte produit (`components/ProductCard.js`) 🆕

**Fichier :** `assets/js/components/ProductCard.js`

**Pour la vue en grille des produits**

**Props :**
```javascript
{
  product: {
    id: number,
    reference: string,
    designation: string,
    image_url: string,
    stock_actuel: number,
    stock_minimum: number,
    prix_vente: number,
    categorie: string,
    fournisseur: string,
    etat_materiel: 'neuf' | 'reconditionné'
  },
  onEdit: function,
  onDelete: function,
  onMovement: function
}
```

**Actions rapides :**
- Bouton "Modifier" (crayon)
- Bouton "Mouvement" (flèches)
- Bouton "Supprimer" (poubelle)

**CSS :** `assets/css/components/product-card.css`

---

### 6. Modal (`components/Modal.js`) 🆕

**Fichier :** `assets/js/components/Modal.js`

**Types :**
- `modal--default` : Modal standard
- `modal--large` : Modal large (formulaires)
- `modal--confirm` : Modal de confirmation
- `modal--fullscreen` : Modal plein écran

**Props :**
```javascript
{
  title: string,
  size: 'sm' | 'md' | 'lg' | 'xl' | 'fullscreen',
  type: 'default' | 'confirm',
  content: element | string,
  footer: element,
  onClose: function,
  onConfirm: function,
  closeOnOverlayClick: boolean,
  showCloseButton: boolean
}
```

**Méthodes :**
```javascript
Modal.open({ title: 'Ajouter un produit', content: formElement });
Modal.close();
Modal.confirm({
  title: 'Supprimer le produit ?',
  message: 'Cette action est irréversible.',
  onConfirm: () => deleteProduct(id)
});
```

**CSS :** `assets/css/components/modals.css`

---

### 7. Tableau avancé (`components/Table.js`) 🆕

**Fichier :** `assets/js/components/Table.js`

**Fonctionnalités :**
- Tri par colonne
- Pagination
- Sélection multiple (checkbox)
- Actions en masse
- Édition inline
- Colonnes configurables
- Export CSV

**Props :**
```javascript
{
  columns: [
    {
      key: string,
      label: string,
      sortable: boolean,
      editable: boolean,
      render: function,
      width: string
    }
  ],
  data: array,
  actions: [
    { label: string, icon: string, onClick: function }
  ],
  bulkActions: boolean,
  pagination: {
    currentPage: number,
    itemsPerPage: number,
    total: number
  },
  onSort: function,
  onPageChange: function,
  onEdit: function,
  loading: boolean
}
```

**CSS :** `assets/css/components/tables.css`

---

### 8. Barre de recherche (`components/SearchBar.js`) 🆕

**Fichier :** `assets/js/components/SearchBar.js`

**Fonctionnalités :**
- Recherche temps réel
- Recherche globale (produits, fournisseurs, références)
- Suggestions (dropdown)
- Raccourci clavier (Ctrl+K)
- Historique de recherche

**Props :**
```javascript
{
  placeholder: string,
  scope: 'products' | 'movements' | 'global',
  onSearch: function,
  debounce: number,  // ms
  showSuggestions: boolean,
  showHistory: boolean
}
```

**CSS :** `assets/css/components/search-bar.css`

---

### 9. Timeline (`components/Timeline.js`) 🆕

**Fichier :** `assets/js/components/Timeline.js`

**Pour l'affichage des mouvements**

**Props :**
```javascript
{
  items: [
    {
      id: number,
      type: 'entree' | 'sortie' | 'ajustement',
      product: object,
      quantity: number,
      user: string,
      date: string,
      reason: string
    }
  ],
  groupBy: 'date' | 'product',
  showFilters: boolean,
  onItemClick: function
}
```

**Affichage :**
- Icône selon le type (flèche haut/bas, égal)
- Couleur selon le type (vert/rouge/bleu)
- Informations produit
- Utilisateur + date relative
- Motif du mouvement

**CSS :** `assets/css/components/timeline.css`

---

### 10. Filtres (`components/Filters.js`) 🆕

**Fichier :** `assets/js/components/Filters.js`

**Fonctionnalités :**
- Filtres multiples (catégorie, fournisseur, statut)
- Badges de filtres actifs
- Reset rapide
- Sauvegarde des filtres (localStorage)

**Props :**
```javascript
{
  filters: [
    {
      key: string,
      label: string,
      type: 'select' | 'multiselect' | 'range' | 'date',
      options: array,
      value: any
    }
  ],
  onFilterChange: function,
  showActiveFilters: boolean
}
```

**CSS :** `assets/css/components/filters.css`

---

### 11. Notifications (`components/Notification.js`) 🆕

**Fichier :** `assets/js/components/Notification.js`

**Types :**
- `notification--success` : Succès (vert)
- `notification--error` : Erreur (rouge)
- `notification--warning` : Avertissement (orange)
- `notification--info` : Information (bleu)

**Props :**
```javascript
{
  type: 'success' | 'error' | 'warning' | 'info',
  title: string,
  message: string,
  duration: number,  // ms (0 = permanent)
  position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left',
  showIcon: boolean,
  showCloseButton: boolean,
  action: { label: string, onClick: function }
}
```

**Usage :**
```javascript
Notification.show({
  type: 'success',
  title: 'Stock mis à jour',
  message: 'Le produit REF001 a été modifié avec succès',
  duration: 3000
});
```

**CSS :** `assets/css/components/notifications.css`

---

### 12. Graphiques (`components/Chart.js`) 🆕

**Fichier :** `assets/js/components/Chart.js`

**Wrapper autour de Chart.js**

**Types de graphiques :**
- `line` : Graphique linéaire (évolution)
- `bar` : Graphique en barres
- `doughnut` : Graphique en donut (répartition)
- `pie` : Graphique en camembert

**Props :**
```javascript
{
  type: 'line' | 'bar' | 'doughnut' | 'pie',
  data: {
    labels: array,
    datasets: [{
      label: string,
      data: array,
      backgroundColor: string | array,
      borderColor: string
    }]
  },
  options: object,
  height: number,
  responsive: boolean
}
```

**CSS :** `assets/css/components/charts.css`

---

### 13. Toggle (`components/Toggle.js`) 🆕

**Fichier :** `assets/js/components/Toggle.js`

**Pour le switch tableau/cartes, thème clair/sombre**

**Props :**
```javascript
{
  checked: boolean,
  label: string,
  onChange: function,
  size: 'sm' | 'md' | 'lg',
  disabled: boolean
}
```

**CSS :** `assets/css/components/toggle.css`

---

### 14. Dropdown (`components/Dropdown.js`) 🆕

**Fichier :** `assets/js/components/Dropdown.js`

**Pour les menus d'actions**

**Props :**
```javascript
{
  trigger: element,
  items: [
    {
      label: string,
      icon: string,
      onClick: function,
      divider: boolean,
      danger: boolean
    }
  ],
  position: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right',
  closeOnClick: boolean
}
```

**CSS :** `assets/css/components/dropdown.css`

---

### 15. Loader / Spinner (`components/Loader.js`) 🆕

**Fichier :** `assets/js/components/Loader.js`

**Props :**
```javascript
{
  size: 'sm' | 'md' | 'lg',
  color: string,
  fullscreen: boolean,
  text: string
}
```

**CSS :** `assets/css/components/loader.css`

---

## 📄 MODULES MÉTIER

### 16. Module Dashboard (`modules/dashboard.js`) ♻️

**Fichier :** `assets/js/modules/dashboard.js`

**Refactorisation de la logique existante**

**Fonctions principales :**
```javascript
class DashboardModule {
  async init() { ... }
  async loadMetrics() { ... }
  async loadCharts() { ... }
  async loadActivityFeed() { ... }
  async loadAlerts() { ... }
  startAutoRefresh(interval = 60000) { ... }
  stopAutoRefresh() { ... }
  renderMetrics(data) { ... }
  renderCharts(data) { ... }
  renderActivityFeed(items) { ... }
}
```

**Nouvelles fonctionnalités :**
- 📊 Graphiques dynamiques (CA, valeur stock, entrées/sorties)
- 📈 Métriques avec variations vs semaine précédente
- 🔔 Fil d'activité en temps réel
- 🔄 Rafraîchissement automatique (60s)
- 🎯 Produit le plus mouvementé

---

### 17. Module Produits (`modules/products.js`) ♻️

**Fichier :** `assets/js/modules/products.js`

**Fonctions principales :**
```javascript
class ProductsModule {
  async init() { ... }
  async loadProducts(filters = {}) { ... }
  async saveProduct(data) { ... }
  async deleteProduct(id) { ... }
  renderTableView(products) { ... }
  renderGridView(products) { ... }
  toggleView(view) { ... }  // 'table' | 'grid'
  filterProducts(criteria) { ... }
  editProductInline(id, field, value) { ... }
  showProductDetail(id) { ... }
}
```

**Nouvelles fonctionnalités :**
- 🎴 Vue en cartes avec photos
- 🔄 Toggle tableau/cartes
- 🎨 Badges de statut colorés (vert/orange/rouge)
- ⚡ Actions rapides sur chaque ligne
- 🔍 Filtrage multi-critères instantané
- ✏️ Édition inline du stock/prix

---

### 18. Module Mouvements (`modules/movements.js`) ♻️

**Fichier :** `assets/js/modules/movements.js`

**Fonctions principales :**
```javascript
class MovementsModule {
  async init() { ... }
  async loadMovements(filters = {}) { ... }
  async recordMovement(data) { ... }
  renderTimeline(movements) { ... }
  renderTable(movements) { ... }
  toggleView(view) { ... }  // 'timeline' | 'table'
  filterByDate(range) { ... }  // 'today' | 'week' | 'month'
  showQuickMovementModal() { ... }
}
```

**Nouvelles fonctionnalités :**
- ⏱️ Timeline visuelle avec icônes
- 📅 Filtres temporels (jour/semaine/mois)
- 👤 Nom de l'utilisateur
- ➕ Bouton flottant pour mouvement rapide

---

### 19. Module Rapports (`modules/reports.js`) ♻️

**Fichier :** `assets/js/modules/reports.js`

**Fonctions principales :**
```javascript
class ReportsModule {
  async init() { ... }
  async generateReport(type, filters) { ... }
  async exportCSV(data) { ... }
  async exportPDF(data, options) { ... }
  async scheduleReport(config) { ... }
  renderReportPreview(data) { ... }
  showExportProgress(progress) { ... }
}
```

**Nouvelles fonctionnalités :**
- 📄 Export CSV amélioré
- 📑 Export PDF formaté avec graphiques
- 📧 Rapport hebdomadaire automatique
- 📊 Graphique "Évolution valeur stock"
- 🔗 Section "Documents techniques" accessible

---

### 20. Module Paramètres (`modules/settings.js`) 🆕

**Fichier :** `assets/js/modules/settings.js`

**Fonctions principales :**
```javascript
class SettingsModule {
  async init() { ... }
  async loadSettings() { ... }
  async saveSettings(data) { ... }
  renderAutomationSection() { ... }
  renderColumnSettings() { ... }
  renderThemeSettings() { ... }
  toggleTheme(theme) { ... }  // 'light' | 'dark'
  saveColumnPreferences(columns) { ... }
  renderVersionInfo() { ... }
}
```

**Fonctionnalités :**
- 🤖 Section "Automatisations"
  - Alertes email (seuil atteint)
  - Export automatique planifié
  - Règles personnalisées par catégorie
- 📋 Choix des colonnes affichées
- 🌓 Toggle thème clair/sombre
- ℹ️ Indicateur de version
- 🔄 Date de dernière synchronisation

---

## 🛠️ UTILITAIRES

### 21. Client API (`utils/api.js`) 🆕

**Fichier :** `assets/js/utils/api.js`

**Wrapper pour les requêtes AJAX**

```javascript
class API {
  constructor(baseUrl, nonce) { ... }

  async get(endpoint, params = {}) { ... }
  async post(endpoint, data) { ... }
  async put(endpoint, data) { ... }
  async delete(endpoint) { ... }

  // Endpoints spécifiques
  async getDashboardMetrics() { ... }
  async getProducts(filters) { ... }
  async saveProduct(data) { ... }
  async deleteProduct(id) { ... }
  async getMovements(filters) { ... }
  async recordMovement(data) { ... }
  async exportReport(type, filters) { ... }
}
```

---

### 22. Formatters (`utils/formatters.js`) 🆕

**Fichier :** `assets/js/utils/formatters.js`

```javascript
class Formatters {
  static currency(value) { ... }           // 1234.56 → "1 234,56 €"
  static number(value) { ... }             // 1234 → "1 234"
  static date(date, format) { ... }        // ISO → "15 janv. 2024"
  static relativeDate(date) { ... }        // "Il y a 2 jours"
  static percentage(value) { ... }         // 0.025 → "+2,5%"
  static fileSize(bytes) { ... }           // 1024 → "1 KB"
  static duration(ms) { ... }              // 3600000 → "1h"
}
```

---

### 23. Validators (`utils/validators.js`) 🆕

**Fichier :** `assets/js/utils/validators.js`

```javascript
class Validators {
  static required(value) { ... }
  static email(value) { ... }
  static minLength(value, min) { ... }
  static maxLength(value, max) { ... }
  static numeric(value) { ... }
  static integer(value) { ... }
  static min(value, min) { ... }
  static max(value, max) { ... }
  static pattern(value, regex) { ... }
  static unique(value, existingValues) { ... }
}
```

---

### 24. LocalStorage Manager (`utils/storage.js`) 🆕

**Fichier :** `assets/js/utils/storage.js`

```javascript
class Storage {
  static get(key, defaultValue = null) { ... }
  static set(key, value) { ... }
  static remove(key) { ... }
  static clear() { ... }

  // Helpers spécifiques
  static getFilters(module) { ... }
  static saveFilters(module, filters) { ... }
  static getColumnPreferences() { ... }
  static saveColumnPreferences(columns) { ... }
  static getTheme() { ... }
  static saveTheme(theme) { ... }
}
```

---

### 25. Event Manager (`utils/events.js`) 🆕

**Fichier :** `assets/js/utils/events.js`

**Système d'événements custom**

```javascript
class EventManager {
  constructor() {
    this.events = {};
  }

  on(event, callback) { ... }
  off(event, callback) { ... }
  emit(event, data) { ... }
}

// Événements disponibles
const Events = {
  PRODUCT_CREATED: 'product:created',
  PRODUCT_UPDATED: 'product:updated',
  PRODUCT_DELETED: 'product:deleted',
  MOVEMENT_RECORDED: 'movement:recorded',
  STOCK_LOW: 'stock:low',
  EXPORT_COMPLETE: 'export:complete',
  THEME_CHANGED: 'theme:changed'
};
```

---

## 🎨 CLASSES BACKEND PHP

### 26. Classe Alertes (`class-stocks-alerts.php`) 🆕

**Fichier :** `includes/class-stocks-alerts.php`

```php
class Sempa_Stocks_Alerts {
  // Vérifier les seuils de stock
  public function check_low_stock_alerts() { ... }

  // Envoyer alerte email
  public function send_alert_email($product, $type) { ... }

  // Récupérer les règles d'alertes
  public function get_alert_rules() { ... }

  // Créer/modifier règle
  public function save_alert_rule($rule) { ... }

  // Templates d'emails
  private function get_email_template($type) { ... }
}
```

**Fonctionnalités :**
- Vérification automatique des seuils
- Envoi d'emails personnalisés
- Gestion des règles par catégorie
- Templates HTML pour emails

---

### 27. Classe Scheduler (`class-stocks-scheduler.php`) 🆕

**Fichier :** `includes/class-stocks-scheduler.php`

```php
class Sempa_Stocks_Scheduler {
  // Enregistrer les cron jobs
  public function register_cron_jobs() { ... }

  // Export planifié
  public function run_scheduled_export($export_id) { ... }

  // Rapport hebdomadaire
  public function send_weekly_report() { ... }

  // Sauvegarde quotidienne
  public function run_daily_backup() { ... }

  // Vérification alertes
  public function check_alerts() { ... }
}
```

**Cron jobs :**
- Export planifié (configurable)
- Rapport hebdomadaire (lundi 9h)
- Sauvegarde quotidienne (minuit)
- Vérification alertes (toutes les heures)

---

### 28. Classe Export (`class-stocks-export.php`) 🆕

**Fichier :** `includes/class-stocks-export.php`

```php
class Sempa_Stocks_Export {
  // Export CSV amélioré
  public function export_csv($filters = []) { ... }

  // Export PDF avec graphiques
  public function export_pdf($data, $options = []) { ... }

  // Export Excel (XLSX)
  public function export_excel($data) { ... }

  // Générer graphiques pour PDF
  private function generate_chart_image($chart_data) { ... }

  // Formater les données
  private function format_data($data, $format) { ... }
}
```

**Bibliothèques recommandées :**
- CSV : Native PHP
- PDF : TCPDF ou mPDF
- Excel : PhpSpreadsheet

---

### 29. Classe Analytics (`class-stocks-analytics.php`) 🆕

**Fichier :** `includes/class-stocks-analytics.php`

```php
class Sempa_Stocks_Analytics {
  // Métriques dashboard
  public function get_dashboard_metrics() { ... }

  // Calculer tendances
  public function calculate_trends($period = 7) { ... }

  // Produit le plus mouvementé
  public function get_most_moved_product($period) { ... }

  // Évolution valeur stock
  public function get_stock_value_evolution($period) { ... }

  // Statistiques catégories
  public function get_category_stats() { ... }

  // Statistiques fournisseurs
  public function get_supplier_stats() { ... }
}
```

**Métriques calculées :**
- Variation valeur stock (%)
- Produits les plus mouvementés
- Répartition par catégorie
- Performance fournisseurs
- Taux de rotation

---

### 30. Classe API REST (`class-stocks-api.php`) 🆕

**Fichier :** `includes/class-stocks-api.php`

```php
class Sempa_Stocks_API {
  // Enregistrer les routes
  public function register_routes() { ... }

  // Dashboard
  public function get_dashboard_metrics($request) { ... }
  public function get_dashboard_charts($request) { ... }

  // Produits
  public function get_products_cards($request) { ... }

  // Mouvements
  public function get_movements_timeline($request) { ... }

  // Rapports
  public function generate_report($request) { ... }

  // Automatisations
  public function get_automation_rules($request) { ... }
  public function save_automation_rule($request) { ... }

  // Vérification permissions
  private function check_permissions() { ... }
}
```

**Routes REST :**
- `GET /wp-json/sempa/v1/dashboard/metrics`
- `GET /wp-json/sempa/v1/dashboard/charts`
- `GET /wp-json/sempa/v1/products/cards`
- `GET /wp-json/sempa/v1/movements/timeline`
- `POST /wp-json/sempa/v1/reports/export`
- `GET /wp-json/sempa/v1/automation/rules`

---

### 31. Classe Activity Log (`class-stocks-activity-log.php`) 🆕

**Fichier :** `includes/class-stocks-activity-log.php`

```php
class Sempa_Stocks_Activity_Log {
  // Logger une action
  public function log($action, $entity_type, $entity_id, $details = []) { ... }

  // Récupérer logs
  public function get_logs($filters = []) { ... }

  // Récupérer logs par utilisateur
  public function get_user_logs($user) { ... }

  // Récupérer logs par entité
  public function get_entity_logs($entity_type, $entity_id) { ... }

  // Nettoyer vieux logs
  public function cleanup_old_logs($days = 90) { ... }
}
```

**Actions loggées :**
- Création produit
- Modification produit
- Suppression produit
- Enregistrement mouvement
- Export données
- Modification paramètres

---

## 📊 RÉSUMÉ

### Composants par priorité

**Priorité 1 (Dashboard) :**
- ✅ MetricCard
- ✅ Chart
- ✅ Card (panel)
- ✅ Badge
- ✅ Loader
- ✅ DashboardModule

**Priorité 2 (Produits) :**
- ✅ ProductCard
- ✅ Table
- ✅ SearchBar
- ✅ Filters
- ✅ Toggle
- ✅ ProductsModule

**Priorité 3 (Mouvements) :**
- ✅ Timeline
- ✅ Modal
- ✅ Button
- ✅ MovementsModule

**Priorité 4 (Rapports) :**
- ✅ Dropdown
- ✅ ReportsModule
- ✅ Sempa_Stocks_Export (backend)

**Priorité 5 (Automatisations) :**
- ✅ Notification
- ✅ SettingsModule
- ✅ Sempa_Stocks_Alerts (backend)
- ✅ Sempa_Stocks_Scheduler (backend)

---

## 📈 STATISTIQUES

- **Composants UI :** 15 nouveaux
- **Modules métier :** 5 refactorisés
- **Utilitaires :** 5 nouveaux
- **Classes PHP backend :** 6 nouvelles
- **Total :** 31 composants/classes

**Estimation développement :**
- Composants UI : ~3 jours
- Modules métier : ~5 jours
- Utilitaires : ~2 jours
- Backend PHP : ~4 jours
- Tests & intégration : ~3 jours
- **Total : ~17 jours** (3-4 semaines)

---

## 🎯 PROCHAINES ÉTAPES

1. ✅ Créer les composants UI de base (Button, Badge, Card)
2. ✅ Intégrer Chart.js
3. ✅ Développer le nouveau Dashboard
4. ✅ Implémenter la vue produits en cartes
5. ✅ Créer la Timeline des mouvements
6. ✅ Développer les automatisations backend
7. ✅ Tests & validation
8. ✅ Documentation utilisateur
