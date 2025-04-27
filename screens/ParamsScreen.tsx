/* screens/ParamsScreen.tsx */

import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { useWizard } from '../context/WizardContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Params'>;

export default function ParamsScreen({ navigation }: Props) {
  const { state, setState } = useWizard();

  const updateField = (field: keyof typeof state, value: string) => {
    setState({ ...state, [field]: value });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Крок 1. Параметри</Text>

      <Text>Потік (мл/хв)</Text>
      <TextInput
        style={styles.input}
        value={state.flowRate}
        onChangeText={(v) => updateField('flowRate', v)}
        keyboardType="numeric"
      />

      <Text>Час (хв)</Text>
      <TextInput
        style={styles.input}
        value={state.methodDuration}
        onChangeText={(v) => updateField('methodDuration', v)}
        keyboardType="numeric"
      />

      <Text>Запас (0.1 = 10%)</Text>
      <TextInput
        style={styles.input}
        value={state.sparePercent}
        onChangeText={(v) => updateField('sparePercent', v)}
        keyboardType="numeric"
      />

      <Text>К-ть ін’єкцій</Text>
      <TextInput
        style={styles.input}
        value={state.injectionCount}
        onChangeText={(v) => updateField('injectionCount', v)}
        keyboardType="numeric"
      />

      <Button title="Далі →" onPress={() => navigation.navigate('Solutions')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  input: {
    borderWidth: 1, borderColor: '#777', marginBottom: 8,
    padding: 6, borderRadius: 4
  }
});
