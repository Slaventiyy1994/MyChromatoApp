/* utils/share.ts
 * універсальні «поділитись/скопіювати» для короткого зведення
 */
import Clipboard from '@react-native-clipboard/clipboard';
import { Alert, Share } from 'react-native';

/** Формуємо текст типу:
 *  Мобільна фаза: 23.50 мл
 *  Water:  50.00 мл
 *  MeOH :  50.00 мл
 */
export function buildSummary(
  mobilePhaseVolumeMl?: number,
  solventsTotals: Record<string, number> = {},
): string {
  const rows: string[] = [];

  if (mobilePhaseVolumeMl != null) {
    rows.push(`Мобільна фаза: ${mobilePhaseVolumeMl.toFixed(2)} мл`);
  }

  Object.entries(solventsTotals).forEach(([name, vol]) =>
    rows.push(`${name}: ${vol.toFixed(2)} мл`)
  );

  return rows.join('\n');
}

export async function copySummary(text: string) {
  Clipboard.setString(text);
  Alert.alert('Скопійовано', 'Зведення у буфері обміну');
}

export async function shareSummary(text: string) {
  try {
    await Share.share({ message: text });
  } catch (err) {
    Alert.alert('Помилка', 'Не вдалося поширити зведення');
  }
}
