/**
 * Тимчасові типи, які живуть тільки у майстрі (WizardScreen)
 * і не виходять назовні через API.
 */

/* ─────────── Reagent ─────────── */
export interface Reagent {
  id: string;
  name: string;
  volume: string;   // зберігаємо як текст до моменту валідації
}

/* ─────────── Solution ─────────── */
export interface Solution {
  id: string;
  name: string;
  targetVolume: string;
  parallels: string;
  isMobilePhase: boolean;   // ← новий чек‑бокс
  reagents: Reagent[];
}

/* ─────────── WizardState ─────────── */
export interface WizardState {
  flowRate: string;
  methodDuration: string;
  sparePercent: string;
  injectionCount: string;
  solutions: Solution[];
}

  