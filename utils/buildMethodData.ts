/* utils/buildMethodData.ts */
import { WizardState } from '../wizardTypes';

/**
 * Тут створюємо структуру, яку чекає бекенд (MethodData),
 * на основі локального WizardState.
 */
export function buildMethodData(state: WizardState) {
  // 1) Перевірки
  if (!state.solutions.length) {
    throw new Error('Необхідно додати хоча б один розчин');
  }
  const flow = Number(state.flowRate) || 0;
  if (flow <= 0) throw new Error('Невірне значення FlowRate');
  const duration = Number(state.methodDuration) || 0;
  if (duration <= 0) throw new Error('Невірне значення MethodDuration');
  const spare = Number(state.sparePercent) || 0;
  const injections = Number(state.injectionCount) || 1;
  if (injections < 1) throw new Error('Не менш ніж 1 ін’єкція');

  // 2) Формуємо solutions:
  const solutions = state.solutions.map((sol) => {
    const vol = Number(sol.targetVolume) || 0;
    const par = Number(sol.parallels) || 1;

    // обчислимо composition: кожен реагент = ml / totalVolume
    const composition: Record<string, number> = {};
    if (vol > 0) {
      sol.reagents.forEach((r) => {
        const ml = Number(r.volume) || 0;
        if (ml > 0) {
          // зберігаємо пропорцію
          composition[r.name || 'Reagent'] = ml / vol;
        }
      });
    }

    return {
      name: sol.name || 'Untitled solution',
      type: 'liquid' as const,
      isMobilePhase: sol.isMobilePhase,
      isInjected: true,           // припустимо, що всі вводимо
      injectionCount: injections,
      parallels: par,
      composition,
      targetVolume: vol,
    };
  });

  return {
    methodDurationMin: duration,
    flowRateMlMin: flow,
    sparePercent: spare,
    totalInjections: injections,
    solutions,
    solventsTotals: {},
    logMessages: [],
    auditTrail: [],
  };
}
