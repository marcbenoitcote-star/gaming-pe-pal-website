# Deployer Gaming P&E Pal sur Cloudflare Workers

Le site est prepare pour Cloudflare Workers Static Assets en export statique Next.js. Le build genere le dossier `out/`.

## Option 1 - Cloudflare Workers avec GitHub

1. Pousse le projet sur GitHub.
2. Dans Cloudflare, va dans `Workers & Pages`, puis importe le depot GitHub.
3. Connecte le depot GitHub du site.
4. Utilise ces parametres de build :
   - Build command : `npm run build`
   - Deploy command : `npx wrangler deploy`
   - Root directory : vide
   - Node.js version : `22`
5. Ajoute cette variable d'environnement en production :
   - `NEXT_PUBLIC_SITE_URL=https://ton-domaine.com`
6. Lance le deploy.

## Option 2 - Upload direct avec Wrangler

Depuis le dossier du projet :

```bash
npm install
npm run build
npx wrangler login
npm run deploy:cloudflare
```

La commande publie le dossier `out/` sur le Worker `gaming-pe-pal-website`.

## Domaine personnalise

Dans Cloudflare, ouvre le Worker puis va dans `Settings`, `Domains & Routes` pour ajouter ton domaine ou sous-domaine, par exemple :

```text
gamingpepal.com
pal.gamingpepal.com
```

## Verification avant publication

```bash
npm run build
```

Le build doit finir sans erreur et afficher que les pages statiques ont ete generees. Les fichiers a publier se trouvent ensuite dans `out/`.
