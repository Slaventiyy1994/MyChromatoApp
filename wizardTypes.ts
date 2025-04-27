/* wizardTypes.ts */
export interface Reagent {
    id: string;
    name: string;
    volume: string;  // текстове поле
  }
  
  export interface Solution {
    id: string;
    name: string;
    targetVolume: string;
    parallels: string;
    isMobilePhase: boolean;
    reagents: Reagent[];
  }
  
  export interface WizardState {
    flowRate: string;
    methodDuration: string;
    sparePercent: string;
    injectionCount: string;
    solutions: Solution[];
  }
  