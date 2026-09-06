/** Libellés d'affichage des disciplines — les valeurs internes (crossfit, hyrox…) restent inchangées en base. */
export const DISCIPLINE_LABEL: Record<string, string> = {
  crossfit: 'Functional',
  hyrox: 'Hybrid',
  hybrid: 'Hybrid',
  functional: 'Functional',
  haltero: 'Haltéro',
  endurance: 'Endurance',
};

export const disciplineLabel = (d: string) => DISCIPLINE_LABEL[d] ?? d;
