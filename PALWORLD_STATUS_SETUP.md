# Activer le statut en direct du serveur Palworld

Le site affiche maintenant :

- serveur en ligne, hors ligne ou en attente de configuration ;
- adresse de connexion joueur ;
- joueurs connectes et capacite maximale ;
- temps en ligne, FPS et jour du monde quand la source les fournit ;
- heure de la derniere mesure.

Le site ne collecte ni noms de joueurs, ni Steam ID, ni adresse IP de joueur, ni position en jeu.

## Configuration actuelle

- Adresse joueur affichee sur le site : `174.138.184.118:27049`
- API REST Palworld : `http://174.138.184.118:27051/v1/api`
- Hote RCON : `174.138.184.118`
- Port RCON : `27050`
- Joueurs maximum affiches : `24`

Ces valeurs non secretes sont dans `wrangler.toml` et `src/data/serverConfig.ts`.

## Option recommandee avec Game Host Bros : REST puis RCON

Le Worker Cloudflare a une tache planifiee qui peut interroger le serveur toutes les minutes.

1. Il tente d'abord l'API REST sur `27051`, qui peut fournir joueurs, FPS, uptime, jour du monde et bases.
2. Si REST echoue, il tente RCON sur `27050`, qui permet au minimum de lire `Info` et `ShowPlayers`.

Il n'y a pas de mot de passe RCON separe dans `PalWorldSettings.ini`. Le champ a utiliser est `AdminPassword`.
Ajoute sa valeur comme secret Cloudflare. Ne le mets jamais dans GitHub, Discord ou une capture d'ecran.

Depuis le dossier du site :

```powershell
cd "G:\Projet\Gaming P&E Pal Website"
node .\node_modules\wrangler\bin\wrangler.js secret put PALWORLD_ADMIN_PASSWORD
```

Colle le mot de passe quand Wrangler le demande, puis appuie sur Entree. Rien ne s'affiche pendant la frappe ou le
collage du mot de passe : c'est normal.

Le mot de passe ne doit pas etre ecrit dans la commande. La commande contient seulement le nom du secret
`PALWORLD_ADMIN_PASSWORD`.

Apres l'ajout du secret, attends une a deux minutes et verifie :

```powershell
Invoke-RestMethod https://gaming-pe-pal.com/api/server-status
```

Si REST ou RCON repond, `status` passera a `online` et `currentPlayers` affichera le nombre de joueurs connectes. Si le
serveur ne repond pas, le site passera a `offline`.

## Option alternative : agent REST local

Si tu as un acces direct a la machine qui lance Palworld, tu peux aussi utiliser
`scripts/palworld-status-reporter.ps1`. Cette option donne plus de metriques, car l'API REST Palworld fournit FPS,
uptime, jour du monde et bases.

Dans `PalWorldSettings.ini` :

```ini
RESTAPIEnabled=True
RESTAPIPort=8212
```

Garde le port `8212` bloque publiquement. L'agent doit y acceder localement.

Variables systeme Windows :

```powershell
[Environment]::SetEnvironmentVariable("PALWORLD_ADMIN_PASSWORD", "MOT_DE_PASSE_ADMIN", "Machine")
[Environment]::SetEnvironmentVariable("STATUS_UPDATE_TOKEN", "JETON_CLOUDFLARE", "Machine")
[Environment]::SetEnvironmentVariable("PALWORLD_REST_URL", "http://127.0.0.1:8212/v1/api", "Machine")
```

Le jeton `STATUS_UPDATE_TOKEN` deja cree pour Cloudflare se trouve dans `.dev.vars`, ignore par Git. Copie seulement
sa valeur sur la machine du serveur.

Essai unique :

```powershell
.\scripts\palworld-status-reporter.ps1 -Once
```

## Diagnostic rapide

- Le site reste en preparation : le secret `PALWORLD_ADMIN_PASSWORD` n'est pas encore configure ou la tache n'a pas
  encore tourne.
- Le site passe hors ligne : REST/RCON ne repondent pas, le mot de passe est incorrect, ou les ports `27051`/`27050`
  ne sont pas joignables.
- Les joueurs affichent `0 / 24` : le serveur repond, mais aucun joueur n'est connecte.
- Les FPS, uptime et jour du monde affichent des tirets : REST ne repond pas et le Worker a du utiliser RCON.

Documentation utile :

- <https://docs.palworldgame.com/api/rcon/>
- <https://docs.palworldgame.com/api/rest-api/palwold-rest-api/>
- <https://docs.palworldgame.com/api/rest-api/metrics/>
