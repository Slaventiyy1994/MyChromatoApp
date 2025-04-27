/* App.tsx */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Скретч‑типи для навігації
export type RootStackParamList = {
  Params: undefined;
  Solutions: undefined;
  Composition: { solutionId: string };
  Review: undefined;
  Result: {
    report: string;
    mobilePhaseVolumeMl?: number;
    solventsTotals?: Record<string, number>;
  };
};

// Імпортуємо екрани
import ParamsScreen from './screens/ParamsScreen';
import SolutionsScreen from './screens/SolutionsScreen';
import CompositionScreen from './screens/CompositionScreen';
import ReviewScreen from './screens/ReviewScreen';
import ResultScreen from './screens/ResultScreen';

// Провайдер WizardContext
import { WizardProvider } from './context/WizardContext';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <WizardProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Params">
          <Stack.Screen
            name="Params"
            component={ParamsScreen}
            options={{ title: 'Крок 1: Параметри' }}
          />
          <Stack.Screen
            name="Solutions"
            component={SolutionsScreen}
            options={{ title: 'Крок 2: Розчини' }}
          />
          <Stack.Screen
            name="Composition"
            component={CompositionScreen}
            options={{ title: 'Склад розчину' }}
          />
          <Stack.Screen
            name="Review"
            component={ReviewScreen}
            options={{ title: 'Крок 3: Підсумок' }}
          />
          <Stack.Screen
            name="Result"
            component={ResultScreen}
            options={{ title: 'Результат' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </WizardProvider>
  );
}
