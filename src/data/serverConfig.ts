export const siteVersion = "0.1.0";

export const discordInvite = "https://discord.gg/uzaZUxTKhs";

export type RaidWindow = {
  day: string;
  hours: string;
  timezone: string;
  note?: string;
};

export type ServerConfigEntry = {
  key: string;
  value: string;
  label: string;
  group: "Capacite" | "Rates" | "Gameplay" | "Construction";
};

export const serverConfig = {
  name: "Gaming P&E Pal",
  discordInvite,
  type: "Serveur privé Palworld",
  style: "PvP léger",
  populationMax: 24,
  guildSize: 3,
  basesPerGuild: 2,
  workerMax: 15,
  buildingLimit: 800,
  progression: "x1.25 à x1.5",
  death: "Perte légère, pas de perte de Pals",
  heroBadges: [
    "Équipes de 3",
    "18 à 24 joueurs maximum",
    "PvP activé",
    "Raids limités",
    "Progression x1.5 maximum",
    "Pas de perte de Pals à la mort"
  ],
  briefStats: [
    { label: "Joueurs max", value: "24" },
    { label: "Joueurs par guilde", value: "3" },
    { label: "Bases par guilde", value: "2" },
    { label: "PvP sauvage", value: "Autorisé" },
    { label: "Raid offline", value: "Interdit" },
    { label: "Pals à la mort", value: "Conservés" },
    { label: "Discord", value: "Annonces obligatoires" }
  ],
  raidWindows: [
    { day: "Vendredi", hours: "19h à 23h", timezone: "GMT-5" },
    { day: "Samedi", hours: "19h à 23h", timezone: "GMT-5" },
    { day: "Dimanche", hours: "19h à 22h", timezone: "GMT-5" }
  ] satisfies RaidWindow[]
};

export const serverConfigEntries: ServerConfigEntry[] = [
  { key: "ServerPlayerMaxNum", value: "24", label: "Joueurs maximum", group: "Capacite" },
  { key: "GuildPlayerMaxNum", value: "3", label: "Joueurs par guilde", group: "Capacite" },
  { key: "BaseCampMaxNumInGuild", value: "2", label: "Bases par guilde", group: "Construction" },
  { key: "BaseCampWorkerMaxNum", value: "15", label: "Workers par base", group: "Construction" },
  { key: "MaxBuildingLimitNum", value: "800", label: "Limite de constructions", group: "Construction" },
  { key: "ExpRate", value: "1.500000", label: "Expérience", group: "Rates" },
  { key: "PalCaptureRate", value: "1.500000", label: "Capture de Pals", group: "Rates" },
  { key: "PalEggDefaultHatchingTime", value: "0.500000", label: "Temps d'éclosion", group: "Rates" },
  { key: "CollectionDropRate", value: "1.500000", label: "Drops ressources", group: "Rates" },
  { key: "EnemyDropItemRate", value: "1.250000", label: "Drops ennemis", group: "Rates" },
  { key: "CollectionObjectHpRate", value: "0.800000", label: "Vie des ressources", group: "Rates" },
  { key: "CollectionObjectRespawnSpeedRate", value: "0.800000", label: "Respawn ressources", group: "Rates" },
  { key: "ItemWeightRate", value: "0.700000", label: "Poids des items", group: "Rates" },
  { key: "bAllowEnhanceStat_Health", value: "False", label: "Boost santé interdit", group: "Gameplay" },
  { key: "bAllowEnhanceStat_Attack", value: "False", label: "Boost attaque interdit", group: "Gameplay" },
  { key: "bEnableFastTravel", value: "True", label: "Fast travel activé", group: "Gameplay" },
  { key: "bEnableFastTravelOnlyBaseCamp", value: "True", label: "Fast travel limité aux bases", group: "Gameplay" },
  { key: "bExistPlayerAfterLogout", value: "True", label: "Personnage présent après déconnexion", group: "Gameplay" },
  { key: "GuildRejoinCooldownMinutes", value: "360.000000", label: "Cooldown de retour guilde", group: "Gameplay" },
  { key: "bBuildAreaLimit", value: "True", label: "Limites de construction actives", group: "Construction" },
  { key: "bInvisibleOtherGuildBaseCampAreaFX", value: "False", label: "Zones de bases visibles", group: "Construction" }
];

export const configCode = serverConfigEntries.map((entry) => `${entry.key}=${entry.value}`).join("\n");

export const serverInterpretations = [
  { title: "ExpRate x1.5", text: "Progression plus confortable sans accélérer trop vite." },
  { title: "Capture x1.5", text: "Capture plus agréable, surtout en début de progression." },
  { title: "Œufs x0.5", text: "Éclosion plus rapide pour garder le rythme." },
  { title: "Drops ressources x1.5", text: "Farming moins lourd sans supprimer la survie." },
  { title: "Drops ennemis x1.25", text: "Récompenses légèrement améliorées." },
  { title: "Poids x0.7", text: "Gestion d'inventaire plus souple." },
  { title: "Workers 15", text: "Limite pensée pour la stabilité serveur." },
  { title: "2 bases par guilde", text: "Limite anti-abus et carte plus respirable." },
  { title: "Guilde 3 joueurs", text: "Évite les méga-guildes et garde les affrontements lisibles." }
];
