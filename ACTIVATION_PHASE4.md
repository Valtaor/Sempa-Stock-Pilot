# 🎴 ACTIVATION PHASE 4 - Vue Produits (Mode Carte)

## ✅ Ce qui a été implémenté

### 🎨 Composants créés
- **ProductCard.js** : Carte produit moderne avec image, métadonnées, stats et actions
- **products.js** : Module complet de gestion de la vue produits

### ✨ Fonctionnalités
- ✅ Affichage en grille de cartes responsive
- ✅ Filtres multi-critères (catégorie, fournisseur, statut)
- ✅ Recherche instantanée (référence, désignation, catégorie, fournisseur)
- ✅ Pagination intelligente (12, 24, 48 ou tous)
- ✅ Actions rapides par produit (éditer, dupliquer, supprimer)
- ✅ Badges de statut (en stock, stock faible, rupture)
- ✅ Liens vers documents (PDF, images)
- ✅ États visuels (hover, focus, active)

### 📦 Fichiers modifiés/créés

**Créés :**
- `assets/js/components/ProductCard.js` (332 lignes)
- `assets/css/components/product-card.css` (573 lignes)
- `assets/js/modules/products.js` (413 lignes)

**Modifiés :**
- `stocks.php` (remplacement tableau par grille de cartes)
- `includes/enqueue-assets.php` (ajout ProductCard, product-card.css, products.js)
- `assets/js/app.js` (ajout méthode initProducts())

---

## 🚀 GUIDE D'ACTIVATION

### Étape 1 : Vérifier les fichiers

Tous les fichiers doivent être présents :

```bash
ls -la assets/js/components/ProductCard.js
ls -la assets/css/components/product-card.css
ls -la assets/js/modules/products.js
```

### Étape 2 : Vider le cache

- Cache WordPress
- Cache navigateur (Ctrl+Shift+R)
- Cache des plugins

### Étape 3 : Tester la vue

1. Connectez-vous et accédez à `/stock-pilot`
2. Cliquez sur "Produits" dans la navigation
3. La vue doit s'afficher avec :
   - Grille de cartes produits
   - Filtres en haut
   - Pagination en bas

---

## ✅ TESTS DE VALIDATION

### Test 1 : Affichage des cartes
**Attendu :** Les produits s'affichent en grille de cartes

**Vérifier :**
- Console (F12) : `✅ Module Products initialisé`
- Chaque carte affiche :
  - Image ou placeholder
  - Badge de statut (coloré)
  - Titre du produit
  - Référence (avec icône #)
  - Catégorie, fournisseur, emplacement (avec icônes)
  - Stats : Stock, Prix achat, Prix vente
  - 3 boutons d'action (éditer, dupliquer, supprimer)
  - Lien vers document (si présent)

**En cas d'erreur :**
- Vérifier que `ProductCard` est défini : `console.log(typeof ProductCard)`
- Vérifier que l'API retourne des produits : `api.getProducts().then(console.log)`

### Test 2 : Filtres
**Attendu :** Les filtres fonctionnent et mettent à jour la grille

**Vérifier :**
- **Catégorie** : Sélectionner une catégorie → seuls les produits de cette catégorie s'affichent
- **Fournisseur** : Sélectionner un fournisseur → seuls les produits de ce fournisseur s'affichent
- **Statut** :
  - "En stock" → produits avec stock > minimum
  - "Stock faible" → produits avec stock ≤ minimum
  - "Rupture" → produits avec stock = 0
- **Bouton "Réinitialiser"** → tous les filtres sont effacés

### Test 3 : Recherche
**Attendu :** La recherche filtre instantanément les produits

**Vérifier :**
- Taper une référence → seul ce produit s'affiche
- Taper une désignation → produits correspondants s'affichent
- Taper une catégorie → tous les produits de cette catégorie s'affichent
- Recherche insensible à la casse

### Test 4 : Pagination
**Attendu :** La pagination fonctionne correctement

**Vérifier :**
- Sélecteur "Afficher X par page" :
  - 12 → max 12 cartes par page
  - 24 → max 24 cartes par page
  - 48 → max 48 cartes par page
  - Tous → toutes les cartes sur une page
- Info "X-Y sur Z produits" affichée correctement
- Info "Page X sur Y" affichée correctement
- Bouton "Précédent" désactivé sur page 1
- Bouton "Suivant" désactivé sur dernière page
- Cliquer "Suivant" → affiche la page suivante
- Cliquer "Précédent" → revient à la page précédente

### Test 5 : Actions
**Attendu :** Les boutons d'action déclenchent les actions appropriées

**Vérifier :**
- Cliquer sur icône **éditer** (crayon) → alerte "Éditer le produit"
- Cliquer sur icône **dupliquer** (copier) → alerte "Dupliquer le produit"
- Cliquer sur icône **supprimer** (poubelle) → confirmation puis alerte "Supprimé"
- Cliquer sur icône **document** (fichier) → ouvre le PDF/image dans nouvel onglet

### Test 6 : Responsive
**Attendu :** La grille s'adapte aux petits écrans

**Vérifier :**
- Desktop (1200px+) : 3-4 cartes par ligne
- Tablette (768px) : 2 cartes par ligne
- Mobile (375px) : 1 carte par ligne
- Les cartes restent lisibles et fonctionnelles

### Test 7 : États visuels
**Attendu :** Les états visuels sont clairs

**Vérifier :**
- **Hover sur carte** : légère élévation + ombre
- **Hover sur bouton action** : changement de couleur
- **Rupture de stock** : barre rouge en haut de la carte
- **Stock faible** : barre orange en haut de la carte
- **Badge statut** : couleur appropriée (vert/orange/rouge)

---

## 🐛 DÉPANNAGE

### Problème : Les cartes ne s'affichent pas

**Cause possible :** Module products non chargé

**Solution :**
```javascript
// Dans la console :
console.log(typeof ProductCard);
// Doit afficher : "function"

console.log(typeof window.productsModule);
// Doit afficher : "object"

// Si undefined, vérifier enqueue-assets.php
```

### Problème : Erreur "ProductCard is not defined"

**Cause possible :** ProductCard.js chargé après products.js

**Solution :**
- Vérifier `enqueue-assets.php` ligne 144-150
- ProductCard doit être enregistré AVANT products.js
- Vérifier les dépendances : `'sp-products'` doit dépendre de `'sp-product-card'`

### Problème : Les filtres ne fonctionnent pas

**Cause possible :** IDs des éléments HTML incorrects

**Solution :**
```javascript
// Vérifier que les IDs existent :
console.log(document.getElementById('stocks-filter-category'));
console.log(document.getElementById('stocks-filter-supplier'));
console.log(document.getElementById('stocks-filter-status'));
console.log(document.getElementById('stocks-search'));

// Doivent tous retourner un élément HTML, pas null
```

### Problème : La pagination ne fonctionne pas

**Cause possible :** IDs des boutons incorrects

**Solution :**
```javascript
// Vérifier :
console.log(document.getElementById('products-per-page'));
console.log(document.getElementById('products-prev-page'));
console.log(document.getElementById('products-next-page'));
console.log(document.getElementById('products-page-info'));
console.log(document.getElementById('products-count-info'));
```

### Problème : Les icônes ne s'affichent pas

**Cause possible :** Lucide Icons non initialisé

**Solution :**
```javascript
// Dans la console après chargement :
console.log(typeof lucide);
// Doit afficher : "object"

// Réinitialiser manuellement :
lucide.createIcons();
```

---

## 📝 ARCHITECTURE TECHNIQUE

### Composant ProductCard

**Responsabilités :**
- Affichage d'une carte produit
- Gestion des événements (clic sur actions)
- Calcul du statut du stock
- Protection XSS (escapeHtml)

**Méthodes principales :**
- `render(product, options)` : Crée une carte
- `renderGrid(products, options)` : Crée une grille de cartes
- `getStockStatus(product)` : Détermine le statut (success/warning/danger)
- `attachEventListeners()` : Attache les événements

### Module products.js

**Responsabilités :**
- Chargement des produits via API
- Filtrage multi-critères
- Recherche instantanée
- Pagination
- Gestion des actions (éditer, dupliquer, supprimer)

**Propriétés :**
- `products` : Tous les produits
- `filteredProducts` : Produits après filtrage
- `currentPage` : Page actuelle
- `perPage` : Nombre de produits par page
- `filters` : Filtres actifs

**Méthodes principales :**
- `init()` : Initialise le module
- `loadProducts()` : Charge depuis l'API
- `applyFilters()` : Applique les filtres
- `renderProducts()` : Affiche la grille
- `updatePaginationInfo()` : Met à jour les infos

---

## 🎯 FONCTIONNALITÉS À IMPLÉMENTER (TODO)

Les fonctionnalités marquées "à implémenter" dans le code :

1. **Formulaire d'édition de produit**
   - Actuellement : alerte de démonstration
   - À faire : ouvrir le formulaire existant et pré-remplir

2. **Duplication de produit**
   - Actuellement : alerte de démonstration
   - À faire : créer un nouvel endpoint API pour dupliquer

3. **Suppression de produit**
   - Actuellement : simulation
   - À faire : appeler l'API réelle de suppression

4. **Ajout de produit**
   - Actuellement : alerte
   - À faire : intégrer le formulaire existant

---

## 💡 PERSONNALISATION

### Modifier le nombre de cartes par page

Éditer `products.js` ligne 11 :
```javascript
this.perPage = 24; // Changer la valeur par défaut
```

Éditer `stocks.php` ligne 225-229 pour modifier les options :
```php
<select id="products-per-page">
    <option value="12">12</option>
    <option value="24" selected>24</option> <!-- selected = défaut -->
    <option value="48">48</option>
</select>
```

### Modifier les critères de filtrage

Éditer `products.js` méthode `applyFilters()` ligne 157-205 :
```javascript
applyFilters() {
  this.filteredProducts = this.products.filter(product => {
    // Ajouter vos critères ici
  });
}
```

### Modifier le design des cartes

Éditer `product-card.css` :
- Taille d'image : ligne 50 (height: 200px)
- Nombre de colonnes : ligne 13 (minmax(320px, 1fr))
- Couleurs : utiliser les tokens CSS (--sp-*)

---

## 📊 PERFORMANCE

**Optimisations implémentées :**
- Lazy loading des images (`loading="lazy"`)
- Animation progressive (délais échelonnés)
- Pagination côté client (évite de charger tous les produits)
- Filtres instantanés (pas d'appel API)

**Métriques attendues :**
- Chargement initial : < 1s
- Filtrage : instantané (< 100ms)
- Changement de page : instantané (< 100ms)
- Rendu de 24 cartes : < 300ms

---

## ✉️ SUPPORT

**Commandes de diagnostic :**

```javascript
// Vérifier le module
console.log(window.productsModule);
console.log(window.productsModule.products.length);
console.log(window.productsModule.filteredProducts.length);

// Vérifier les filtres
console.log(window.productsModule.filters);

// Vérifier la pagination
console.log(`Page ${window.productsModule.currentPage}`);
console.log(`Par page : ${window.productsModule.perPage}`);

// Recharger manuellement
window.productsModule.refresh();

// Réinitialiser les filtres
window.productsModule.clearFilters();
```

---

**🎉 Bonne activation de la Phase 4 !**

La vue produits en mode carte offre une expérience moderne et intuitive pour gérer votre catalogue.
