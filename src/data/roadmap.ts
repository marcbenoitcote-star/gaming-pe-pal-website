export type RoadmapStatus = "Prepare" | "Explore" | "Plus tard";

export type RoadmapItem = {
  title: string;
  description: string;
  status: RoadmapStatus;
};

export const roadmap: RoadmapItem[] = [
  { title: "Statut serveur en temps réel", description: "Afficher disponibilité, population et messages d'état.", status: "Prepare" },
  { title: "Liste des guildes", description: "Présenter les guildes actives et leurs besoins de recrutement.", status: "Explore" },
  { title: "Recrutement de guildes", description: "Permettre aux joueurs de trouver une équipe sans spam Discord.", status: "Explore" },
  { title: "Calendrier interactif", description: "Centraliser raids, boss, tournois et marches communautaires.", status: "Prepare" },
  { title: "Annonces synchronisées Discord", description: "Publier les annonces serveur automatiquement sur le site.", status: "Plus tard" },
  { title: "Formulaire de whitelist", description: "Recevoir les candidatures et vérifier les profils Discord.", status: "Plus tard" },
  { title: "Tableau des événements", description: "Afficher inscriptions, horaires et résultats.", status: "Explore" },
  { title: "Classement PvP", description: "Suivre les rivalités sans encourager le harcèlement.", status: "Plus tard" },
  { title: "Marche communautaire", description: "Lister offres, demandes et services entre joueurs.", status: "Explore" },
  { title: "Guides dynamiques", description: "Passer des cartes statiques à un contenu éditable.", status: "Prepare" },
  { title: "Carte des zones interdites", description: "Montrer les zones à ne pas bloquer par construction.", status: "Explore" },
  { title: "Système de ticket web", description: "Préparer une alternative au ticket Discord, connectée aux admins.", status: "Plus tard" },
  { title: "Connexion Discord OAuth", description: "Identifier les joueurs et debloquer des fonctions privees.", status: "Plus tard" },
  { title: "Panneau admin", description: "Gérer les guides, événements, annonces et règles.", status: "Plus tard" },
  { title: "Historique des sanctions anonymisé", description: "Publier des décisions importantes sans exposer inutilement les joueurs.", status: "Plus tard" },
  { title: "Journal des mises à jour serveur", description: "Archiver changements de règles, config et événements.", status: "Prepare" },
  { title: "Vote communautaire", description: "Sonder la communaute sur les changements importants.", status: "Explore" },
  { title: "Hall of Fame", description: "Mettre en avant moments memorables, tournois et constructions.", status: "Plus tard" },
  { title: "Base spotlight", description: "Presenter les bases remarquables avec accord des joueurs.", status: "Plus tard" },
  { title: "Candidature staff", description: "Structurer les candidatures pour rejoindre l'équipe admin.", status: "Plus tard" }
];
