export type EventStatus = "Planifié" | "Récurrent" | "À confirmer" | "Bientôt";

export type CommunityEvent = {
  title: string;
  date: string;
  time: string;
  type: string;
  description: string;
  status: EventStatus;
};

export const events: CommunityEvent[] = [
  {
    title: "Fenêtre de raid du vendredi",
    date: "Chaque vendredi",
    time: "19h à 23h GMT-5",
    type: "Raid encadré",
    description: "PvP de base autorisé uniquement si au moins un défenseur est connecté.",
    status: "Récurrent"
  },
  {
    title: "Boss en groupe",
    date: "Samedi communautaire",
    time: "20h",
    type: "PvE commun",
    description: "Organisation de groupes temporaires pour aider les joueurs à progresser.",
    status: "À confirmer"
  },
  {
    title: "Tournoi PvP léger",
    date: "Annonce Discord",
    time: "Soirée",
    type: "PvP",
    description: "Duel ou bracket en arène avec règles annoncées avant le début.",
    status: "Bientôt"
  },
  {
    title: "Soirée capture",
    date: "Mercredi ou jeudi",
    time: "20h30",
    type: "Exploration",
    description: "Sortie commune pour aider les nouveaux joueurs à capturer sans pression.",
    status: "À confirmer"
  },
  {
    title: "Marche communautaire",
    date: "Dimanche",
    time: "18h",
    type: "Commerce",
    description: "Échanges de ressources, services et demandes de recrutement de guildes.",
    status: "Planifié"
  },
  {
    title: "Guerre de guildes organisée",
    date: "Sur inscription",
    time: "Annonce Discord",
    type: "Événement PvP",
    description: "Affrontement temporaire avec objectifs clairs et respect des deux parties.",
    status: "Bientôt"
  },
  {
    title: "Événement saisonnier",
    date: "À venir",
    time: "À venir",
    type: "Saisonnier",
    description: "Objectifs communautaires, récompenses symboliques et moments de serveur.",
    status: "Bientôt"
  }
];
