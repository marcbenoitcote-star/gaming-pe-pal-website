# Activer le statut en direct du serveur Palworld

Le site affiche maintenant :

- serveur en ligne, hors ligne ou en attente de configuration ;
- joueurs connectes et capacite maximale ;
- temps en ligne ;
- FPS du serveur ;
- jour du monde ;
- heure de la derniere mesure.

Le site ne collecte ni noms de joueurs, ni Steam ID, ni adresse IP, ni position en jeu.

## Architecture securisee

Le port REST de Palworld ne doit pas etre expose sur Internet. L'agent
`scripts/palworld-status-reporter.ps1` doit fonctionner sur la meme machine que le serveur et interroger
`127.0.0.1`. Il envoie seulement les valeurs publiques au Worker Cloudflare.

## 1. Activer l'API REST Palworld

Dans `PalWorldSettings.ini`, configure :

```ini
RESTAPIEnabled=True
RESTAPIPort=8212
```

Redemarre ensuite le serveur. Laisse le port `8212` bloque dans le pare-feu public. L'agent y accede localement.

## 2. Configurer les secrets sur la machine du serveur

Ouvre PowerShell en tant qu'administrateur et ajoute les variables systeme :

```powershell
[Environment]::SetEnvironmentVariable("PALWORLD_ADMIN_PASSWORD", "MOT_DE_PASSE_ADMIN", "Machine")
[Environment]::SetEnvironmentVariable("STATUS_UPDATE_TOKEN", "JETON_CLOUDFLARE", "Machine")
[Environment]::SetEnvironmentVariable("PALWORLD_REST_URL", "http://127.0.0.1:8212/v1/api", "Machine")
```

Le jeton deja cree pour Cloudflare se trouve dans le fichier local `.dev.vars`, qui est ignore par Git. Copie
uniquement sa valeur sur la machine du serveur.

Ferme puis rouvre PowerShell. Ne publie jamais ces deux secrets dans GitHub, Discord ou une capture d'ecran.

## 3. Faire un essai unique

Depuis le dossier du site :

```powershell
.\scripts\palworld-status-reporter.ps1 -Once
```

Le script doit afficher `Statut envoye: EN LIGNE`. Recharge ensuite
`https://gaming-pe-pal.com` et verifie les valeurs.

## 4. Lancer l'agent automatiquement

Une fois l'essai valide, cree une tache Windows qui demarre au lancement de la machine :

```powershell
$script = "G:\Projet\Gaming P&E Pal Website\scripts\palworld-status-reporter.ps1"
$action = New-ScheduledTaskAction -Execute "powershell.exe" -Argument "-NoProfile -ExecutionPolicy Bypass -File `"$script`""
$trigger = New-ScheduledTaskTrigger -AtStartup
$settings = New-ScheduledTaskSettingsSet -RestartCount 5 -RestartInterval (New-TimeSpan -Minutes 1)
Register-ScheduledTask -TaskName "Gaming PE Pal - Statut serveur" -Action $action -Trigger $trigger -Settings $settings -RunLevel Highest
```

Si le serveur Palworld est heberge chez un fournisseur, copie seulement le script sur cette machine et adapte son
chemin dans la tache. Le jeton Cloudflare est independant du mot de passe administrateur Palworld.

## Diagnostic rapide

- `401 Non autorise` : le `STATUS_UPDATE_TOKEN` local ne correspond pas au secret Cloudflare.
- API Palworld indisponible : verifie `RESTAPIEnabled`, le port, le mot de passe et le redemarrage du serveur.
- Le site passe hors ligne apres environ deux minutes sans signal : c'est volontaire.
- Des tirets sont affiches : aucune mesure complete n'a encore ete recue.

Documentation officielle Palworld :

- <https://docs.palworldgame.com/api/rest-api/palwold-rest-api/>
- <https://docs.palworldgame.com/api/rest-api/info/>
- <https://docs.palworldgame.com/api/rest-api/metrics/>
