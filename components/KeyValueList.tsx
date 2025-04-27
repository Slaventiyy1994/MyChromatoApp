import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  data: Record<string, number | string>;
  units?: string;            // напр. "мл"
  precision?: number;        // 2 → 12.34
}

export default function KeyValueList({ data, units = '', precision = 2 }: Props) {
  const fmt = (v: number | string) =>
    typeof v === 'number' ? v.toFixed(precision) : v;

  return (
    <>
      {Object.entries(data).map(([k, v]) => (
        <View key={k} style={styles.row}>
          <Text style={styles.key}>{k}</Text>
          <Text style={styles.val}>
            {fmt(v)} {units}
          </Text>
        </View>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 },
  key: { fontWeight: '500' },
  val: { },
});
