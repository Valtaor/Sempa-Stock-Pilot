# 🏗️ ARCHITECTURE REFONTE STOCKPILOT

## 📋 Vue d'ensemble

Cette refonte transforme StockPilot en une application moderne tout en conservant :
- La palette de couleurs existante (gris foncé, accents orange, noir/blanc)
- La base backend PHP/WordPress robuste
- La compatibilité avec l'infrastructure actuelle

---

## 🎯 ARCHITECTURE AMÉLIORÉE

### 1. STACK TECHNIQUE RECOMMANDÉ

#### Frontend (Migration progressive)
```
PHASE 1 (Amélioration immédiate - JavaScript Vanilla)
├── Vanilla JS amélioré avec modules ES6
├── Chart.js pour les graphiques (léger, 60KB)
├── Lucide Icons pour les icônes modernes
├── CSS Variables étendues pour theming
└── Architecture modulaire (composants réutilisables)

PHASE 2 (Migration future optionnelle - React)
├── React 18 avec Hooks
├── Recharts pour graphiques React
├── TailwindCSS pour styling rapide
├── React Query pour cache et synchronisation
└── Vite pour le build
```

**Recommandation : Commencer par PHASE 1** pour éviter une réécriture complète.

#### Backend (Conservation et extension)
```
PHP/WordPress existant
├── Nouvelles classes pour automatisations
│   ├── Sempa_Stocks_Alerts (alertes email)
│   ├── Sempa_Stocks_Scheduler (cron jobs)
│   ├── Sempa_Stocks_Export (PDF/CSV avancé)
│   └── Sempa_Stocks_Analytics (métriques calculées)
├── API REST étendue
│   ├── /wp-json/sempa/v1/dashboard/metrics
│   ├── /wp-json/sempa/v1/products/cards
│   ├── /wp-json/sempa/v1/movements/timeline
│   ├── /wp-json/sempa/v1/reports/generate
│   └── /wp-json/sempa/v1/automation/settings
└── Nouvelles tables MySQL
    ├── sempa_automation_rules
    ├── sempa_activity_log
    └── sempa_scheduled_exports
```

#### Infrastructure
```
Monitoring & Performance
├── Redis cache (optionnel, pour métriques)
├── Lazy loading des tables (déjà en place)
├── WebSocket ou Server-Sent Events (rafraîchissement auto)
├── Backup quotidien automatisé (extension du système existant)
└── Logs structurés JSON
```

---

## 📁 STRUCTURE DE FICHIERS AMÉLIORÉE

```
StockPilot-main/
├── functions.php                              (existant - étendre)
├── stocks.php                                 (existant - refactoriser)
│
├── includes/
│   ├── db_connect_stocks.php                  (existant - conserver)
│   ├── functions_stocks.php                   (existant - étendre)
│   ├── db_schema_setup.php                    (existant - étendre)
│   │
│   ├── class-stocks-alerts.php                (NOUVEAU)
│   ├── class-stocks-scheduler.php             (NOUVEAU)
│   ├── class-stocks-export.php                (NOUVEAU)
│   ├── class-stocks-analytics.php             (NOUVEAU)
│   ├── class-stocks-api.php                   (NOUVEAU - REST routes)
│   └── class-stocks-activity-log.php          (NOUVEAU)
│
├── assets/
│   ├── js/
│   │   ├── modules/
│   │   │   ├── dashboard.js                   (NOUVEAU - logique dashboard)
│   │   │   ├── products.js                    (NOUVEAU - logique produits)
│   │   │   ├── movements.js                   (NOUVEAU - logique mouvements)
│   │   │   ├── reports.js                     (NOUVEAU - logique rapports)
│   │   │   ├── settings.js                    (NOUVEAU - logique paramètres)
│   │   │   └── charts.js                      (NOUVEAU - wrapper Chart.js)
│   │   │
│   │   ├── components/
│   │   │   ├── MetricCard.js                  (NOUVEAU - composant carte métrique)
│   │   │   ├── ProductCard.js                 (NOUVEAU - composant carte produit)
│   │   │   ├── Timeline.js                    (NOUVEAU - composant timeline)
│   │   │   ├── Table.js                       (NOUVEAU - composant tableau)
│   │   │   ├── Modal.js                       (NOUVEAU - composant modal)
│   │   │   ├── SearchBar.js                   (NOUVEAU - barre de recherche)
│   │   │   └── Badge.js                       (NOUVEAU - composant badge)
│   │   │
│   │   ├── utils/
│   │   │   ├── api.js                         (NOUVEAU - client API)
│   │   │   ├── formatters.js                  (NOUVEAU - formatage dates/prix)
│   │   │   ├── validators.js                  (NOUVEAU - validation forms)
│   │   │   └── notifications.js               (NOUVEAU - système notifications)
│   │   │
│   │   ├── app.js                             (REFACTORISÉ - point d'entrée)
│   │   └── gestion-stocks.js                  (existant - à migrer progressivement)
│   │
│   ├── css/
│   │   ├── base/
│   │   │   ├── variables.css                  (NOUVEAU - tokens design)
│   │   │   ├── reset.css                      (NOUVEAU - normalize)
│   │   │   └── typography.css                 (NOUVEAU - typographie)
│   │   │
│   │   ├── components/
│   │   │   ├── buttons.css                    (NOUVEAU - styles boutons)
│   │   │   ├── cards.css                      (NOUVEAU - styles cartes)
│   │   │   ├── badges.css                     (NOUVEAU - styles badges)
│   │   │   ├── tables.css                     (NOUVEAU - styles tableaux)
│   │   │   ├── forms.css                      (NOUVEAU - styles formulaires)
│   │   │   ├── modals.css                     (NOUVEAU - styles modales)
│   │   │   └── timeline.css                   (NOUVEAU - styles timeline)
│   │   │
│   │   ├── layouts/
│   │   │   ├── sidebar.css                    (NOUVEAU)
│   │   │   ├── header.css                     (NOUVEAU)
│   │   │   └── grid.css                       (NOUVEAU)
│   │   │
│   │   ├── themes/
│   │   │   ├── dark.css                       (NOUVEAU - thème sombre)
│   │   │   └── light.css                      (NOUVEAU - thème clair)
│   │   │
│   │   └── style-stocks.css                   (existant - à refactoriser)
│   │
│   └── icons/
│       └── (Lucide icons en SVG ou CDN)
│
├── templates/
│   ├── dashboard.php                          (NOUVEAU - template dashboard)
│   ├── products.php                           (NOUVEAU - template produits)
│   ├── movements.php                          (NOUVEAU - template mouvements)
│   ├── reports.php                            (NOUVEAU - template rapports)
│   └── settings.php                           (NOUVEAU - template paramètres)
│
├── migrations/
│   ├── 001_add_automation_tables.sql          (NOUVEAU)
│   ├── 002_add_activity_log.sql               (NOUVEAU)
│   └── 003_add_export_settings.sql            (NOUVEAU)
│
└── docs/
    ├── ARCHITECTURE_REFONTE.md                (ce fichier)
    ├── COMPOSANTS.md                          (NOUVEAU - guide composants)
    ├── API_ENDPOINTS.md                       (NOUVEAU - doc API)
    └── MIGRATION_GUIDE.md                     (NOUVEAU - guide migration)
```

---

## 🗄️ SCHEMA BASE DE DONNÉES ÉTENDU

### Nouvelles tables

```sql
-- Table des règles d'automatisation
CREATE TABLE sempa_automation_rules (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type ENUM('email_alert', 'auto_export', 'stock_reorder') NOT NULL,
    trigger_condition JSON NOT NULL,  -- {"type": "low_stock", "threshold": 5}
    action_config JSON NOT NULL,      -- {"email": "admin@sempa.fr", "template": "low_stock"}
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(100),
    last_triggered_at TIMESTAMP NULL,
    INDEX idx_type (type),
    INDEX idx_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table de log d'activité utilisateur
CREATE TABLE sempa_activity_log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user VARCHAR(100) NOT NULL,
    action ENUM('create', 'update', 'delete', 'export', 'movement') NOT NULL,
    entity_type ENUM('product', 'movement', 'category', 'supplier') NOT NULL,
    entity_id INT NOT NULL,
    details JSON,  -- données avant/après, changements
    ip_address VARCHAR(45),
    user_agent VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_user (user),
    INDEX idx_entity (entity_type, entity_id),
    INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table des exports planifiés
CREATE TABLE sempa_scheduled_exports (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    export_type ENUM('csv', 'pdf', 'excel') NOT NULL,
    schedule_cron VARCHAR(50) NOT NULL,  -- '0 9 * * MON' (tous les lundis 9h)
    filters JSON,  -- filtres de données
    recipients TEXT,  -- emails séparés par virgule
    is_active BOOLEAN DEFAULT true,
    last_run_at TIMESTAMP NULL,
    next_run_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_active (is_active),
    INDEX idx_next_run (next_run_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Extension de la table produits (colonnes optionnelles)
ALTER TABLE stocks_sempa
ADD COLUMN image_url VARCHAR(500) AFTER document_pdf,
ADD COLUMN barcode VARCHAR(100) AFTER reference,
ADD COLUMN is_archived BOOLEAN DEFAULT false,
ADD INDEX idx_archived (is_archived),
ADD INDEX idx_barcode (barcode);
```

---

## 🔌 NOUVEAUX ENDPOINTS API REST

### Dashboard
```php
GET /wp-json/sempa/v1/dashboard/metrics
Response: {
  "total_products": 150,
  "total_value": 45000.50,
  "low_stock_count": 12,
  "movements_today": 8,
  "trends": {
    "value_change_percent": 2.5,
    "most_moved_product": {...},
    "recent_alerts": [...]
  }
}

GET /wp-json/sempa/v1/dashboard/charts/stock-value?period=30d
Response: {
  "labels": ["2024-01-01", "2024-01-02", ...],
  "datasets": [{
    "label": "Valeur du stock",
    "data": [42000, 42500, 43000, ...]
  }]
}
```

### Produits
```php
GET /wp-json/sempa/v1/products/cards?view=grid&category=electronique
Response: {
  "products": [{
    "id": 1,
    "reference": "REF001",
    "designation": "Product Name",
    "image_url": "https://...",
    "stock_actuel": 25,
    "stock_status": "normal",  // normal, low, critical
    "prix_vente": 99.99,
    "categorie": "Electronique"
  }, ...]
}
```

### Mouvements
```php
GET /wp-json/sempa/v1/movements/timeline?limit=20&product_id=5
Response: {
  "movements": [{
    "id": 1,
    "type": "entree",
    "quantity": 10,
    "product": {...},
    "user": "John Doe",
    "date": "2024-01-15T10:30:00Z",
    "reason": "Réapprovisionnement"
  }, ...]
}
```

### Automatisations
```php
GET /wp-json/sempa/v1/automation/rules
POST /wp-json/sempa/v1/automation/rules
PUT /wp-json/sempa/v1/automation/rules/{id}
DELETE /wp-json/sempa/v1/automation/rules/{id}
```

### Exports
```php
POST /wp-json/sempa/v1/reports/export
Body: {
  "type": "pdf",
  "filters": {...},
  "include_charts": true
}
Response: {
  "file_url": "https://.../exports/report-2024-01-15.pdf",
  "expires_at": "2024-01-16T00:00:00Z"
}
```

---

## 🎨 SYSTÈME DE DESIGN ÉTENDU

### Tokens de couleurs (CSS Variables)

```css
:root {
  /* Palette principale (conservée) */
  --sp-primary-500: #f4a412;      /* Orange principal */
  --sp-primary-600: #d4880e;      /* Orange foncé */
  --sp-primary-400: #f6b942;      /* Orange clair */

  /* Palette étendue pour dégradés */
  --sp-gray-900: #111827;         /* Fond sombre principal */
  --sp-gray-800: #1f2937;         /* Fond sombre secondaire */
  --sp-gray-700: #374151;
  --sp-gray-600: #4b5563;
  --sp-gray-500: #6b7280;
  --sp-gray-400: #9ca3af;
  --sp-gray-300: #d1d5db;
  --sp-gray-200: #e5e7eb;
  --sp-gray-100: #f3f4f6;
  --sp-gray-50: #f9fafb;

  /* Statuts */
  --sp-success: #10b981;          /* Vert */
  --sp-warning: #f59e0b;          /* Orange */
  --sp-danger: #ef4444;           /* Rouge */
  --sp-info: #3b82f6;             /* Bleu */

  /* Dégradés */
  --sp-gradient-dark: linear-gradient(135deg, #1f2937 0%, #111827 100%);
  --sp-gradient-orange: linear-gradient(135deg, #f4a412 0%, #d4880e 100%);

  /* Ombres */
  --sp-shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --sp-shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --sp-shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  --sp-shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);

  /* Rayons de bordure */
  --sp-radius-sm: 6px;
  --sp-radius-md: 10px;
  --sp-radius-lg: 14px;
  --sp-radius-xl: 20px;

  /* Espacements */
  --sp-spacing-xs: 4px;
  --sp-spacing-sm: 8px;
  --sp-spacing-md: 16px;
  --sp-spacing-lg: 24px;
  --sp-spacing-xl: 32px;
  --sp-spacing-2xl: 48px;

  /* Transitions */
  --sp-transition-fast: 150ms ease;
  --sp-transition-base: 200ms ease;
  --sp-transition-slow: 300ms ease;
}

/* Thème clair (override) */
[data-theme="light"] {
  --sp-bg-primary: #ffffff;
  --sp-bg-secondary: #f9fafb;
  --sp-text-primary: #111827;
  --sp-text-secondary: #6b7280;
}

/* Thème sombre (défaut) */
[data-theme="dark"] {
  --sp-bg-primary: #111827;
  --sp-bg-secondary: #1f2937;
  --sp-text-primary: #f9fafb;
  --sp-text-secondary: #d1d5db;
}
```

### Composants de base

```css
/* Boutons */
.sp-btn {
  padding: var(--sp-spacing-sm) var(--sp-spacing-md);
  border-radius: var(--sp-radius-md);
  font-weight: 500;
  transition: all var(--sp-transition-base);
  cursor: pointer;
  border: none;
}

.sp-btn--primary {
  background: var(--sp-gradient-orange);
  color: white;
  box-shadow: var(--sp-shadow-sm);
}

.sp-btn--primary:hover {
  transform: translateY(-1px);
  box-shadow: var(--sp-shadow-md);
}

.sp-btn--outline {
  background: transparent;
  border: 1px solid var(--sp-gray-300);
  color: var(--sp-text-primary);
}

/* Badges de statut */
.sp-badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: var(--sp-radius-sm);
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.025em;
}

.sp-badge--success {
  background: rgba(16, 185, 129, 0.1);
  color: var(--sp-success);
  border: 1px solid rgba(16, 185, 129, 0.2);
}

.sp-badge--warning {
  background: rgba(245, 158, 11, 0.1);
  color: var(--sp-warning);
  border: 1px solid rgba(245, 158, 11, 0.2);
}

.sp-badge--danger {
  background: rgba(239, 68, 68, 0.1);
  color: var(--sp-danger);
  border: 1px solid rgba(239, 68, 68, 0.2);
}

/* Cartes */
.sp-card {
  background: var(--sp-bg-primary);
  border-radius: var(--sp-radius-lg);
  box-shadow: var(--sp-shadow-md);
  padding: var(--sp-spacing-lg);
  transition: all var(--sp-transition-base);
}

.sp-card:hover {
  box-shadow: var(--sp-shadow-lg);
  transform: translateY(-2px);
}
```

---

## 📊 BIBLIOTHÈQUE DE GRAPHIQUES RECOMMANDÉE

### Choix : Chart.js

**Pourquoi Chart.js ?**
- ✅ Léger (~60KB minifié)
- ✅ Pas de dépendances
- ✅ Compatible JavaScript Vanilla
- ✅ Migration React facile (react-chartjs-2)
- ✅ 8 types de graphiques inclus
- ✅ Responsive par défaut
- ✅ Animation fluide
- ✅ Excellente documentation

**Alternatives considérées :**
- Recharts : Excellent mais nécessite React (pour Phase 2)
- ECharts : Très puissant mais lourd (900KB)
- ApexCharts : Bon compromis mais 400KB
- D3.js : Trop complexe pour ce besoin

### Configuration Chart.js

```javascript
// Configuration globale
Chart.defaults.font.family = 'Inter, system-ui, sans-serif';
Chart.defaults.color = '#9ca3af';  // --sp-gray-400
Chart.defaults.plugins.legend.display = false;
Chart.defaults.responsive = true;
Chart.defaults.maintainAspectRatio = false;
```

---

## 🔄 PLAN DE MIGRATION

### Phase 1 : Fondations (Semaine 1-2)
- [x] Audit complet de l'architecture existante
- [ ] Créer la nouvelle structure de dossiers
- [ ] Migrer les styles vers le nouveau système de design
- [ ] Créer les composants UI de base (boutons, badges, cartes)
- [ ] Intégrer Chart.js
- [ ] Créer les nouveaux endpoints API REST

### Phase 2 : Dashboard (Semaine 3)
- [ ] Nouveau composant Dashboard avec graphiques
- [ ] Métriques avec variations
- [ ] Fil d'activité temps réel
- [ ] Rafraîchissement automatique (60s)

### Phase 3 : Produits (Semaine 4)
- [ ] Vue tableau améliorée
- [ ] Vue cartes avec photos
- [ ] Toggle vue tableau/cartes
- [ ] Filtrage multi-critères
- [ ] Édition inline du stock
- [ ] Actions rapides (modifier/mouvement/supprimer)

### Phase 4 : Mouvements (Semaine 5)
- [ ] Timeline visuelle avec icônes
- [ ] Filtres temporels (jour/semaine/mois)
- [ ] Affichage de l'auteur du mouvement
- [ ] Bouton flottant "+"

### Phase 5 : Rapports (Semaine 6)
- [ ] Export CSV amélioré
- [ ] Export PDF avec graphiques
- [ ] Rapport hebdomadaire automatique
- [ ] Graphique évolution valeur stock

### Phase 6 : Automatisations (Semaine 7-8)
- [ ] Système d'alertes email
- [ ] Export planifié (cron jobs)
- [ ] Règles personnalisées
- [ ] Journal d'activité utilisateur
- [ ] Sauvegarde quotidienne

### Phase 7 : Paramètres & Finitions (Semaine 9)
- [ ] Section Automatisations dans Paramètres
- [ ] Sélection colonnes affichées
- [ ] Toggle thème clair/sombre
- [ ] Indicateur de version
- [ ] Barre de recherche globale
- [ ] Système de notifications

### Phase 8 : Tests & Déploiement (Semaine 10)
- [ ] Tests unitaires JavaScript
- [ ] Tests d'intégration API
- [ ] Tests de performance
- [ ] Documentation utilisateur
- [ ] Déploiement progressif

---

## 🚀 PERFORMANCE & OPTIMISATION

### Stratégies de cache
```javascript
// Cache navigateur pour métriques (5 minutes)
const CACHE_DURATION = 5 * 60 * 1000;

class MetricsCache {
  static get(key) {
    const cached = localStorage.getItem(`cache_${key}`);
    if (!cached) return null;

    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp > CACHE_DURATION) {
      localStorage.removeItem(`cache_${key}`);
      return null;
    }
    return data;
  }

  static set(key, data) {
    localStorage.setItem(`cache_${key}`, JSON.stringify({
      data,
      timestamp: Date.now()
    }));
  }
}
```

### Lazy loading
```javascript
// Charger les modules à la demande
async function loadModule(moduleName) {
  const module = await import(`./modules/${moduleName}.js`);
  return module.default;
}

// Exemple d'utilisation
document.querySelector('[href="#view-reports"]').addEventListener('click', async () => {
  const ReportsModule = await loadModule('reports');
  ReportsModule.init();
});
```

### WebSocket pour temps réel (optionnel)
```php
// Backend : extension optionnelle avec Ratchet
// Pour rafraîchissement en temps réel sans polling
```

---

## 🔐 SÉCURITÉ

### Authentification renforcée
```php
// Validation des permissions pour chaque endpoint
class Sempa_Stocks_API {
  public function check_permissions() {
    if (!is_user_logged_in()) {
      return new WP_Error('unauthorized', 'Non authentifié', ['status' => 401]);
    }

    if (!current_user_can('manage_sempa_stock')) {
      return new WP_Error('forbidden', 'Permissions insuffisantes', ['status' => 403]);
    }

    return true;
  }
}
```

### Validation des données
```php
// Validation stricte des entrées
class Sempa_Stocks_Validator {
  public static function validate_product($data) {
    $rules = [
      'reference' => ['required', 'string', 'max:50'],
      'designation' => ['required', 'string', 'max:200'],
      'stock_actuel' => ['required', 'integer', 'min:0'],
      'prix_vente' => ['numeric', 'min:0'],
    ];

    return self::validate($data, $rules);
  }
}
```

### Protection CSRF
```javascript
// Frontend : token CSRF dans chaque requête
const api = {
  async request(endpoint, options = {}) {
    const headers = {
      'X-WP-Nonce': SempaStocksData.nonce,
      'Content-Type': 'application/json',
      ...options.headers
    };

    return fetch(endpoint, { ...options, headers });
  }
};
```

---

## 📈 MONITORING & LOGS

### Métriques à tracker
- Temps de réponse API (< 200ms objectif)
- Taux d'erreur (< 1% objectif)
- Utilisation mémoire PHP
- Nombre de requêtes par minute
- Temps de génération des rapports

### Structure de logs
```php
class Sempa_Stocks_Logger {
  public static function log($level, $message, $context = []) {
    $log_entry = [
      'timestamp' => current_time('mysql'),
      'level' => $level,
      'message' => $message,
      'context' => $context,
      'user' => wp_get_current_user()->user_login,
      'ip' => $_SERVER['REMOTE_ADDR'] ?? 'unknown'
    ];

    error_log(json_encode($log_entry));
  }
}
```

---

## 🎓 DOCUMENTATION À CRÉER

1. **COMPOSANTS.md** : Guide d'utilisation des composants UI
2. **API_ENDPOINTS.md** : Documentation complète de l'API REST
3. **MIGRATION_GUIDE.md** : Guide de migration pour développeurs
4. **USER_GUIDE.md** : Manuel utilisateur avec screenshots
5. **DEPLOYMENT.md** : Procédure de déploiement

---

## ✅ CHECKLIST DE VALIDATION

### Fonctionnalités
- [ ] Dashboard avec graphiques dynamiques
- [ ] Vue produits en tableau et cartes
- [ ] Timeline visuelle des mouvements
- [ ] Export CSV/PDF avec graphiques
- [ ] Alertes email automatiques
- [ ] Export planifié
- [ ] Journal d'activité
- [ ] Thème clair/sombre
- [ ] Recherche globale
- [ ] Notifications discrètes

### Performance
- [ ] Temps de chargement < 2s
- [ ] API responses < 200ms
- [ ] Lazy loading fonctionnel
- [ ] Cache navigateur actif
- [ ] Pas de memory leaks

### Accessibilité
- [ ] Navigation clavier complète
- [ ] Labels ARIA corrects
- [ ] Contraste couleurs suffisant
- [ ] Support lecteurs d'écran
- [ ] Responsive mobile

### Sécurité
- [ ] Validation toutes les entrées
- [ ] Protection CSRF
- [ ] Permissions vérifiées
- [ ] Logs d'audit complets
- [ ] Pas de XSS possible

---

## 📞 CONTACT & SUPPORT

Pour questions sur cette architecture :
- GitHub Issues : `/issues`
- Documentation : `/docs`
- Email technique : admin@sempa.fr
