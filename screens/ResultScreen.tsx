/* screens/ResultScreen.tsx */
import React, { useMemo } from 'react';
import { ScrollView, View, Text, StyleSheet, Button } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { buildSummary, copySummary, shareSummary } from '../utils/share';

type Props = NativeStackScreenProps<RootStackParamList, 'Result'>;

export default function ResultScreen({ route }: Props) {
  const { mobilePhaseVolumeMl, solventsTotals } = route.params;

  // Формуємо текст для показу й копіювання/шерінгу лише один раз
  const summaryText = useMemo(
    () => buildSummary(mobilePhaseVolumeMl, solventsTotals ?? {}),
    [mobilePhaseVolumeMl, solventsTotals],
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Результат аналізу</Text>

        {mobilePhaseVolumeMl != null && (
          <>
            <Text style={styles.heading}>Обсяг мобільної фази:</Text>
            <Text style={styles.dataText}>
              {mobilePhaseVolumeMl.toFixed(2)} мл
            </Text>
          </>
        )}

        {solventsTotals && Object.keys(solventsTotals).length > 0 && (
          <>
            <Text style={styles.heading}>Підсумок розчинників:</Text>
            {Object.entries(solventsTotals).map(([name, vol]) => (
              <Text key={name} style={styles.dataText}>
                {name}: {vol.toFixed(2)} мл
              </Text>
            ))}
          </>
        )}

        {/* Кнопки «Копіювати» та «Поділитись» */}
        <View style={styles.btnRow}>
          <Button title="Копіювати" onPress={() => copySummary(summaryText)} />
          <View style={{ width: 12 }} />
          <Button title="Поділитись" onPress={() => shareSummary(summaryText)} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContent: { padding: 16 },

  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  heading: { marginTop: 16, fontSize: 16, fontWeight: '600' },
  dataText: { fontSize: 14, marginLeft: 8, marginTop: 4 },

  btnRow: { flexDirection: 'row', marginTop: 24, justifyContent: 'center' },
});
