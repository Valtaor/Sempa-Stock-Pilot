/**
 * SCRIPT DE DIAGNOSTIC STOCKPILOT - PRODUITS
 *
 * Copiez/collez ce script ENTIER dans la console (F12 → Console)
 * puis envoyez-moi TOUT le résultat
 */

console.log('═══════════════════════════════════════════════════');
console.log('🔍 DIAGNOSTIC STOCKPILOT - PRODUITS');
console.log('═══════════════════════════════════════════════════\n');

// 1. Vérifier les objets globaux
console.log('1️⃣ OBJETS GLOBAUX');
console.log('------------------');
console.log('SempaStocksData existe:', typeof window.SempaStocksData !== 'undefined');
if (window.SempaStocksData) {
  console.log('  ajaxUrl:', window.SempaStocksData.ajaxUrl);
  console.log('  nonce:', window.SempaStocksData.nonce ? 'OUI' : 'NON');
}
console.log('API existe:', typeof window.api !== 'undefined');
console.log('ProductCard existe:', typeof window.ProductCard !== 'undefined');
console.log('productsModule existe:', typeof window.productsModule !== 'undefined');
console.log('stockpilot existe:', typeof window.stockpilot !== 'undefined');
if (window.stockpilot) {
  console.log('  initialisé:', window.stockpilot.initialized);
  console.log('  vue actuelle:', window.stockpilot.currentView);
}
console.log('');

// 2. Vérifier les vues
console.log('2️⃣ VUES');
console.log('--------');
const viewDashboard = document.getElementById('view-dashboard');
const viewProducts = document.getElementById('view-products');
console.log('view-dashboard existe:', !!viewDashboard);
if (viewDashboard) {
  console.log('  display:', viewDashboard.style.display || 'non défini');
}
console.log('view-products existe:', !!viewProducts);
if (viewProducts) {
  console.log('  display:', viewProducts.style.display || 'non défini');
}
console.log('');

// 3. Vérifier le conteneur produits
console.log('3️⃣ CONTENEUR PRODUITS');
console.log('----------------------');
const container = document.getElementById('products-grid-container');
console.log('products-grid-container existe:', !!container);
if (container) {
  console.log('  innerHTML length:', container.innerHTML.length);
  console.log('  contenu:', container.innerHTML.substring(0, 200) + '...');
}
console.log('');

// 4. Vérifier le module products
console.log('4️⃣ MODULE PRODUCTS');
console.log('-------------------');
if (window.productsModule) {
  console.log('initialisé:', window.productsModule.initialized);
  console.log('nombre de produits:', window.productsModule.products?.length || 0);
  console.log('produits filtrés:', window.productsModule.filteredProducts?.length || 0);
  console.log('page actuelle:', window.productsModule.currentPage);
  console.log('par page:', window.productsModule.perPage);
  console.log('filtres actifs:', JSON.stringify(window.productsModule.filters));
} else {
  console.log('❌ productsModule NON DISPONIBLE');
}
console.log('');

// 5. Test de l'API
console.log('5️⃣ TEST API');
console.log('------------');
if (window.api) {
  console.log('Test en cours...');
  window.api.getProducts()
    .then(response => {
      console.log('✅ API retourne une réponse:');
      console.log('  Type:', typeof response);
      console.log('  Clés:', Object.keys(response));
      console.log('  response.products existe:', !!response.products);
      if (response.products) {
        console.log('  Nombre de produits:', response.products.length);
        if (response.products.length > 0) {
          console.log('  Premier produit:', response.products[0]);
        }
      } else {
        console.log('  Contenu brut:', response);
      }
      console.log('\n═══════════════════════════════════════════════════');
      console.log('✅ FIN DU DIAGNOSTIC - Copiez TOUT et envoyez-moi');
      console.log('═══════════════════════════════════════════════════');
    })
    .catch(error => {
      console.error('❌ ERREUR API:', error);
      console.error('  Message:', error.message);
      console.error('  Stack:', error.stack);
      console.log('\n═══════════════════════════════════════════════════');
      console.log('❌ FIN DU DIAGNOSTIC - Copiez TOUT et envoyez-moi');
      console.log('═══════════════════════════════════════════════════');
    });
} else {
  console.log('❌ API NON DISPONIBLE');
  console.log('\n═══════════════════════════════════════════════════');
  console.log('FIN DU DIAGNOSTIC - Copiez TOUT et envoyez-moi');
  console.log('═══════════════════════════════════════════════════');
}
