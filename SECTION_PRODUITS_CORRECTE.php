<!-- SECTION PRODUITS - À COPIER/COLLER DANS stocks.php -->
<!-- Remplacez TOUTE la section depuis <section...id="view-products"> jusqu'à </section> -->

                    <section class="stockpilot-section main-view" id="view-products" aria-labelledby="stocks-products-title">
                        <div class="section-header">
                            <div>
                                <p class="section-eyebrow"><?php esc_html_e('Catalogue', 'sempa'); ?></p>
                                <h2 id="stocks-products-title"><?php esc_html_e('Produits', 'sempa'); ?></h2>
                                <p class="section-subtitle"><?php esc_html_e('Gérez vos références, fournisseurs et niveaux de stock.', 'sempa'); ?></p>
                            </div>
                            <div class="section-actions">
                                <button type="button" class="button button--primary" id="stocks-open-product-form"><?php esc_html_e('Ajouter un produit', 'sempa'); ?></button>
                            </div>
                        </div>
                        <div class="products-toolbar" role="group" aria-label="<?php esc_attr_e('Filtres produits', 'sempa'); ?>">
                            <div class="toolbar-field">
                                <label for="stocks-filter-category"><?php esc_html_e('Catégorie', 'sempa'); ?></label>
                                <select id="stocks-filter-category"></select>
                            </div>
                            <div class="toolbar-field">
                                <label for="stocks-filter-supplier"><?php esc_html_e('Fournisseur', 'sempa'); ?></label>
                                <select id="stocks-filter-supplier"></select>
                            </div>
                            <div class="toolbar-field">
                                <label for="stocks-filter-status"><?php esc_html_e('Statut', 'sempa'); ?></label>
                                <select id="stocks-filter-status">
                                    <option value=""><?php esc_html_e('Tous les statuts', 'sempa'); ?></option>
                                    <option value="normal"><?php esc_html_e('En stock', 'sempa'); ?></option>
                                    <option value="warning"><?php esc_html_e('Stock faible', 'sempa'); ?></option>
                                    <option value="critical"><?php esc_html_e('Rupture', 'sempa'); ?></option>
                                </select>
                            </div>
                            <div class="toolbar-actions">
                                <button type="button" class="button button--ghost" id="stocks-clear-filters"><?php esc_html_e('Réinitialiser', 'sempa'); ?></button>
                            </div>
                        </div>
                        <!-- Grille de produits (mode carte) -->
                        <div id="products-grid-container">
                            <div class="sp-empty-state">
                                <i data-lucide="loader"></i>
                                <p><?php esc_html_e('Chargement des produits...', 'sempa'); ?></p>
                            </div>
                        </div>

                        <!-- Pagination -->
                        <div class="products-pagination" role="group" aria-label="<?php esc_attr_e('Pagination des produits', 'sempa'); ?>">
                            <div class="pagination-info">
                                <label for="products-per-page"><?php esc_html_e('Afficher', 'sempa'); ?></label>
                                <select id="products-per-page">
                                    <option value="12">12</option>
                                    <option value="24" selected>24</option>
                                    <option value="48">48</option>
                                    <option value="all"><?php esc_html_e('Tous', 'sempa'); ?></option>
                                </select>
                                <span><?php esc_html_e('par page', 'sempa'); ?></span>
                            </div>
                            <div class="pagination-status">
                                <span id="products-count-info"><?php esc_html_e('Chargement...', 'sempa'); ?></span>
                            </div>
                            <div class="pagination-controls">
                                <button type="button" id="products-prev-page" class="button button--ghost" disabled><?php esc_html_e('Précédent', 'sempa'); ?></button>
                                <span id="products-page-info" class="pagination-page-info"><?php esc_html_e('Page 1 sur 1', 'sempa'); ?></span>
                                <button type="button" id="products-next-page" class="button button--ghost" disabled><?php esc_html_e('Suivant', 'sempa'); ?></button>
                            </div>
                        </div>
                    </section>
