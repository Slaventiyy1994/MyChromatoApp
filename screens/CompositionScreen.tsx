/* screens/CompositionScreen.tsx */
import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Button,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { useWizard } from '../context/WizardContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';   // 👈 той самий трюк з імпортом

type Props = NativeStackScreenProps<RootStackParamList, 'Composition'>;

export default function CompositionScreen({ route, navigation }: Props) {
  const { solutionId } = route.params;
  const {
    state,
    patchSolution,
    addReagent,
    removeReagent,
  } = useWizard();

  /* шукаємо поточний розчин */
  const sol = state.solutions.find(s => s.id === solutionId)!;

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="always">
      <Text style={styles.h1}>Склад розчину: {sol.name || '—'}</Text>

      {/* список реагентів */}
      {sol.reagents.map((item, idx) => (
        <View key={item.id} style={styles.row}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Назва"
            value={item.name}
            onChangeText={v =>
              patchSolution(sol.id, {
                reagents: sol.reagents.map(r =>
                  r.id === item.id ? { ...r, name: v } : r,
                ),
              })
            }
          />

          <TextInput
            style={[styles.input, { width: 80 }]}
            placeholder="мл"
            keyboardType="numeric"
            value={item.volume}
            onChangeText={v =>
              patchSolution(sol.id, {
                reagents: sol.reagents.map(r =>
                  r.id === item.id ? { ...r, volume: v } : r,
                ),
              })
            }
          />

          {/* смітничок */}
          <MaterialIcons
            name="delete"
            size={22}
            color="#d00"
            style={{ marginLeft: 6 }}
            onPress={() =>
              Alert.alert('Видалити реагент?', '', [
                { text: 'Скасувати', style: 'cancel' },
                {
                  text: 'Так',
                  style: 'destructive',
                  onPress: () => removeReagent(sol.id, item.id),
                },
              ])
            }
          />
        </View>
      ))}

      {/* ➕ Додати реагент */}
      <Button title="➕ Додати реагент" onPress={() => addReagent(sol.id)} />

      {/* повернутися назад */}
      <Button title="← Повернутися" onPress={() => navigation.goBack()} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  h1: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },

  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },

  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 5,
    backgroundColor: '#fff',
  },
});
