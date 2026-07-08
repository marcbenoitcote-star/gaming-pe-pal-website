import { guideImages } from "@/data/media";

export type GuideResource = {
  title: string;
  description: string;
  category: string;
  href: string;
  source: string;
  imageSrc: string;
};

export const guides: GuideResource[] = [
  {
    title: "Guides généraux et progression",
    description: "Walkthrough, début de partie, listes utiles, astuces, boss, progression et explications de mécaniques.",
    category: "Guide complet",
    href: "https://game8.co/games/Palworld",
    source: "Game8",
    imageSrc: guideImages[0]
  },
  {
    title: "Pals, items, technologies et outils",
    description: "Base de données pour consulter les Pals, items, armes, structures, technologies, cartes et outils pratiques.",
    category: "Base de données",
    href: "https://palworld.gg/",
    source: "Palworld.gg",
    imageSrc: guideImages[1]
  },
  {
    title: "Calculateur de breeding",
    description: "Outil pour tester les combinaisons de parents, chercher un enfant précis et préparer des lignées utiles.",
    category: "Breeding",
    href: "https://palworld.gg/breeding-calculator",
    source: "Palworld.gg",
    imageSrc: guideImages[2]
  },
  {
    title: "Carte interactive",
    description: "Carte pratique pour repérer ressources, points d'intérêt, boss, donjons et lieux importants.",
    category: "Carte",
    href: "https://mapgenie.io/palworld",
    source: "MapGenie",
    imageSrc: guideImages[3]
  },
  {
    title: "Wiki communautaire",
    description: "Référence communautaire pour vérifier les mécaniques, les Pals, les objets et les informations générales.",
    category: "Wiki",
    href: "https://palworld.wiki.gg/",
    source: "Wiki.gg",
    imageSrc: guideImages[4]
  },
  {
    title: "Données avancées et chemins de breeding",
    description: "Recherche plus technique pour comparer les données, consulter les tables et calculer des chemins de breeding.",
    category: "Données avancées",
    href: "https://paldb.cc/en/",
    source: "PalDB",
    imageSrc: guideImages[5]
  }
];
