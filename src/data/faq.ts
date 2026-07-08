export type FAQItem = {
  question: string;
  answer: string;
};

export const faq: FAQItem[] = [
  {
    question: "Est-ce que le serveur est PvP ?",
    answer: "Oui. Le PvP sauvage est autorisé, mais le serveur reste orienté PvP léger : les abus, le harcèlement et le grief sont interdits."
  },
  {
    question: "Est-ce que les raids sont permis ?",
    answer: "Oui, seulement pendant les fenêtres annoncées : vendredi 19h-23h, samedi 19h-23h et dimanche 19h-22h, fuseau GMT-5."
  },
  {
    question: "Est-ce que les raids offline sont permis ?",
    answer: "Non. Une base peut être attaquée seulement si au moins un membre de la guilde défenseuse est connecté."
  },
  {
    question: "Combien de joueurs par guilde ?",
    answer: "Les guildes sont limitées à 3 joueurs maximum pour éviter les méga-guildes et garder le serveur lisible."
  },
  {
    question: "Combien de bases par guilde ?",
    answer: "Chaque guilde peut posséder au maximum 2 bases principales."
  },
  {
    question: "Est-ce que je perds mes Pals à la mort ?",
    answer: "Non. La perte à la mort est limitée aux items selon la configuration du serveur. Les Pals ne doivent pas être volés via faille ou bug."
  },
  {
    question: "Est-ce que les débutants sont protégés ?",
    answer: "Oui dans l'esprit des règles. Il est interdit de poursuivre un joueur débutant uniquement pour bloquer sa progression."
  },
  {
    question: "Est-ce que les alliances sont permises ?",
    answer: "Les alliances temporaires pour un événement ou un boss sont permises. Les alliances permanentes entre guildes sont interdites."
  },
  {
    question: "Est-ce que le Discord est obligatoire ?",
    answer: "Le Discord est le centre des annonces, tickets, votes et événements. Il est fortement requis pour suivre la vie du serveur."
  },
  {
    question: "Comment signaler un abus ?",
    answer: "Ouvre un ticket Discord avec capture d'écran ou vidéo, heure approximative, nom du joueur et guilde impliquée."
  },
  {
    question: "Est-ce que le serveur est officiel ?",
    answer: "Non. Gaming P&E Pal est une communauté non officielle de joueurs et n'est pas affiliée à Pocketpair."
  },
  {
    question: "Puis-je inviter des amis ?",
    answer: "Oui, tant que la population serveur le permet et que les règles de guilde, Discord et comportement sont respectées."
  }
];
