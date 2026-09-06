import { isWeightedMovement, parseMovementRow, serializeMovement } from '@/lib/movements';

/**
 * Ligne de mouvement du metcon telle que l'éditeur la manipule : structurée,
 * jamais re-parsée depuis sa sérialisation entre deux frappes. Une ligne
 * « 12 » seule (reps saisies avant le nom) ne peut pas survivre à un
 * aller-retour `serializeMovement` → `parseMovementRow` (elle se relit
 * reps 1 / nom « 2 ») : l'état structuré est la source de vérité, la chaîne
 * n'est produite qu'à l'écriture dans `movements`.
 */
export interface MovementRow {
  reps: number | null;
  name: string;
  weightKg: number | null;
  weightKgWomen: number | null;
}

export const EMPTY_MOVEMENT_ROW: MovementRow = { reps: null, name: '', weightKg: null, weightKgWomen: null };

export function movementRowsFromLines(lines: string[]): MovementRow[] {
  return lines.map(l => parseMovementRow(l));
}

export function movementRowShowsWeight(row: MovementRow): boolean {
  return row.weightKg != null || row.weightKgWomen != null || isWeightedMovement(row.name);
}

export function serializeMovementRow(row: MovementRow): string {
  const showWeight = movementRowShowsWeight(row);
  const w = showWeight ? row.weightKg : null;
  const wW = showWeight ? row.weightKgWomen : null;
  if (row.reps == null) return serializeMovement(0, row.name, w, wW).replace(/^0\s*/, '').trim();
  return serializeMovement(row.reps, row.name, w, wW);
}

export function serializeMovementRows(rows: MovementRow[]): string[] {
  return rows.map(serializeMovementRow);
}

/** Ne modifie que la ligne `index`, et uniquement les champs du `patch`. */
export function updateMovementRow(rows: MovementRow[], index: number, patch: Partial<MovementRow>): MovementRow[] {
  return rows.map((row, i) => (i === index ? { ...row, ...patch } : row));
}
