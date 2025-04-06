import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

// Імпортуємо MethodCalculator:
import { MethodCalculator } from './domain/methodCalculator';

export default function App() {
  // 1. Створюємо екземпляр нашого класу
  const calc = new MethodCalculator();

  // 2. Парсимо текст (умовно)
  const rawText = "Flow rate 1.0 ml/min, duration 10 min, extra 10%";
  const methodData = calc.parseMethod(rawText);

  // 3. Задаємо кількість ін’єкцій (для прикладу)
  methodData.totalInjections = 5;

  // 4. Викликаємо coreCalculations
  calc.coreCalculations(methodData);

  // 5. Формуємо звіт
  const report = calc.generateFinalReport(methodData);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Мій Хроматографічний Додаток</Text>
      <Text style={styles.sectionTitle}>Звіт:</Text>
      <Text style={styles.reportText}>{report}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f7f7f7' },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    marginTop: 16,
    marginBottom: 4,
  },
  reportText: {
    fontSize: 14,
    lineHeight: 20,
      },
});
