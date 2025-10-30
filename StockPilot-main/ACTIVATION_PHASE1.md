# 🚀 ACTIVATION PHASE 1 - FONDATIONS

## ✅ Fichiers créés

La Phase 1 (Fondations) est maintenant terminée. Voici ce qui a été implémenté :

### 📁 Structure créée

```
StockPilot-main/
├── assets/
│   ├── js/
│   │   ├── components/
│   │   │   ├── Button.js          ✅ Composant bouton réutilisable
│   │   │   ├── Badge.js           ✅ Composant badge de statut
│   │   │   └── Loader.js          ✅ Composant spinner de chargement
│   │   └── utils/
│   │       └── api.js             ✅ Client API pour AJAX
│   └── css/
│       ├── base/
│       │   └── variables.css      ✅ Tokens de design (couleurs, espacements...)
│       └── components/
│           ├── buttons.css        ✅ Styles boutons
│           ├── badges.css         ✅ Styles badges
│           └── loader.css         ✅ Styles loader
└── includes/
    └── enqueue-assets.php         ✅ Chargement des assets + Chart.js
```

### 🎨 Design System

**Variables CSS créées :**
- Palette de couleurs complète (orange, gris, statuts)
- Espacements cohérents
- Typographie (Inter)
- Ombres et rayons de bordure
- Transitions
- Support thème clair/sombre

### 🧩 Composants JavaScript

1. **Button** : Boutons avec variantes (primary, outline, ghost, danger)
2. **Badge** : Badges de statut (success, warning, danger, info)
3. **Loader** : Spinners de chargement (tailles variables, plein écran)
4. **API Client** : Client unifié pour appels AJAX

### 📊 Bibliothèques intégrées

- ✅ **Chart.js 4.4.1** : Graphiques dynamiques
- ✅ **Lucide Icons** : Icônes modernes

---

## 🔧 ACTIVATION

### Étape 1 : Activer le chargement des assets

Dans `functions.php`, ajouter cette ligne :

```php
// Charger les nouveaux assets de la refonte
require_once get_template_directory() . '/includes/enqueue-assets.php';
```

**Emplacement recommandé :** Après les autres `require_once` existants

### Étape 2 : Vérifier l'activation

1. Ouvrir la page `/stock-pilot` dans le navigateur
2. Ouvrir les DevTools (F12)
3. Vérifier dans l'onglet **Console** :
   - ✅ Message : "✅ Chart.js configuré pour StockPilot"
   - ✅ Aucune erreur 404 sur les fichiers CSS/JS

4. Vérifier dans l'onglet **Network** :
   - ✅ `variables.css` chargé
   - ✅ `buttons.css`, `badges.css`, `loader.css` chargés
   - ✅ `Button.js`, `Badge.js`, `Loader.js` chargés
   - ✅ `api.js` chargé
   - ✅ `chart.umd.js` (Chart.js) chargé
   - ✅ `lucide` (icônes) chargé

---

## 🧪 TESTS

### Test 1 : Bouton

Ouvrir la console DevTools et tester :

```javascript
// Test création bouton
const btn = Button.create({
  text: 'Test',
  variant: 'primary',
  icon: 'check',
  onClick: () => alert('Ça marche !')
});

document.body.appendChild(btn);
```

**Résultat attendu :** Un bouton orange avec icône doit apparaître en bas de page.

### Test 2 : Badge

```javascript
// Test badge
const badge = Badge.create({
  status: 'success',
  text: 'En stock',
  icon: 'check-circle'
});

document.body.appendChild(badge);
```

**Résultat attendu :** Un badge vert avec icône doit apparaître.

### Test 3 : Loader

```javascript
// Test loader plein écran
const loader = Loader.showFullscreen({
  text: 'Chargement en cours...'
});

// Masquer après 3 secondes
setTimeout(() => Loader.hideFullscreen(), 3000);
```

**Résultat attendu :** Un spinner plein écran doit apparaître pendant 3 secondes.

### Test 4 : API Client

```javascript
// Test appel API
api.getDashboardMetrics()
  .then(data => console.log('Dashboard data:', data))
  .catch(error => console.error('Erreur:', error));
```

**Résultat attendu :** Les métriques du dashboard doivent s'afficher dans la console.

### Test 5 : Chart.js

```javascript
// Test création graphique
const canvas = document.createElement('canvas');
canvas.id = 'test-chart';
canvas.style.width = '400px';
canvas.style.height = '300px';
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');
new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Jan', 'Fév', 'Mar', 'Avr'],
    datasets: [{
      label: 'Test',
      data: [10, 20, 15, 25],
      borderColor: '#f4a412',
      tension: 0.4
    }]
  }
});
```

**Résultat attendu :** Un graphique linéaire doit apparaître.

---

## 📖 UTILISATION DES COMPOSANTS

### Button

```javascript
// Méthode 1 : Créer un élément DOM
const button = Button.create({
  text: 'Enregistrer',
  variant: 'primary',
  icon: 'save',
  onClick: handleSave
});
container.appendChild(button);

// Méthode 2 : Générer HTML
const html = Button.render({
  text: 'Supprimer',
  variant: 'danger',
  icon: 'trash',
  id: 'delete-btn'
});
container.innerHTML = html;

// États
Button.setLoading(button, true);  // Afficher chargement
Button.setDisabled(button, true); // Désactiver
```

### Badge

```javascript
// Badge simple
const badge = Badge.render({
  status: 'warning',
  text: 'Stock bas',
  icon: 'alert-triangle',
  pulse: true
});

// Badge automatique selon stock
const product = { stock_actuel: 5, stock_minimum: 10 };
const stockStatus = Badge.getStockStatus(product);
const badge = Badge.render(stockStatus);
```

### Loader

```javascript
// Loader dans conteneur
const loader = Loader.show('#products-list', {
  size: 'lg',
  text: 'Chargement des produits...'
});

// Masquer après chargement
Loader.hide(loader);

// Loader plein écran
Loader.showFullscreen({ text: 'Veuillez patienter...' });
Loader.hideFullscreen();
```

### API Client

```javascript
// Instance globale automatique : window.api

// Récupérer produits
const products = await api.getProducts();

// Enregistrer produit
await api.saveProduct({
  reference: 'REF001',
  designation: 'Produit test',
  stock_actuel: 10
});

// Supprimer produit
await api.deleteProduct(123);

// Appel personnalisé
const data = await api.request('custom_action', { param: 'value' });
```

---

## 🎨 VARIABLES CSS DISPONIBLES

### Couleurs principales

```css
var(--sp-primary-500)      /* Orange #f4a412 */
var(--sp-gray-900)         /* Gris foncé #111827 */
var(--sp-success-500)      /* Vert #10b981 */
var(--sp-warning-500)      /* Orange #f59e0b */
var(--sp-danger-500)       /* Rouge #ef4444 */
var(--sp-info-500)         /* Bleu #3b82f6 */
```

### Espacements

```css
var(--sp-spacing-xs)       /* 4px */
var(--sp-spacing-sm)       /* 8px */
var(--sp-spacing-md)       /* 16px */
var(--sp-spacing-lg)       /* 24px */
var(--sp-spacing-xl)       /* 32px */
```

### Ombres

```css
var(--sp-shadow-sm)
var(--sp-shadow-md)
var(--sp-shadow-lg)
var(--sp-shadow-xl)
```

### Rayons de bordure

```css
var(--sp-radius-sm)        /* 6px */
var(--sp-radius-md)        /* 10px */
var(--sp-radius-lg)        /* 14px */
var(--sp-radius-xl)        /* 20px */
```

### Exemple d'utilisation

```css
.custom-card {
  background: var(--sp-bg-primary);
  padding: var(--sp-spacing-lg);
  border-radius: var(--sp-radius-lg);
  box-shadow: var(--sp-shadow-md);
  color: var(--sp-text-primary);
}
```

---

## 🔄 PROCHAINES ÉTAPES

Maintenant que les fondations sont en place, vous pouvez :

### Option A : Implémenter le Dashboard (Phase 3)
- Utiliser les exemples dans `examples/dashboard-example.js`
- Créer les graphiques avec Chart.js
- Afficher les métriques avec MetricCard

### Option B : Implémenter la vue Produits (Phase 4)
- Utiliser les exemples dans `examples/products-cards-example.js`
- Créer la vue en cartes avec ProductCard
- Ajouter les filtres multi-critères

---

## 🐛 DÉPANNAGE

### Problème : Chart.js non trouvé

**Erreur :** `Uncaught ReferenceError: Chart is not defined`

**Solution :**
1. Vérifier que `enqueue-assets.php` est bien inclus dans `functions.php`
2. Vider le cache du navigateur (Ctrl+Shift+R)
3. Vérifier dans DevTools > Network que `chart.umd.js` est chargé

### Problème : Icônes Lucide ne s'affichent pas

**Erreur :** Les icônes apparaissent comme `[icon]`

**Solution :**
1. Vérifier que Lucide est chargé dans Network
2. Appeler manuellement `lucide.createIcons()` dans la console
3. Vérifier que les icônes utilisent `data-lucide="icon-name"`

### Problème : Styles CSS non appliqués

**Erreur :** Les boutons n'ont pas de style

**Solution :**
1. Vérifier que `variables.css` est chargé **en premier**
2. Vérifier l'ordre de chargement dans `enqueue-assets.php`
3. Vider le cache du navigateur

### Problème : API client non trouvé

**Erreur :** `Uncaught ReferenceError: api is not defined`

**Solution :**
1. Vérifier que `api.js` est chargé
2. Vérifier que `SempaStocksData` est défini (objet localize)
3. Initialiser manuellement :
```javascript
window.api = new API('/wp-admin/admin-ajax.php', SempaStocksData.nonce);
```

---

## ✅ CHECKLIST D'ACTIVATION

- [ ] Fichier `enqueue-assets.php` inclus dans `functions.php`
- [ ] Page `/stock-pilot` accessible
- [ ] Message "Chart.js configuré" dans la console
- [ ] Aucune erreur 404 dans Network
- [ ] Variables CSS chargées (vérifier via DevTools > Éléments > Computed)
- [ ] Test Button réussi
- [ ] Test Badge réussi
- [ ] Test Loader réussi
- [ ] Test API Client réussi
- [ ] Test Chart.js réussi

---

## 📞 SUPPORT

Pour toute question ou problème :
- Consulter `LIVRABLES_REFONTE.md` pour le plan complet
- Consulter `COMPOSANTS.md` pour la liste des composants
- Examiner les exemples dans le dossier `examples/`

---

**Phase 1 terminée ! 🎉**

Prêt pour la Phase 3 : Dashboard avec graphiques dynamiques.
