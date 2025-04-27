/* screens/ReviewScreen.tsx */

import React from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { useWizard } from '../context/WizardContext';
import { buildMethodData } from '../utils/buildMethodData';

type Props = NativeStackScreenProps<RootStackParamList, 'Review'>;

export default function ReviewScreen({ navigation }: Props) {
  const { state } = useWizard();

  const onSubmit = async () => {
    let methodData;
    try {
      methodData = buildMethodData(state); // перетворює локальний WizardState -> MethodData
    } catch (err: any) {
      Alert.alert('Помилка', err.message);
      return;
    }

    try {
      const res = await fetch('http://192.168.1.106:3000/api/methods', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ methodData }),
      });
      const data = await res.json();
      if (data.error) {
        Alert.alert('Помилка з бекенду', data.error);
      } else {
        navigation.replace('Result', {
          report: data.report,
          mobilePhaseVolumeMl: data.processedData?.mobilePhaseVolumeMl,
          solventsTotals: data.processedData?.solventsTotals,
        });
      }
    } catch (err: any) {
      Alert.alert('Помилка', err?.message ?? 'Невідома помилка');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Крок 3. Підсумок</Text>

      <Text>Потік: {state.flowRate} мл/хв</Text>
      <Text>Час: {state.methodDuration} хв</Text>
      <Text>Запас: {state.sparePercent} (≈ {+state.sparePercent * 100}%)</Text>
      <Text>Кількість ін’єкцій: {state.injectionCount}</Text>

      <Text style={styles.subtitle}>Розчини</Text>
      {state.solutions.map((sol) => (
        <View key={sol.id} style={styles.card}>
          <Text style={{ fontWeight: '600' }}>{sol.name || '(без назви)'}</Text>
          <Text>Обсяг (мл): {sol.targetVolume}</Text>
          <Text>Паралелей: {sol.parallels}</Text>
          <Text>Мобільна фаза: {sol.isMobilePhase ? 'так' : 'ні'}</Text>
          <Text>Склад:</Text>
          {sol.reagents.map((r) => (
            <Text key={r.id}>   • {r.name}: {r.volume} мл</Text>
          ))}
        </View>
      ))}

      <Button title="← Повернутися" onPress={() => navigation.goBack()} />
      <Button title="Надіслати" onPress={onSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  subtitle: { marginTop: 16, fontSize: 16, fontWeight: '600' },
  card: {
    borderWidth: 1, borderColor: '#aaa',
    padding: 8, marginVertical: 8, borderRadius: 4
  }
});
