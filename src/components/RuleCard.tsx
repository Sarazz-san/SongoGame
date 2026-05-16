import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../theme/colors';
import { rounded, spacing } from '../theme/spacing';
import { Text } from './typography/Text';

type Props = {
  title: string;
  subtitle: string;
  bullets: string[];
  note?: string;
};

export function RuleCard({ title, subtitle, bullets, note }: Props) {
  return (
    <View style={styles.card}>
      <Text variant="tech" style={styles.subtitle}>
        {subtitle}
      </Text>
      <Text variant="body" color={colors.onSurface} style={styles.title}>
        {title}
      </Text>
      <View style={styles.list}>
        {bullets.map((b, idx) => (
          <View key={idx} style={styles.item}>
            <Text variant="tech" color={colors.tacticalGold} style={styles.bullet}>
              •
            </Text>
            <Text variant="body" color={colors.onSurfaceVariant} style={styles.itemText}>
              {b}
            </Text>
          </View>
        ))}
      </View>
      {!!note && (
        <View style={styles.note}>
          <Text variant="body" color={colors.onSurfaceVariant} style={styles.noteText}>
            {note}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: rounded.xl,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    padding: spacing.gutter,
    gap: 10,
  },
  subtitle: {
    textTransform: 'uppercase',
    fontSize: 10,
    letterSpacing: 1.6,
    color: colors.onSurfaceVariant,
  },
  title: {
    fontSize: 18,
    color: colors.onSurface,
  },
  list: {
    gap: 8,
  },
  item: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-start',
  },
  bullet: {
    marginTop: 2,
  },
  itemText: {
    flex: 1,
  },
  note: {
    marginTop: 4,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: colors.outlineVariant,
  },
  noteText: {
    fontStyle: 'italic',
  },
});

