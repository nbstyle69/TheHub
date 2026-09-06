import {
  EMPTY_MOVEMENT_ROW,
  movementRowsFromLines,
  serializeMovementRows,
  updateMovementRow,
} from '@/lib/wodMovementRows';

describe('wodMovementRows — saisie des reps sur une ligne', () => {
  const rows = movementRowsFromLines(['21 Thruster (43/30 kg)', '']);

  it('la saisie « 12 » sur la ligne 2 ne touche que les reps de la ligne 2', () => {
    const next = updateMovementRow(rows, 1, { reps: 12 });
    expect(next[0]).toEqual(rows[0]);
    expect(next[1]).toEqual({ reps: 12, name: '', weightKg: null, weightKgWomen: null });
  });

  it('les reps restent dans leur colonne après un aller-retour vers `movements`', () => {
    // Avant : « 12 » seul se relisait reps 1 / nom « 2 » à chaque frappe.
    const typed = updateMovementRow(rows, 1, { reps: 1 });
    const typedMore = updateMovementRow(typed, 1, { reps: 12 });
    expect(typedMore[1].reps).toBe(12);
    expect(typedMore[1].name).toBe('');
    expect(serializeMovementRows(typedMore)).toEqual(['21 Thruster (43/30 kg)', '12']);
  });

  it('les reps sur une ligne nommée et chargée ne modifient ni le nom ni la charge', () => {
    const base = movementRowsFromLines(['21 Thruster (43/30 kg)', 'Front Squat (60/40 kg)']);
    const next = updateMovementRow(base, 1, { reps: 5 });
    expect(next[0]).toEqual(base[0]);
    expect(next[1]).toEqual({ reps: 5, name: 'Front Squat', weightKg: 60, weightKgWomen: 40 });
    expect(serializeMovementRows(next)[1]).toBe('5 Front Squat (60/40 kg)');
  });

  it('une ligne vide ajoutée se sérialise vide', () => {
    expect(serializeMovementRows([{ ...EMPTY_MOVEMENT_ROW }])).toEqual(['']);
  });
});
