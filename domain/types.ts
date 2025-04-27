/**
 * domain/types.ts
 */

// Опис одного кроку градієнта (якщо потрібна градієнтна програма)
export interface GradientStep {
  timeMin: number;    // Час, хв
  percentA: number;   // Відсоток розчинника A
  percentB: number;   // Відсоток розчинника B
}

// Дані градієнта (можна розширювати кількістю розчинників)
export interface GradientData {
  gradientSteps: GradientStep[];
}

/**
 * Опис одного «основного» розчину в методі.
 * Відповідає тому, що у вас у `methodCalculator.ts` називається MethodSolution.
 */
export interface MethodSolution {
  name: string;                  // Назва розчину
  type: 'liquid' | 'solid';      // Тип (рідкий / твердий)
  isMobilePhase: boolean;        // Чи є цей розчин мобільною фазою
  isInjected: boolean;           // Чи вводиться він безпосередньо (ін’єкції)
  injectionCount: number;        // Кількість ін’єкцій (якщо isInjected = true)
  parallels: number;             // Кількість паралелей (колб)

  /**
   * Склад у відсотках (сума має бути 1.0, якщо ви дотримуєтеся пропорцій),
   * наприклад: { "Water": 0.5, "Methanol": 0.5 } => 50/50.
   */
  composition: Record<string, number>;

  /**
   * Цільовий обсяг (мл), що може бути розрахований автоматично
   * або заданий користувачем (наприклад, для розчинів, що не є моб. фазами).
   */
  targetVolume?: number;
}

/**
 * Якщо у вашій логіці є "опційні" розчини,
 * що не обов’язково використовуються в розрахунках.
 */
export interface OptionalSolution {
  name: string;
  maxVolumeMl: number;
  usedVolumeMl?: number; 
  recipeName?: string;
}

/**
 * Якщо планується окремо зберігати дані по ін’єкціях
 * (замість тримати injectionCount у самому MethodSolution),
 * тоді можна використати цей інтерфейс. Інакше — видаляйте.
 */
export interface Injection {
  solutionName: string;   // "Test solution"
  injectionCount: number; // Кількість ін’єкцій
}

/**
 * Головна структура методичних даних, які ви передаєте
 * (фронтенд -> бекенд) і отримуєте обробленими (бекенд -> фронтенд).
 */
export interface MethodData {
  // Основні параметри
  methodDurationMin: number;  // хв
  flowRateMlMin: number;      // мл/хв
  sparePercent: number;       // запас (0.2 => 20%)

  // Якщо потрібно зберігати заг. кількість ін’єкцій окремо,
  // або розраховується (не обов'язково).
  totalInjections?: number;

  // Градієнтна програма (опціонально)
  gradientData?: GradientData;

  /**
   * Основний список розчинів (мобільні фази, контрольні, іспитові),
   * який ідеально відповідає тому, з чим працює ваш methodCalculator.ts
   */
  solutions: MethodSolution[];

  /**
   * Якщо ви плануєте окремо зберігати ін’єкції,
   * а не через fields у MethodSolution,
   * можна включити injections. Інакше залишити пустим або видалити.
   */
  injectionsList?: Injection[];

  /**
   * Якщо хочете додатково відслідковувати опційні розчини
   */
  optionalSolutionsList?: OptionalSolution[];

  // Результати, що розраховуються калькулятором
  mobilePhaseVolumeMl?: number;
  
  /**
   * Сумарні обсяги кожного розчинника (ключ — назва, значення — мл).
   * Заповнюється після обчислень у методі coreCalculations.
   */
  solventsTotals: Record<string, number>;

  // Якщо потрібно зберігати ще якісь реагенти чи дод. дані
  reagentsTotals?: Record<string, number>;

  // Логування / аудит
  logMessages: string[];
  auditTrail: string[];
}
