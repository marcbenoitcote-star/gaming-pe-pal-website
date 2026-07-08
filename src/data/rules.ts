export type RuleSeverity = "info" | "warning" | "danger";

export type RuleBlock = {
  heading?: string;
  intro?: string;
  items?: string[];
  note?: string;
};

export type RuleSectionData = {
  id: string;
  navLabel: string;
  title: string;
  severity: RuleSeverity;
  description?: string;
  blocks: RuleBlock[];
};

export const rulesIntro =
  "Bienvenue sur Gaming P&E Pal. Le but est d'avoir un PvP actif, amusant et compétitif, sans transformer le serveur en environnement toxique ou injouable. Le PvP est permis, mais le grief, les abus et les raids destructeurs ne le sont pas.";

export const spiritNotice =
  "Le règlement protège le plaisir de jeu. Si une action respecte techniquement une phrase mais détruit l'esprit du serveur, elle peut quand même être sanctionnée.";

export const ruleSections: RuleSectionData[] = [
  {
    id: "format-guildes",
    navLabel: "Format des guildes",
    title: "Format des guildes",
    severity: "info",
    blocks: [
      {
        items: [
          "Les guildes sont limitées à 3 joueurs maximum.",
          "Une guilde peut posséder un maximum de 2 bases principales.",
          "Les alliances permanentes entre guildes sont interdites.",
          "Les alliances temporaires pour un événement ou un boss sont permises, mais elles ne doivent pas servir à écraser le serveur en méga-guilde.",
          "Quitter une guilde pour contourner les règles, espionner, rejoindre une autre guilde en boucle ou éviter une sanction est interdit."
        ]
      }
    ]
  },
  {
    id: "pvp-general",
    navLabel: "PvP général",
    title: "PvP général",
    severity: "warning",
    blocks: [
      {
        items: [
          "Le PvP sauvage est autorisé dans le monde ouvert.",
          "Le spawn kill est interdit.",
          "Le harcèlement PvP est interdit.",
          "Tuer un joueur pendant une rencontre est du PvP.",
          "Traquer un joueur sans arrêt pendant 30 à 60 minutes pour l'empêcher de jouer est du grief.",
          "Il est interdit de poursuivre un joueur débutant uniquement pour bloquer sa progression.",
          "Il est interdit d'utiliser le fast travel, la téléportation, la déconnexion ou tout autre moyen similaire pour fuir un combat déjà engagé."
        ]
      }
    ]
  },
  {
    id: "raids-base",
    navLabel: "Raids de base",
    title: "Raids de base",
    severity: "danger",
    blocks: [
      {
        items: [
          "Les raids de base sont autorisés uniquement pendant les fenêtres de raid annoncées.",
          "Fuseau horaire : GMT-5.",
          "Vendredi : 19h à 23h.",
          "Samedi : 19h à 23h.",
          "Dimanche : 19h à 22h.",
          "Aucun raid offline n'est permis.",
          "Une base peut être attaquée seulement si au moins 1 membre de la guilde défenseuse est connecté.",
          "Il est interdit de raser complètement une base.",
          "Le but d'un raid est de créer un affrontement, voler une partie des ressources ou gagner un objectif PvP, pas d'effacer plusieurs jours de progression.",
          "Il est interdit de détruire inutilement les structures sans objectif clair.",
          "Il est interdit de camper une base après un raid terminé."
        ]
      }
    ]
  },
  {
    id: "loot-mort",
    navLabel: "Loot et mort",
    title: "Loot et mort",
    severity: "warning",
    blocks: [
      {
        items: [
          "La perte à la mort est limitée aux items selon la configuration du serveur.",
          "Il est interdit de voler ou transférer les Pals d'un joueur via une faille, un bug ou une mécanique non prévue.",
          "Les drops de mort ne doivent pas être utilisés pour humilier, bloquer ou harceler un joueur."
        ]
      }
    ]
  },
  {
    id: "construction-territoire",
    navLabel: "Construction et territoire",
    title: "Construction et territoire",
    severity: "warning",
    blocks: [
      {
        intro: "Il est interdit de construire :",
        items: [
          "Sur les spawns de joueurs",
          "Sur les points de fast travel",
          "Dans les sanctuaires",
          "Dans les entrées de donjon",
          "Sur les boss importants",
          "Sur les zones de ressources rares dans le but de les bloquer",
          "Trop près d'une base appartenant à une autre guilde"
        ]
      },
      {
        items: [
          "Les bases doivent laisser un accès raisonnable aux routes, ressources, donjons, boss et points d'intérêt.",
          "Les constructions abusives qui font lag le serveur peuvent être supprimées par les admins.",
          "Les bases mesh, cachées dans des endroits exploit, ou impossibles à attaquer normalement sont interdites."
        ]
      }
    ]
  },
  {
    id: "restrictions-pvp",
    navLabel: "Restrictions PvP",
    title: "Restrictions PvP",
    severity: "danger",
    blocks: [
      {
        intro: "Interdits en PvP et en raid, sauf événement spécial annoncé :",
        items: [
          "Exploits",
          "Bugs de duplication",
          "Mesh base",
          "Troisième logiciel donnant un avantage",
          "Pals ou items importés illégalement",
          "Pals moddées",
          "Capture abusive de marchands ou PNJ importants",
          "Toute méthode visant à contourner les règles du serveur"
        ]
      },
      {
        heading: "Restrictions recommandées pour l'équilibre",
        items: [
          "Pas d'import Global Palbox",
          "Pas de Rocket Launcher en raid léger",
          "Pas de Jetragon en raid léger",
          "Pas de Tower Boss Pal ou Pal obtenu par bug",
          "Pas de technologie ou Pal Gear explicitement banni par les admins"
        ]
      }
    ]
  },
  {
    id: "commerce-ententes",
    navLabel: "Commerce et ententes",
    title: "Commerce et ententes",
    severity: "info",
    blocks: [
      {
        items: [
          "Le commerce entre joueurs est autorisé.",
          "Les arnaques RP légères peuvent être tolérées si elles restent amusantes.",
          "Les scams destructeurs, abusifs ou faits pour vider un joueur ou une guilde de toute sa progression peuvent être sanctionnés.",
          "Toute entente de duel, tournoi ou guerre organisée doit être respectée par les deux parties."
        ]
      }
    ]
  },
  {
    id: "comportement-discord",
    navLabel: "Comportement et Discord",
    title: "Comportement et Discord",
    severity: "danger",
    blocks: [
      {
        items: [
          "Respect obligatoire dans le chat et sur Discord.",
          "Insultes personnelles, menaces, doxing, harcèlement, stalking, noms offensants ou comportements discriminatoires sont interdits.",
          "Les blagues et provocations PvP sont permises tant qu'elles restent dans l'esprit du jeu.",
          "En cas de problème, ouvrir un ticket avec preuves : capture d'écran, vidéo, heure approximative et noms des joueurs/guildes impliqués."
        ]
      }
    ]
  },
  {
    id: "sanctions",
    navLabel: "Sanctions",
    title: "Sanctions",
    severity: "danger",
    blocks: [
      {
        intro: "Les admins peuvent appliquer :",
        items: [
          "Avertissement",
          "Suppression de construction abusive",
          "Confiscation d'items/Pals obtenus illégalement",
          "Kick temporaire",
          "Ban temporaire",
          "Ban permanent"
        ]
      },
      {
        note:
          "Les exploits, cheats, duplication, logiciels tiers ou abus graves peuvent mener à un ban immédiat sans avertissement. La règle principale : ne cherchez pas une faille dans le texte. Si l'action va contre l'esprit du serveur, elle peut être sanctionnée."
      }
    ]
  }
];
