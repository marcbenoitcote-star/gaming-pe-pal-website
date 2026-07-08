export type MediaAsset = {
  src: string;
  alt: string;
  title: string;
  description: string;
  credit: string;
  sourceNote: string;
  usage: "hero" | "gallery" | "reference";
};

export const logoMedia = {
  src: "/images/gaming-pe-pal-logo.png",
  alt: "Logo Gaming P&E Pal"
};

export const palworldMedia: MediaAsset[] = [
  {
    src: "/images/decor-pals-overlook.jpg",
    alt: "Panorama de Pals sur une falaise avec un chateau flottant au loin",
    title: "Decor panoramique",
    description: "Image decorative principale pour l'accueil.",
    credit: "© Pocketpair, Inc.",
    sourceNote: "Asset fourni par l'administrateur du site, a conserver uniquement si sa provenance officielle ou autorisee est confirmee.",
    usage: "hero"
  },
  {
    src: "/images/decor-boss-battle.jpg",
    alt: "Combat de boss avec plusieurs Pals et un joueur en armure",
    title: "Combat de boss",
    description: "Image decorative pour les evenements, raids et moments communautaires.",
    credit: "© Pocketpair, Inc.",
    sourceNote: "Asset fourni par l'administrateur du site, a conserver uniquement si sa provenance officielle ou autorisee est confirmee.",
    usage: "gallery"
  },
  {
    src: "/images/decor-snow-dragon.jpg",
    alt: "Joueur face a un grand Pal aile dans une zone enneigee",
    title: "Exploration enneigee",
    description: "Image decorative pour les pages serveur et progression.",
    credit: "© Pocketpair, Inc.",
    sourceNote: "Asset fourni par l'administrateur du site, a conserver uniquement si sa provenance officielle ou autorisee est confirmee.",
    usage: "gallery"
  },
  {
    src: "/images/decor-volcano-cavern.jpg",
    alt: "Caverne volcanique orange avec Pals de feu au fond",
    title: "Zone volcanique",
    description: "Image decorative pour les raids et zones dangereuses.",
    credit: "© Pocketpair, Inc.",
    sourceNote: "Asset fourni par l'administrateur du site, a conserver uniquement si sa provenance officielle ou autorisee est confirmee.",
    usage: "gallery"
  },
  {
    src: "/images/decor-flower-pals.jpg",
    alt: "Deux Pals souriants dans un decor fleuri",
    title: "Ambiance communaute",
    description: "Image decorative pour la communaute et les sections Discord.",
    credit: "© Pocketpair, Inc.",
    sourceNote: "Asset fourni par l'administrateur du site, a conserver uniquement si sa provenance officielle ou autorisee est confirmee.",
    usage: "gallery"
  },
  {
    src: "/images/decor-pals-look-down.jpg",
    alt: "Plusieurs Pals vus en contre-plongee sur fond de ciel clair",
    title: "Moment leger",
    description: "Image decorative pour introduire les regles sans ton agressif.",
    credit: "© Pocketpair, Inc.",
    sourceNote: "Asset fourni par l'administrateur du site, a conserver uniquement si sa provenance officielle ou autorisee est confirmee.",
    usage: "gallery"
  },
  {
    src: "/images/decor-faction-lineup.jpg",
    alt: "Portraits de plusieurs personnages de faction Palworld",
    title: "Factions",
    description: "Image decorative pour les evenements organises et defis communautaires.",
    credit: "© Pocketpair, Inc.",
    sourceNote: "Asset fourni par l'administrateur du site, a conserver uniquement si sa provenance officielle ou autorisee est confirmee.",
    usage: "gallery"
  },
  {
    src: "/images/decor-syndicate-orb.jpg",
    alt: "Personnage bleu tenant une sphere lumineuse",
    title: "Mystere",
    description: "Image decorative pour les sections avancees et l'ambiance Palworld.",
    credit: "© Pocketpair, Inc.",
    sourceNote: "Asset fourni par l'administrateur du site, a conserver uniquement si sa provenance officielle ou autorisee est confirmee.",
    usage: "gallery"
  },
  {
    src: "/images/decor-forest-leader.jpg",
    alt: "Personnage aux cheveux verts dans une scene sombre",
    title: "Chef de zone",
    description: "Image decorative pour les defis, boss et progression.",
    credit: "© Pocketpair, Inc.",
    sourceNote: "Asset fourni par l'administrateur du site, a conserver uniquement si sa provenance officielle ou autorisee est confirmee.",
    usage: "gallery"
  },
  {
    src: "/images/decor-cat-grass.jpg",
    alt: "Pal rose dans l'herbe avec montagne en arriere-plan",
    title: "Depart tranquille",
    description: "Image decorative pour les guides debutants et la progression saine.",
    credit: "© Pocketpair, Inc.",
    sourceNote: "Asset fourni par l'administrateur du site, a conserver uniquement si sa provenance officielle ou autorisee est confirmee.",
    usage: "gallery"
  },
  {
    src: "/images/decor-lamball-happy.jpg",
    alt: "Trois Pals laineux courant sur un pont",
    title: "Fair-play",
    description: "Image decorative pour les regles communautaires et l'esprit du serveur.",
    credit: "© Pocketpair, Inc.",
    sourceNote: "Asset fourni par l'administrateur du site, a conserver uniquement si sa provenance officielle ou autorisee est confirmee.",
    usage: "gallery"
  },
  {
    src: "/images/decor-lifmunk-family.jpg",
    alt: "Trois Pals verts souriants dans l'herbe",
    title: "Progression douce",
    description: "Image decorative pour les guides et la communaute.",
    credit: "© Pocketpair, Inc.",
    sourceNote: "Asset fourni par l'administrateur du site, a conserver uniquement si sa provenance officielle ou autorisee est confirmee.",
    usage: "gallery"
  },
  {
    src: "/images/decor-cave-moods.jpg",
    alt: "Deux Pals bleus dans une grotte sombre avec champignons lumineux",
    title: "Exploration de grotte",
    description: "Image decorative pour les regles de prudence et les aventures.",
    credit: "© Pocketpair, Inc.",
    sourceNote: "Asset fourni par l'administrateur du site, a conserver uniquement si sa provenance officielle ou autorisee est confirmee.",
    usage: "gallery"
  },
  {
    src: "/images/decor-forest-ride.jpg",
    alt: "Personnage chevauchant un Pal dans une foret lumineuse",
    title: "Exploration",
    description: "Image decorative pour les sections de progression et d'exploration.",
    credit: "© Pocketpair, Inc.",
    sourceNote: "Asset fourni par l'administrateur du site, a conserver uniquement si sa provenance officielle ou autorisee est confirmee.",
    usage: "gallery"
  },
  {
    src: "/images/decor-lamball-defense.jpg",
    alt: "Pals laineux derriere une ligne defensive",
    title: "Defense",
    description: "Image decorative pour les regles de raid et la defense de base.",
    credit: "© Pocketpair, Inc.",
    sourceNote: "Asset fourni par l'administrateur du site, a conserver uniquement si sa provenance officielle ou autorisee est confirmee.",
    usage: "gallery"
  },
  {
    src: "/images/decor-grizzbolt-cannon.jpg",
    alt: "Pal jaune equipe d'une arme lourde dans un decor montagneux",
    title: "PvP leger",
    description: "Image decorative pour les cartes liees au PvP.",
    credit: "© Pocketpair, Inc.",
    sourceNote: "Asset fourni par l'administrateur du site, a conserver uniquement si sa provenance officielle ou autorisee est confirmee.",
    usage: "gallery"
  },
  {
    src: "/images/decor-raid-tank.jpg",
    alt: "Pal et joueurs sur un vehicule arme dans une zone desertique",
    title: "Raid encadre",
    description: "Image decorative pour les evenements et les raids.",
    credit: "© Pocketpair, Inc.",
    sourceNote: "Asset fourni par l'administrateur du site, a conserver uniquement si sa provenance officielle ou autorisee est confirmee.",
    usage: "gallery"
  },
  {
    src: "/images/decor-lifmunk-aim.jpg",
    alt: "Pal vert tenant une arme pres de ruines",
    title: "Progression",
    description: "Image decorative pour les ressources de progression.",
    credit: "© Pocketpair, Inc.",
    sourceNote: "Asset fourni par l'administrateur du site, a conserver uniquement si sa provenance officielle ou autorisee est confirmee.",
    usage: "gallery"
  },
  {
    src: "/images/decor-lifmunk-table.jpg",
    alt: "Plusieurs Pals verts autour d'une table sombre",
    title: "Preparation",
    description: "Image decorative pour les guides et outils externes.",
    credit: "© Pocketpair, Inc.",
    sourceNote: "Asset fourni par l'administrateur du site, a conserver uniquement si sa provenance officielle ou autorisee est confirmee.",
    usage: "gallery"
  },
  {
    src: "/images/palworld-team-arena.jpg",
    alt: "Capture promotionnelle montrant un personnage accompagne de plusieurs Pals",
    title: "Decor aventure",
    description: "Image decorative creditee, utilisee pour renforcer l'ambiance du site sans remplacer la marque Gaming P&E Pal.",
    credit: "© Pocketpair, Inc.",
    sourceNote: "Asset fourni par l'administrateur du site, a conserver uniquement si sa provenance officielle ou autorisee est confirmee.",
    usage: "gallery"
  },
  {
    src: "/images/palworld-decor-island.jpg",
    alt: "Illustration officielle avec logo Pocketpair et plusieurs Pals dans une prairie",
    title: "Decor ile sauvage",
    description: "Image decorative creditee, utilisee comme ambiance secondaire et non comme logo principal du serveur.",
    credit: "© Pocketpair, Inc.",
    sourceNote: "Asset fourni par l'administrateur du site, a conserver uniquement si sa provenance officielle ou autorisee est confirmee.",
    usage: "gallery"
  },
  {
    src: "/images/palworld-pal-work.jpg",
    alt: "Capture montrant un Pal rose avec une tronconneuse pres d'une base en bois",
    title: "Travail en base",
    description: "Image decorative creditee pour accompagner l'ambiance survie, base et automatisation.",
    credit: "© Pocketpair, Inc.",
    sourceNote: "Asset fourni par l'administrateur du site, a conserver uniquement si sa provenance officielle ou autorisee est confirmee.",
    usage: "gallery"
  },
  {
    src: "/images/official-palworld-wordmark-gold.jpg",
    alt: "Wordmark officiel Palworld dore sur fond noir",
    title: "Wordmark Palworld",
    description: "Asset reference dans les credits uniquement, pas utilise comme logo principal du site.",
    credit: "© Pocketpair, Inc.",
    sourceNote: "Asset fourni par l'administrateur du site, a ne pas utiliser comme branding principal sans autorisation explicite.",
    usage: "reference"
  }
];

const pickMedia = (sources: string[]) =>
  sources
    .map((src) => palworldMedia.find((asset) => asset.src === src))
    .filter((asset): asset is MediaAsset => Boolean(asset));

export const heroMedia = palworldMedia.find((asset) => asset.usage === "hero") ?? palworldMedia[0];
export const decorativeMedia = palworldMedia.filter((asset) => asset.usage === "gallery");

export const featureImages = [
  "/images/decor-boss-battle.jpg",
  "/images/decor-volcano-cavern.jpg",
  "/images/decor-lamball-happy.jpg",
  "/images/decor-cat-grass.jpg",
  "/images/decor-snow-dragon.jpg",
  "/images/decor-lifmunk-family.jpg"
];

export const guideImages = [
  "/images/decor-forest-ride.jpg",
  "/images/decor-lifmunk-table.jpg",
  "/images/decor-cat-grass.jpg",
  "/images/decor-cave-moods.jpg",
  "/images/decor-lifmunk-family.jpg",
  "/images/decor-snow-dragon.jpg"
];

export const homeDecorativeMedia = pickMedia([
  "/images/decor-flower-pals.jpg",
  "/images/decor-lifmunk-family.jpg",
  "/images/decor-pals-look-down.jpg"
]);

export const serverDecorativeMedia = pickMedia([
  "/images/decor-snow-dragon.jpg",
  "/images/decor-volcano-cavern.jpg",
  "/images/decor-syndicate-orb.jpg"
]);

export const rulesDecorativeMedia = pickMedia([
  "/images/decor-pals-look-down.jpg",
  "/images/decor-lamball-happy.jpg",
  "/images/decor-cave-moods.jpg"
]);

export const eventsDecorativeMedia = pickMedia([
  "/images/decor-boss-battle.jpg",
  "/images/decor-faction-lineup.jpg",
  "/images/decor-grizzbolt-cannon.jpg"
]);

export const communityDecorativeMedia = pickMedia([
  "/images/decor-flower-pals.jpg",
  "/images/decor-lifmunk-family.jpg",
  "/images/decor-cat-grass.jpg"
]);

export const communityFeatureImages = [
  "/images/decor-faction-lineup.jpg",
  "/images/decor-syndicate-orb.jpg",
  "/images/decor-flower-pals.jpg",
  "/images/decor-lifmunk-family.jpg",
  "/images/decor-boss-battle.jpg",
  "/images/decor-lamball-happy.jpg"
];
