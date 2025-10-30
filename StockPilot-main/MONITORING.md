# 📊 Guide de Monitoring - SEMPA Stock Pilot

## 📋 Table des matières

1. [Vue d'ensemble](#vue-densemble)
2. [Endpoint healthcheck](#endpoint-healthcheck)
3. [Configuration UptimeRobot](#configuration-uptimerobot)
4. [Configuration Sentry](#configuration-sentry)
5. [Alertes et notifications](#alertes-et-notifications)
6. [Dashboard de monitoring](#dashboard-de-monitoring)
7. [Métriques à surveiller](#métriques-à-surveiller)
8. [Procédure d'incident](#procédure-dincident)

---

## 🎯 Vue d'ensemble

Le monitoring de SEMPA Stock Pilot permet de détecter les problèmes **avant** que les utilisateurs les signalent.

### Objectifs

- ✅ **Disponibilité** : Détecter les pannes dans les 5 minutes
- ✅ **Performance** : Temps de réponse < 200ms
- ✅ **Fiabilité** : Uptime ≥ 99.9% (< 8h de downtime par an)
- ✅ **Alertes** : Notification immédiate en cas de problème

### Architecture de monitoring

```
┌─────────────────────┐
│  SEMPA Application  │
└──────────┬──────────┘
           │
           ├─── /wp-json/sempa/v1/health (Healthcheck)
           │
           ├─── UptimeRobot (Monitoring externe)
           │
           ├─── Sentry (Error tracking)
           │
           └─── Logs serveur (access.log, error.log)
```

---

## 🏥 Endpoint healthcheck

### URL de l'endpoint

```
GET https://sempa.fr/wp-json/sempa/v1/health
```

### Réponse en cas de succès (200 OK)

```json
{
  "status": "healthy",
  "version": "2.0.0",
  "timestamp": "2025-10-30 12:00:00",
  "response_time_ms": 45.23,
  "checks": {
    "database": {
      "status": "healthy",
      "message": "Connexion à la base de données OK",
      "details": {
        "host": "db5001643902.hosting-data.io",
        "database": "dbs1363734",
        "products_count": 150
      },
      "response_time_ms": 12.45
    },
    "files": {
      "status": "healthy",
      "message": "Tous les fichiers critiques sont présents",
      "details": {
        "files_checked": 6,
        "total_size_kb": 245.67
      }
    },
    "disk_space": {
      "status": "healthy",
      "message": "Espace disque OK",
      "details": {
        "free_space_mb": 5432.10,
        "total_space_gb": 50.00,
        "used_percent": 89.14
      }
    },
    "php": {
      "status": "healthy",
      "message": "Environnement PHP OK",
      "details": {
        "php_version": "8.1.0",
        "memory_limit": "256M",
        "max_execution_time": "300s",
        "upload_max_filesize": "64M"
      }
    },
    "integrity": {
      "status": "healthy",
      "message": "Surveillance d'intégrité active",
      "details": {
        "files_monitored": 6,
        "last_check": "2025-10-30 11:00:00",
        "next_check": "2025-10-30 12:00:00"
      }
    }
  },
  "system": {
    "php_version": "8.1.0",
    "wordpress_version": "6.4.0",
    "theme": "Uncode Child",
    "site_url": "https://sempa.fr"
  }
}
```

### Réponse en cas de problème (503 Service Unavailable)

```json
{
  "status": "critical",
  "version": "2.0.0",
  "timestamp": "2025-10-30 12:00:00",
  "response_time_ms": 1234.56,
  "checks": {
    "database": {
      "status": "critical",
      "message": "Connexion à la base de données échouée",
      "error": "Lost connection to MySQL server",
      "response_time_ms": 5000.00
    },
    "files": {
      "status": "critical",
      "message": "2 fichier(s) critique(s) manquant(s)",
      "details": {
        "missing_files": ["functions.php", "includes/functions_stocks.php"]
      }
    }
  }
}
```

### Statuts possibles

| Statut | Code HTTP | Description |
|--------|-----------|-------------|
| `healthy` | 200 | Tous les systèmes opérationnels |
| `degraded` | 200 | Fonctionnel mais avec avertissements |
| `critical` | 503 | Service non disponible ou dégradé |

### Tester l'endpoint manuellement

```bash
# Test simple
curl https://sempa.fr/wp-json/sempa/v1/health

# Test avec formatage JSON
curl -s https://sempa.fr/wp-json/sempa/v1/health | jq '.'

# Vérifier uniquement le statut
curl -s https://sempa.fr/wp-json/sempa/v1/health | jq -r '.status'

# Mesurer le temps de réponse
curl -w "Response time: %{time_total}s\n" -s https://sempa.fr/wp-json/sempa/v1/health -o /dev/null
```

---

## ⏰ Configuration UptimeRobot

UptimeRobot est un service gratuit de monitoring qui vérifie la disponibilité de votre site.

### 1. Créer un compte

1. Aller sur [https://uptimerobot.com/](https://uptimerobot.com/)
2. S'inscrire (gratuit pour jusqu'à 50 monitors)
3. Confirmer l'email

### 2. Ajouter un monitor HTTP(S)

#### Configuration du monitor principal

```
Monitor Type: HTTP(s)
Friendly Name: SEMPA Stock Pilot - Healthcheck
URL: https://sempa.fr/wp-json/sempa/v1/health
Monitoring Interval: 5 minutes (gratuit)
Monitor Timeout: 30 seconds
```

#### Configuration avancée

```
HTTP Method: GET
Post Value: (vide)
Request Headers: (vide)
Custom HTTP Statuses: 200
Keyword Monitoring:
  - Type: Keyword Exists
  - Value: "healthy"
```

### 3. Configurer les alertes

#### Contacts d'alerte

```
Email: admin@sempa.fr
SMS: +33 6 XX XX XX XX (optionnel, payant)
Slack: #sempa-alerts (optionnel)
```

#### Règles d'alerte

```
Alert When:
  ✅ Down
  ✅ Up
  ✅ Started (optional)
  ✅ Paused (optional)

Alert After: 0 minutes (immediate)
Alert Frequency: Every time
```

### 4. Monitors recommandés

Créer plusieurs monitors pour une surveillance complète :

#### Monitor 1 : Healthcheck API
```
URL: https://sempa.fr/wp-json/sempa/v1/health
Keyword: "healthy"
Interval: 5 min
```

#### Monitor 2 : Page principale stocks
```
URL: https://sempa.fr/stocks/
Keyword: "SEMPA Stocks"
Interval: 5 min
```

#### Monitor 3 : Page d'accueil
```
URL: https://sempa.fr/
HTTP Status: 200
Interval: 10 min
```

---

## 🐛 Configuration Sentry

Sentry est une plateforme de tracking d'erreurs en temps réel.

### 1. Créer un compte Sentry

1. Aller sur [https://sentry.io/](https://sentry.io/)
2. S'inscrire (gratuit pour petites équipes)
3. Créer un nouveau projet : "SEMPA Stock Pilot"
4. Choisir la plateforme : **PHP**

### 2. Installer le SDK Sentry pour PHP

```bash
# Via Composer (recommandé)
cd /var/www/html/wp-content/themes/uncode-child
composer require sentry/sdk
```

### 3. Configuration dans WordPress

Créer le fichier `includes/sentry.php` :

```php
<?php
/**
 * Configuration Sentry pour SEMPA Stock Pilot
 */

if (!defined('ABSPATH')) {
    exit;
}

// Charger Sentry si le SDK est installé
if (file_exists(__DIR__ . '/../vendor/autoload.php')) {
    require_once __DIR__ . '/../vendor/autoload.php';

    \Sentry\init([
        'dsn' => 'https://YOUR_DSN_HERE@sentry.io/YOUR_PROJECT_ID',
        'environment' => defined('WP_DEBUG') && WP_DEBUG ? 'development' : 'production',
        'release' => '2.0.0',
        'traces_sample_rate' => 0.1, // 10% des transactions
        'profiles_sample_rate' => 0.1,
        'send_default_pii' => false, // Ne pas envoyer d'infos personnelles
        'before_send' => function (\Sentry\Event $event): ?\Sentry\Event {
            // Filtrer les données sensibles
            if ($event->getRequest()) {
                $request = $event->getRequest();
                $data = $request->getData();

                // Supprimer les mots de passe
                if (isset($data['password'])) {
                    unset($data['password']);
                }

                $request->setData($data);
            }

            return $event;
        },
    ]);

    // Handler d'erreur PHP
    set_error_handler(function ($errno, $errstr, $errfile, $errline) {
        \Sentry\captureMessage("PHP Error: $errstr", \Sentry\Severity::error());
    });

    // Handler d'exceptions
    set_exception_handler(function ($exception) {
        \Sentry\captureException($exception);
    });
}
```

Ajouter dans `functions.php` :

```php
$sentry_file = __DIR__ . '/includes/sentry.php';
if (file_exists($sentry_file)) {
    require_once $sentry_file;
}
```

### 4. Tester Sentry

```php
// Déclencher une erreur de test
throw new Exception('Test Sentry integration');
```

---

## 🔔 Alertes et notifications

### Niveaux d'alerte

| Niveau | Priorité | Délai de réponse | Canaux |
|--------|----------|------------------|--------|
| 🔴 **CRITICAL** | P0 | < 15 min | Email + SMS + Slack |
| 🟠 **WARNING** | P1 | < 1 heure | Email + Slack |
| 🟡 **INFO** | P2 | < 1 jour | Email |

### Configuration des alertes email

#### Template d'email critique

```
Subject: [CRITIQUE] SEMPA Stock Pilot - Service indisponible

Bonjour,

Le système de monitoring a détecté un problème critique sur l'application SEMPA Stock Pilot.

Détails :
- Statut : CRITICAL
- Timestamp : 2025-10-30 12:00:00
- Problème : Connexion à la base de données échouée
- URL : https://sempa.fr/wp-json/sempa/v1/health

Actions immédiates requises :
1. Vérifier la connectivité au serveur de base de données
2. Consulter les logs : /var/log/mysql/error.log
3. Contacter l'hébergeur si nécessaire

Lien healthcheck : https://sempa.fr/wp-json/sempa/v1/health
Dashboard monitoring : https://uptimerobot.com/dashboard

--
Système de monitoring automatique SEMPA
```

### Configuration Slack (optionnel)

1. **Créer un webhook Slack**
   - Aller sur https://api.slack.com/apps
   - Créer une app : "SEMPA Monitoring"
   - Activer "Incoming Webhooks"
   - Copier le webhook URL

2. **Configurer UptimeRobot pour Slack**
   ```
   Alert Contact Type: Webhook
   Friendly Name: Slack #sempa-alerts
   URL: https://hooks.slack.com/services/YOUR/WEBHOOK/URL
   POST Value:
   {
     "text": "*SEMPA Alert*: *monitorFriendlyName* is *alertTypeFriendlyName* - *alertDetails*"
   }
   ```

---

## 📈 Dashboard de monitoring

### Dashboard UptimeRobot (Public)

Créer un dashboard public pour partager le statut :

1. Dans UptimeRobot, aller dans **Status Pages**
2. Créer une nouvelle page
3. Configuration :
   ```
   Page Name: SEMPA Stock Pilot Status
   Custom Domain: status.sempa.fr (optionnel)
   Monitors: Sélectionner tous les monitors SEMPA
   ```
4. Partager l'URL : `https://stats.uptimerobot.com/YOUR_PAGE_ID`

### Dashboard personnalisé (HTML)

Créer une page WordPress simple :

```php
<?php
/**
 * Template Name: Status Dashboard
 */

get_header();

// Récupérer le statut du healthcheck
$response = wp_remote_get(home_url('/wp-json/sempa/v1/health'));
$health = json_decode(wp_remote_retrieve_body($response), true);
$status = $health['status'] ?? 'unknown';
?>

<div class="sempa-status-dashboard">
    <h1>Statut de SEMPA Stock Pilot</h1>

    <div class="status-badge <?php echo esc_attr($status); ?>">
        <?php if ($status === 'healthy'): ?>
            ✅ Tous les systèmes sont opérationnels
        <?php elseif ($status === 'degraded'): ?>
            ⚠️ Performance dégradée
        <?php else: ?>
            🔴 Service indisponible
        <?php endif; ?>
    </div>

    <div class="checks-grid">
        <?php foreach ($health['checks'] ?? [] as $check_name => $check): ?>
            <div class="check-card">
                <h3><?php echo esc_html(ucfirst($check_name)); ?></h3>
                <p class="status <?php echo esc_attr($check['status']); ?>">
                    <?php echo esc_html($check['message']); ?>
                </p>
            </div>
        <?php endforeach; ?>
    </div>

    <p class="last-update">
        Dernière mise à jour : <?php echo esc_html($health['timestamp'] ?? 'N/A'); ?>
    </p>
</div>

<?php get_footer(); ?>
```

---

## 📊 Métriques à surveiller

### 1. Disponibilité (Uptime)

**Objectif :** ≥ 99.9%

```
Uptime % = (Temps total - Temps de panne) / Temps total × 100
```

**SLA (Service Level Agreement) :**

| Uptime | Downtime autorisé |
|--------|-------------------|
| 99.9% | ~8h / an |
| 99.5% | ~43h / an |
| 99.0% | ~87h / an |

### 2. Performance

**Objectif :** Temps de réponse < 200ms

Surveiller :
- ✅ Temps de réponse API healthcheck
- ✅ Temps de chargement page stocks
- ✅ Temps de requête base de données

### 3. Erreurs

**Objectif :** Taux d'erreur < 0.1%

Surveiller :
- ✅ Erreurs HTTP 5xx (serveur)
- ✅ Erreurs HTTP 4xx (client)
- ✅ Erreurs PHP (via Sentry)
- ✅ Erreurs JavaScript

### 4. Base de données

Surveiller :
- ✅ Connexions actives
- ✅ Requêtes lentes (> 1s)
- ✅ Taille de la base de données
- ✅ Espace disque disponible

---

## 🚨 Procédure d'incident

### 1. Détection (< 5 min)

```
✅ Alerte reçue (Email/SMS/Slack)
✅ Vérifier le dashboard UptimeRobot
✅ Consulter l'endpoint healthcheck
```

### 2. Investigation (< 15 min)

```bash
# Vérifier le statut de l'application
curl https://sempa.fr/wp-json/sempa/v1/health | jq '.'

# Vérifier les logs PHP
tail -100 /var/log/php/error.log

# Vérifier les logs serveur web
tail -100 /var/log/nginx/error.log  # ou Apache

# Vérifier la connectivité base de données
mysql -h db5001643902.hosting-data.io -u dbu1662343 -p14Juillet@ -e "SHOW STATUS"

# Vérifier l'espace disque
df -h

# Vérifier les processus
top -n 1
```

### 3. Résolution

| Problème | Solution |
|----------|----------|
| Base de données inaccessible | Redémarrer MySQL : `systemctl restart mysql` |
| Fichiers corrompus | Restaurer depuis backup |
| Espace disque plein | Nettoyer les logs : `find /var/log -name "*.log" -mtime +30 -delete` |
| Mémoire PHP saturée | Augmenter `memory_limit` dans `php.ini` |

### 4. Communication

**Template de message d'incident :**

```
📢 INCIDENT EN COURS

Début : 30/10/2025 12:00
Statut : En investigation
Cause : Connexion base de données perdue
Impact : Service indisponible

Actions en cours :
- Investigation de la cause racine
- Contact hébergeur en cours
- ETA : 30 minutes

Mise à jour suivante : 12:30
```

### 5. Post-mortem

Après chaque incident, documenter :

```markdown
# Post-mortem incident #2025-10-30

## Résumé
- Date : 30/10/2025 12:00-13:30
- Durée : 1h30
- Impact : Service totalement indisponible

## Chronologie
- 12:00 : Alerte UptimeRobot
- 12:05 : Investigation démarrée
- 12:15 : Cause identifiée (connexion DB perdue)
- 12:45 : Solution appliquée (redémarrage MySQL)
- 13:00 : Service restauré
- 13:30 : Vérification complète

## Cause racine
Saturation des connexions MySQL (max_connections atteint)

## Actions correctives
- [ ] Augmenter max_connections de 100 à 200
- [ ] Implémenter pool de connexions
- [ ] Ajouter monitoring connexions actives
- [ ] Documenter la procédure

## Leçons apprises
- Temps de détection : excellent (< 5min)
- Temps de résolution : acceptable (1h30)
- Communication : à améliorer
```

---

## ✅ Checklist de mise en production

Avant de mettre en production, vérifier :

- [ ] **Endpoint healthcheck accessible** : `curl https://sempa.fr/wp-json/sempa/v1/health`
- [ ] **UptimeRobot configuré** (monitors + alertes)
- [ ] **Sentry configuré** (tracking d'erreurs)
- [ ] **Alertes email testées**
- [ ] **Alertes SMS testées** (optionnel)
- [ ] **Dashboard public créé**
- [ ] **Procédure d'incident documentée**
- [ ] **Contacts d'astreinte définis**
- [ ] **Backups automatiques vérifiés**
- [ ] **Tests de charge effectués**

---

## 📞 Contacts et support

### Équipe technique

- **Développeur principal** : dev@sempa.fr
- **Administrateur système** : sysadmin@sempa.fr
- **Hébergeur** : support@hosting-provider.com

### Services externes

- **UptimeRobot** : https://uptimerobot.com/support
- **Sentry** : https://sentry.io/support
- **Hébergeur** : [Lien du support]

---

## 📚 Ressources utiles

- [UptimeRobot Documentation](https://uptimerobot.com/api/)
- [Sentry PHP Documentation](https://docs.sentry.io/platforms/php/)
- [Healthcheck Best Practices](https://microservices.io/patterns/observability/health-check-api.html)
- [SLA Calculator](https://uptime.is/)

---

**Dernière mise à jour :** Octobre 2025
**Version :** 2.0.0
**Auteur :** Équipe Dev SEMPA
