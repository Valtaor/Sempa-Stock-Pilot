# 🔐 Guide de Sauvegarde et Restauration - SEMPA Stock Pilot

## 📋 Table des matières

1. [Vue d'ensemble](#vue-densemble)
2. [Configuration des backups automatiques](#configuration-des-backups-automatiques)
3. [Types de sauvegardes](#types-de-sauvegardes)
4. [Politique de rétention](#politique-de-rétention)
5. [Procédure de restauration](#procédure-de-restauration)
6. [Tests de restauration](#tests-de-restauration)
7. [Checklist de sécurité](#checklist-de-sécurité)

---

## 🎯 Vue d'ensemble

La stratégie de backup de SEMPA Stock Pilot suit la règle **3-2-1** :

- **3** copies des données
- **2** types de médias différents
- **1** copie hors site (off-site)

### Éléments à sauvegarder

#### Priorité CRITIQUE (sauvegarde quotidienne)
- ✅ Base de données MySQL (`dbs1363734`)
  - Table `stocks_sempa` (produits)
  - Table `mouvements_stocks_sempa` (historique)
  - Table `fournisseurs` (fournisseurs)
  - Table `categories_stocks` (catégories)
- ✅ Fichiers PHP du thème enfant
  - `functions.php`
  - `includes/functions_stocks.php`
  - `includes/db_connect_stocks.php`
  - `includes/functions_commandes.php`
  - `includes/file-integrity.php`
- ✅ Documents téléchargés
  - Répertoire `uploads-stocks/`

#### Priorité HAUTE (sauvegarde hebdomadaire)
- 📝 Fichiers de configuration
  - `.htaccess`
  - `wp-config.php` (si personnalisé)
- 🎨 Assets frontend
  - `style-stocks.css`
  - `gestion-stocks.js`
  - `logo-since-b.svg`

---

## ⚙️ Configuration des backups automatiques

### Option 1 : Backup via cPanel/Plesk (Recommandé pour débutants)

#### cPanel

1. **Accéder à cPanel**
   ```
   https://votre-hebergeur.com:2083
   ```

2. **Configurer les sauvegardes automatiques**
   - Aller dans **Backup** ou **Sauvegarde**
   - Activer **"Génération automatique de sauvegarde"**
   - Fréquence : **Quotidienne**
   - Rétention : **30 jours minimum**

3. **Configurer les notifications**
   - Email de notification : `admin@sempa.fr`
   - Alertes en cas d'échec : **OUI**

4. **Télécharger manuellement**
   ```bash
   # Se connecter à cPanel
   # Aller dans Backup > Download a Full Backup
   ```

#### Plesk

1. **Accéder à Plesk**
   ```
   https://votre-hebergeur.com:8443
   ```

2. **Configurer Backup Manager**
   - Aller dans **Outils et paramètres > Backup Manager**
   - Créer un planning de sauvegarde
   - Type : **Complète** (quotidienne)
   - Type : **Incrémentielle** (toutes les 6h)

---

### Option 2 : Backup via script shell (Recommandé pour production)

#### Script de backup automatique

Créer le fichier `/root/scripts/backup-sempa.sh` :

```bash
#!/bin/bash

# =====================================================
# Script de Backup SEMPA Stock Pilot
# =====================================================
# Ce script sauvegarde la base de données et les fichiers
# Version : 2.0.0
# Auteur : Équipe SEMPA
# =====================================================

# Configuration
DB_HOST="db5001643902.hosting-data.io"
DB_NAME="dbs1363734"
DB_USER="dbu1662343"
DB_PASS="14Juillet@"
BACKUP_DIR="/root/backups/sempa"
SITE_DIR="/var/www/html/wp-content/themes/uncode-child"
S3_BUCKET="s3://sempa-backups"  # À configurer
RETENTION_DAYS=30
DATE=$(date +"%Y-%m-%d_%H%M%S")
LOG_FILE="$BACKUP_DIR/backup.log"

# Créer le répertoire de backup s'il n'existe pas
mkdir -p "$BACKUP_DIR"

# Fonction de log
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

log "=== Début du backup SEMPA ==="

# 1. Backup de la base de données
log "Backup de la base de données..."
mysqldump -h "$DB_HOST" -u "$DB_USER" -p"$DB_PASS" "$DB_NAME" \
    --single-transaction \
    --quick \
    --lock-tables=false \
    > "$BACKUP_DIR/db_${DATE}.sql"

if [ $? -eq 0 ]; then
    log "✓ Backup base de données réussi"
    gzip "$BACKUP_DIR/db_${DATE}.sql"
    log "✓ Compression réussie : db_${DATE}.sql.gz"
else
    log "✗ ERREUR : Échec du backup de la base de données"
    exit 1
fi

# 2. Backup des fichiers critiques
log "Backup des fichiers PHP..."
tar -czf "$BACKUP_DIR/files_${DATE}.tar.gz" \
    -C "$SITE_DIR" \
    functions.php \
    includes/functions_stocks.php \
    includes/db_connect_stocks.php \
    includes/functions_commandes.php \
    includes/file-integrity.php \
    includes/healthcheck.php \
    gestion-stocks.js \
    style-stocks.css

if [ $? -eq 0 ]; then
    log "✓ Backup fichiers PHP réussi"
else
    log "✗ ERREUR : Échec du backup des fichiers PHP"
fi

# 3. Backup des uploads
log "Backup des documents téléchargés..."
if [ -d "$SITE_DIR/uploads-stocks" ]; then
    tar -czf "$BACKUP_DIR/uploads_${DATE}.tar.gz" \
        -C "$SITE_DIR" uploads-stocks/

    if [ $? -eq 0 ]; then
        log "✓ Backup uploads réussi"
    else
        log "✗ ERREUR : Échec du backup des uploads"
    fi
else
    log "⚠ Répertoire uploads-stocks introuvable"
fi

# 4. Copier vers stockage externe (AWS S3, FTP, etc.)
log "Copie vers stockage externe..."

# Exemple avec AWS S3 (nécessite aws-cli installé)
if command -v aws &> /dev/null; then
    aws s3 cp "$BACKUP_DIR/db_${DATE}.sql.gz" "$S3_BUCKET/daily/" --storage-class STANDARD_IA
    aws s3 cp "$BACKUP_DIR/files_${DATE}.tar.gz" "$S3_BUCKET/daily/"
    log "✓ Copie S3 réussie"
fi

# 5. Nettoyage des anciens backups (rétention)
log "Nettoyage des backups anciens (> $RETENTION_DAYS jours)..."
find "$BACKUP_DIR" -name "db_*.sql.gz" -mtime +$RETENTION_DAYS -delete
find "$BACKUP_DIR" -name "files_*.tar.gz" -mtime +$RETENTION_DAYS -delete
find "$BACKUP_DIR" -name "uploads_*.tar.gz" -mtime +$RETENTION_DAYS -delete
log "✓ Nettoyage terminé"

# 6. Vérification de l'intégrité
log "Vérification de l'intégrité du backup..."
gunzip -t "$BACKUP_DIR/db_${DATE}.sql.gz" 2>/dev/null
if [ $? -eq 0 ]; then
    log "✓ Intégrité du backup vérifiée"
else
    log "✗ ERREUR : Le backup est corrompu !"
    exit 1
fi

# 7. Calcul de la taille
DB_SIZE=$(du -h "$BACKUP_DIR/db_${DATE}.sql.gz" | cut -f1)
FILES_SIZE=$(du -h "$BACKUP_DIR/files_${DATE}.tar.gz" | cut -f1)

log "=== Backup terminé avec succès ==="
log "Taille DB : $DB_SIZE"
log "Taille fichiers : $FILES_SIZE"
log "Emplacement : $BACKUP_DIR"

exit 0
```

#### Rendre le script exécutable

```bash
chmod +x /root/scripts/backup-sempa.sh
```

#### Ajouter au crontab

```bash
# Éditer le crontab
crontab -e

# Ajouter cette ligne pour un backup quotidien à 2h du matin
0 2 * * * /root/scripts/backup-sempa.sh >> /root/backups/sempa/cron.log 2>&1

# Backup horaire de la base de données (incrémentiels)
0 * * * * /root/scripts/backup-sempa-incremental.sh >> /root/backups/sempa/cron.log 2>&1
```

---

## 📦 Types de sauvegardes

### 1. Backup Complet (Full Backup)

**Fréquence :** Quotidien (2h du matin)

**Contenu :**
- Intégralité de la base de données
- Tous les fichiers PHP
- Tous les uploads

**Taille estimée :** 50-100 MB

**Durée :** ~5 minutes

---

### 2. Backup Incrémentiel

**Fréquence :** Toutes les 6 heures

**Contenu :**
- Uniquement les modifications depuis le dernier backup
- Tables modifiées
- Nouveaux fichiers uploadés

**Taille estimée :** 5-10 MB

**Durée :** ~1 minute

---

### 3. Backup manuel (avant mise à jour)

**Quand l'effectuer :**
- Avant toute modification de code
- Avant mise à jour de plugin
- Avant migration
- Avant restauration

**Commande rapide :**
```bash
/root/scripts/backup-sempa.sh --manual
```

---

## 🗄️ Politique de rétention

### Backups locaux (serveur)

| Type | Rétention | Emplacement |
|------|-----------|-------------|
| Quotidiens | 30 jours | `/root/backups/sempa/daily/` |
| Hebdomadaires | 3 mois | `/root/backups/sempa/weekly/` |
| Mensuels | 1 an | `/root/backups/sempa/monthly/` |

### Backups off-site (AWS S3 ou équivalent)

| Type | Rétention | Storage Class |
|------|-----------|---------------|
| Quotidiens | 90 jours | STANDARD_IA |
| Hebdomadaires | 1 an | GLACIER |
| Mensuels | 5 ans | DEEP_ARCHIVE |

---

## 🔄 Procédure de restauration

### Restauration complète de la base de données

```bash
# 1. Se connecter au serveur via SSH
ssh user@sempa.fr

# 2. Lister les backups disponibles
ls -lh /root/backups/sempa/db_*.sql.gz

# 3. Décompresser le backup
gunzip /root/backups/sempa/db_2025-10-30_020000.sql.gz

# 4. Restaurer la base de données
mysql -h db5001643902.hosting-data.io \
      -u dbu1662343 \
      -p14Juillet@ \
      dbs1363734 < /root/backups/sempa/db_2025-10-30_020000.sql

# 5. Vérifier que les données sont restaurées
mysql -h db5001643902.hosting-data.io \
      -u dbu1662343 \
      -p14Juillet@ \
      dbs1363734 \
      -e "SELECT COUNT(*) as total_produits FROM stocks_sempa;"
```

### Restauration des fichiers PHP

```bash
# 1. Extraire l'archive
cd /var/www/html/wp-content/themes/uncode-child
tar -xzf /root/backups/sempa/files_2025-10-30_020000.tar.gz

# 2. Vérifier les permissions
chown -R www-data:www-data /var/www/html/wp-content/themes/uncode-child
chmod 644 *.php
chmod 755 includes/

# 3. Vérifier la syntaxe PHP
php -l functions.php
php -l includes/functions_stocks.php
```

### Restauration des uploads

```bash
cd /var/www/html/wp-content/themes/uncode-child
tar -xzf /root/backups/sempa/uploads_2025-10-30_020000.tar.gz
chown -R www-data:www-data uploads-stocks/
chmod 755 uploads-stocks/
```

---

## ✅ Tests de restauration

**IMPORTANT :** Tester la restauration tous les mois !

### Checklist de test mensuel

```bash
# Créer un environnement de test
# 1. Créer une base de données de test
mysql -h db5001643902.hosting-data.io -u dbu1662343 -p14Juillet@ \
      -e "CREATE DATABASE dbs1363734_test;"

# 2. Restaurer le backup dans la base de test
mysql -h db5001643902.hosting-data.io -u dbu1662343 -p14Juillet@ \
      dbs1363734_test < /root/backups/sempa/db_latest.sql

# 3. Vérifier l'intégrité des données
mysql -h db5001643902.hosting-data.io -u dbu1662343 -p14Juillet@ \
      dbs1363734_test -e "
      SELECT
        (SELECT COUNT(*) FROM stocks_sempa) as produits,
        (SELECT COUNT(*) FROM mouvements_stocks_sempa) as mouvements,
        (SELECT COUNT(*) FROM fournisseurs) as fournisseurs;
      "

# 4. Nettoyer la base de test
mysql -h db5001643902.hosting-data.io -u dbu1662343 -p14Juillet@ \
      -e "DROP DATABASE dbs1363734_test;"
```

### Résultats attendus

- ✅ Tous les produits présents
- ✅ Historique des mouvements complet
- ✅ Fichiers PHP valides (pas d'erreurs de syntaxe)
- ✅ Documents PDF accessibles

---

## 🔒 Checklist de sécurité

### Avant de mettre en production

- [ ] **Backups automatiques configurés** (cron quotidien)
- [ ] **Backups off-site configurés** (S3, FTP, ou autre)
- [ ] **Test de restauration effectué** (au moins une fois)
- [ ] **Alertes email configurées** (en cas d'échec)
- [ ] **Permissions fichiers correctes** (644 pour PHP, 755 pour dossiers)
- [ ] **Script de backup testé manuellement**
- [ ] **Documentation à jour**

### Surveillance continue

- [ ] **Vérifier les logs de backup quotidiennement**
  ```bash
  tail -f /root/backups/sempa/backup.log
  ```

- [ ] **Vérifier l'espace disque disponible**
  ```bash
  df -h /root/backups
  ```

- [ ] **Tester la restauration mensuellement**

- [ ] **Mettre à jour la politique de rétention** si nécessaire

---

## 📞 Support et contact

En cas de problème avec les backups :

1. **Vérifier les logs :**
   ```bash
   tail -100 /root/backups/sempa/backup.log
   ```

2. **Vérifier l'espace disque :**
   ```bash
   df -h
   ```

3. **Tester manuellement le script :**
   ```bash
   /root/scripts/backup-sempa.sh --verbose
   ```

4. **Contacter l'hébergeur** si problème de connectivité

---

## 📚 Ressources utiles

- [Documentation MySQL - mysqldump](https://dev.mysql.com/doc/refman/8.0/en/mysqldump.html)
- [AWS S3 - Storage Classes](https://aws.amazon.com/s3/storage-classes/)
- [Cron - Guide complet](https://crontab.guru/)
- [Stratégie 3-2-1](https://www.backblaze.com/blog/the-3-2-1-backup-strategy/)

---

**Dernière mise à jour :** Octobre 2025
**Version :** 2.0.0
**Auteur :** Équipe Dev SEMPA
