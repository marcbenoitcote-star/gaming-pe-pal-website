export type SupportPackId = "basic" | "intermediate" | "deluxe";

export type SupportPack = {
  id: SupportPackId;
  name: string;
  shortName: string;
  price: number;
  description: string;
  featured?: boolean;
  items: string[];
};

export const supportPacks: SupportPack[] = [
  {
    id: "basic",
    name: "Pack de Soutien Basique",
    shortName: "Basique",
    price: 10,
    description: "Un coup de pouce simple pour soutenir l'infrastructure communautaire.",
    items: [
      "10x Ultimate Sphere",
      "1x Memory Wiping Medicine",
      "2x Vital Remedy",
      "2x Stamina Remedy",
      "2x Might Remedy",
      "2x Speed Remedy",
      "2x Burden Remedy"
    ]
  },
  {
    id: "intermediate",
    name: "Pack de Soutien Intermédiaire",
    shortName: "Intermédiaire",
    price: 20,
    description: "Un ensemble plus complet pour participer à la durée de vie du serveur.",
    items: [
      "20x Ultimate Sphere",
      "2x Memory Wiping Medicine",
      "3x Vital Remedy",
      "3x Stamina Remedy",
      "3x Might Remedy",
      "3x Speed Remedy",
      "3x Burden Remedy",
      "2x Ripe Awakening Starfruit"
    ]
  },
  {
    id: "deluxe",
    name: "Pack de Soutien Deluxe",
    shortName: "Deluxe",
    price: 40,
    description: "Le soutien le plus important, avec un contenu avancé entièrement obtenable en jeu.",
    featured: true,
    items: [
      "20x Exotic Sphere",
      "3x Memory Wiping Medicine",
      "5x Vital Remedy",
      "5x Stamina Remedy",
      "5x Might Remedy",
      "5x Speed Remedy",
      "5x Burden Remedy",
      "5x Ripe Awakening Starfruit",
      "2x Kit complet de Applied Technique I"
    ]
  }
];

export const supportItemExplanations = [
  {
    name: "Ultimate Sphere / Exotic Sphere",
    description: "Sphères avancées qui donnent un meilleur pourcentage de capture."
  },
  {
    name: "Remedy Items",
    description: "Objets qui augmentent une statistique du personnage de façon permanente."
  },
  {
    name: "Memory Wiping Medicine",
    description: "Potion permettant de réinitialiser les points de statistiques du personnage."
  },
  {
    name: "Ripe Awakening Starfruit",
    description: "Objet qui augmente le rang d'un Pal d'un cran."
  },
  {
    name: "Kit complet de Applied Technique I",
    description:
      "Kit qui augmente d'un cran le rang d'une affinité déjà possédée par un Pal, jusqu'à la limite maximale permise par le jeu."
  }
];

export const supportTransparency = [
  "Les packs servent à soutenir les coûts du serveur, du site web, des outils communautaires et de la gestion administrative.",
  "Le serveur est prévu pour une durée minimale de 3 mois.",
  "Si le soutien est suffisant, le serveur pourra être prolongé.",
  "Si les contributions sont trop faibles, le serveur pourrait ne pas être renouvelé après cette période.",
  "Tous les objets sont trouvables, lootables ou obtenables en jeu.",
  "Aucun pack ne donne un objet exclusif impossible à obtenir autrement.",
  "Aucun pack ne donne une immunité aux règles, un pouvoir administratif ou un traitement spécial."
];
