/* screens/SolutionsScreen.tsx */
import React from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Switch,
  ScrollView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { useWizard } from '../context/WizardContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';  // ← виправлений імпорт

type Props = NativeStackScreenProps<RootStackParamList, 'Solutions'>;

export default function SolutionsScreen({ navigation }: Props) {
  const { state, patchSolution, addSolution, removeSolution } = useWizard();

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="always">
      <Text style={styles.h1}>Крок 2. Розчини</Text>

      {!state.solutions.length && (
        <Text style={{ marginVertical: 8 }}>Поки немає розчинів.</Text>
      )}

      {state.solutions.map((item, idx) => (
        <View key={item.id} style={styles.card}>
          {/* заголовок + смітничок */}
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Розчин {idx + 1}</Text>
            <MaterialIcons
              name="delete"
              size={22}
              color="#d00"
              onPress={() =>
                Alert.alert('Видалити розчин?', '', [
                  { text: 'Скасувати', style: 'cancel' },
                  {
                    text: 'Так',
                    style: 'destructive',
                    onPress: () => removeSolution(item.id),
                  },
                ])
              }
            />
          </View>

          <TextInput
            style={styles.input}
            placeholder="Назва"
            value={item.name}
            onChangeText={v => patchSolution(item.id, { name: v })}
          />
          <TextInput
            style={styles.input}
            placeholder="Обʼєм, мл"
            keyboardType="numeric"
            value={item.targetVolume}
            onChangeText={v => patchSolution(item.id, { targetVolume: v })}
          />
          <TextInput
            style={styles.input}
            placeholder="Паралелі"
            keyboardType="numeric"
            value={item.parallels}
            onChangeText={v => patchSolution(item.id, { parallels: v })}
          />

          <View style={styles.row}>
            <Text style={{ marginRight: 8 }}>Мобільна фаза?</Text>
            <Switch
              value={item.isMobilePhase}
              onValueChange={v => patchSolution(item.id, { isMobilePhase: v })}
            />
          </View>

          <Button
            title="Вказати розчинники →"
            onPress={() =>
              navigation.navigate('Composition', { solutionId: item.id })
            }
          />
        </View>
      ))}

      <Button title="➕ Додати розчин" onPress={addSolution} />
      <Button
        title="Далі →"
        disabled={!state.solutions.length}
        onPress={() => navigation.navigate('Review')}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  h1: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },

  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginBottom: 8,
    backgroundColor: '#fff',
  },
  card: { borderWidth: 1, borderColor: '#777', padding: 8, marginBottom: 12 },
  row: { flexDirection: 'row', alignItems: 'center', marginTop: 12 },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  cardTitle: { fontWeight: '600', fontSize: 15 },
});
