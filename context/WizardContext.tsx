import React, {
  createContext, useContext, useState, ReactNode,
} from 'react';
import uuid from 'react-native-uuid';
import { WizardState, Solution } from '../wizardTypes';

interface WizardContextType {
  state: WizardState;
  setState: React.Dispatch<React.SetStateAction<WizardState>>;

  addSolution: () => void;
  removeSolution: (solutionId: string) => void;

  addReagent:   (solutionId: string) => void;
  removeReagent: (solutionId: string, reagentId: string) => void;

  patchSolution: (solutionId: string, patch: Partial<Solution>) => void;
}

const WizardContext = createContext<WizardContextType | null>(null);
export const useWizard = () => useContext(WizardContext)!;

/* ─────────────────────────────────────────────────────────── */

export const WizardProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<WizardState>({
    flowRate: '1',
    methodDuration: '10',
    sparePercent: '0.1',
    injectionCount: '5',
    solutions: [],
  });

  /* ───────────── solutions ───────────── */
  const addSolution = () => {
    const sol: Solution = {
      id: uuid.v4().toString(),
      name: '',
      targetVolume: '',
      parallels: '1',
      isMobilePhase: false,
      reagents: [],
    };
    setState(prev => ({ ...prev, solutions: [...prev.solutions, sol] }));
  };

  const removeSolution = (sid: string) =>
    setState(prev => ({ ...prev, solutions: prev.solutions.filter(s => s.id !== sid) }));

  const patchSolution = (sid: string, patch: Partial<Solution>) =>
    setState(prev => ({
      ...prev,
      solutions: prev.solutions.map(s => (s.id === sid ? { ...s, ...patch } : s)),
    }));

  /* ───────────── reagents ───────────── */
  const addReagent = (sid: string) => {
    setState(prev => ({
      ...prev,
      solutions: prev.solutions.map(s =>
        s.id === sid
          ? { ...s, reagents: [...s.reagents, { id: uuid.v4().toString(), name: '', volume: '' }] }
          : s
      ),
    }));
  };

  const removeReagent = (sid: string, rid: string) =>
    patchSolution(sid, {
      reagents: state.solutions.find(s => s.id === sid)!.reagents.filter(r => r.id !== rid),
    });

  return (
    <WizardContext.Provider
      value={{
        state,
        setState,
        addSolution,
        removeSolution,
        addReagent,
        removeReagent,
        patchSolution,
      }}
    >
      {children}
    </WizardContext.Provider>
  );
};