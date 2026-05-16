export type RuleSection = {
  key: string;
  title: string;
  subtitle: string;
  bullets: string[];
  note?: string;
};

// Source: synthèse des règles présentées sur clubawale.com (version la plus répandue aire Ekang)
export const RULES_FR: RuleSection[] = [
  {
    key: 'relay',
    title: 'Le Relais (Relay)',
    subtitle: 'MÉCANIQUE DE MOUVEMENT',
    bullets: [
      'Ramassez toutes les graines d’une case de votre territoire.',
      'Distribuez une graine par case, sans saut, en boucle: dans votre camp (droite→gauche), puis dans le camp adverse (gauche→droite).',
      'Si la case choisie contient >13 graines: vous faites un tour complet en sautant la case de départ, puis continuez à distribuer exclusivement chez l’adversaire (en répétant si besoin).',
    ],
  },
  {
    key: 'capture',
    title: 'Capture',
    subtitle: 'RÈGLE DE SCORE',
    bullets: [
      'La prise se fait uniquement dans le camp adverse.',
      'Il y a capture si la dernière graine tombe sur une case adverse qui contient 1 à 3 graines (elle passe donc à 2 à 4).',
      'La prise est “à la chaîne”: on remonte case par case chez l’adversaire tant que les cases contiennent 2 à 4 graines.',
      'La case adverse n°1 (la plus à gauche) n’est pas capturable si la distribution s’y termine, sauf si elle est incluse dans une prise à la chaîne.',
      'Si la distribution se termine dans la case adverse n°1 après au moins un tour complet, on capture uniquement 1 graine (la dernière déposée).',
    ],
  },
  {
    key: 'solidarity',
    title: 'Solidarité',
    subtitle: 'OBLIGATION DE NOURRIR',
    bullets: [
      'Si le camp adverse est vide, vous devez jouer un coup qui lui donne au moins 7 graines (si c’est possible).',
      'Si aucun coup ne peut donner 7 graines, vous devez jouer celui qui en donne le maximum.',
      'Si la solidarité est impossible (aucun coup ne permet d’atteindre le camp adverse), la partie s’arrête et les graines restantes reviennent aux propriétaires des camps.',
    ],
  },
  {
    key: 'forbidden',
    title: 'Interdits',
    subtitle: 'ÉTHIQUE DE JEU',
    bullets: [
      'Interdit: semer 1 ou 2 graines chez l’adversaire depuis votre case 7 (si vous y êtes contraint, ces graines reviennent à l’adversaire).',
      'Interdit: vider complètement le camp adverse (si un coup le fait, aucune prise n’est effectuée).',
    ],
  },
  {
    key: 'end',
    title: 'Fin de partie',
    subtitle: 'CONDITIONS',
    bullets: [
      'Victoire: un joueur atteint au moins 40 graines capturées (sur 70).',
      'Si aucun joueur ne dépasse 39 graines, la partie est nulle.',
      'Quand il reste moins de 10 graines sur le plateau: les graines d’un camp reviennent à son propriétaire.',
    ],
  },
];

