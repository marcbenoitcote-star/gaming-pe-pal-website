# Deployer Gaming P&E Pal sur Cloudflare Pages

Le site est prepare pour Cloudflare Pages en export statique Next.js. Le build genere le dossier `out/`.

## Option 1 - Cloudflare Pages avec GitHub

1. Pousse le projet sur GitHub.
2. Dans Cloudflare, va dans `Workers & Pages` puis `Create application` puis `Pages`.
3. Connecte le depot GitHub du site.
4. Utilise ces parametres de build :
   - Framework preset : `None` ou `Next.js`
   - Build command : `npm run build`
   - Build output directory : `out`
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

La commande publie le dossier `out/` sur le projet Cloudflare Pages `gaming-pe-pal`.

## Domaine personnalise

Dans Cloudflare Pages, ouvre le projet puis va dans `Custom domains` pour ajouter ton domaine ou sous-domaine, par exemple :

```text
gamingpepal.com
pal.gamingpepal.com
```

## Verification avant publication

```bash
npm run build
```

Le build doit finir sans erreur et afficher que les pages statiques ont ete generees. Les fichiers a publier se trouvent ensuite dans `out/`.
