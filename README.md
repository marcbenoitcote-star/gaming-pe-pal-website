# Gaming P&E Pal Website

Site communautaire non officiel pour le serveur privé Palworld **Gaming P&E Pal**.

Le site est en français, statique, responsive et prêt pour Vercel, Netlify ou un hébergement compatible Next.js.

## Installation

```bash
npm install
```

## Lancer en local

```bash
npm run dev
```

Le site sera disponible sur l'URL affichée par Next.js, généralement `http://localhost:3000`.

## Build de production

```bash
npm run build
```

Le build genere un export statique dans `out/`, pret pour Cloudflare Pages.

## Deploiement Cloudflare Pages

Parametres recommandes :

- Build command : `npm run build`
- Build output directory : `out`
- Node.js version : `22`
- Variable production : `NEXT_PUBLIC_SITE_URL=https://ton-domaine.com`

Guide complet : `DEPLOY_CLOUDFLARE.md`.

## Où modifier les données

Les contenus importants sont dans `src/data` :

- `src/data/serverConfig.ts` : nom du serveur, lien Discord, population, guildes, bases, workers, rates, gameplay et fenêtres de raid.
- `src/data/rules.ts` : toutes les règles structurées par catégories.
- `src/data/guides.ts` : liens externes utiles pour guides, bases de données, breeding calculator et carte interactive.
- `src/data/events.ts` : événements mockés et futures données de calendrier.
- `src/data/faq.ts` : questions/réponses.
- `src/data/roadmap.ts` : fonctionnalités prévues.

## Changer le lien Discord

Modifie `discordInvite` dans `src/data/serverConfig.ts`.

```ts
export const discordInvite = "https://discord.gg/uzaZUxTKhs";
```

Le header, les CTA, les événements et les pages communautaires utilisent cette valeur.

## Modifier les règles

Va dans `src/data/rules.ts`.

Chaque section possède :

- `id` : ancre de navigation.
- `navLabel` : texte du sommaire.
- `title` : titre affiché.
- `severity` : `info`, `warning` ou `danger`.
- `blocks` : listes, notes et introductions.

## Ajouter des guides

Ajoute une entrée dans `src/data/guides.ts` :

```ts
{
  title: "Nouvelle ressource",
  description: "Ce que le joueur trouvera sur le site.",
  category: "Outil",
  href: "https://exemple.com",
  source: "Nom du site",
  imageSrc: guideImages[0]
}
```

## Ajouter des événements

Ajoute une entrée dans `src/data/events.ts` :

```ts
{
  title: "Nouvel événement",
  date: "Annonce Discord",
  time: "20h",
  type: "Communauté",
  description: "Description courte.",
  status: "À confirmer"
}
```

## Gérer les images légalement

Ne pas utiliser :

- Logo officiel Palworld sans permission.
- Assets extraits du jeu.
- Fan arts sans autorisation.
- Images volées ou non créditées.

Images recommandées :

- Captures personnelles du serveur si elles respectent les permissions.
- Images créées par la communauté avec accord explicite.
- Assets officiels ou press kit Palworld uniquement si leur usage fan site est autorisé.
- Images libres de droits depuis Unsplash, Pexels ou équivalent.
- Images générées originales qui ne copient pas le style officiel ni des personnages précis.

Chaque image ajoutée doit être listée dans `public/assets/CREDITS.md` avec sa source, son auteur si disponible, sa licence et son usage.

Les images décoratives présentes dans `public/images` sont créditées à Pocketpair, Inc. et ne doivent pas servir de logo principal du serveur ni donner l'impression que le site est officiel.

## Mention légale

Gaming P&E Pal est une communauté non officielle de joueurs. Palworld et ses éléments associés appartiennent à Pocketpair, Inc. Ce site n'est pas affilié, approuvé ou sponsorisé par Pocketpair.

## Structure

```text
src/
  app/
    page.tsx
    serveur/page.tsx
    regles/page.tsx
    guides/page.tsx
    evenements/page.tsx
    communaute/page.tsx
    faq/page.tsx
    contact/page.tsx
    roadmap/page.tsx
    credits/page.tsx
  components/
  data/
  lib/
public/
  assets/CREDITS.md
  images/
```
