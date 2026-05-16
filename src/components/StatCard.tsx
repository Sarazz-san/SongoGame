import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../theme/colors';
import { rounded, spacing } from '../theme/spacing';
import { Text } from './typography/Text';

type Props = {
  label: string;
  value: string;
};

export function StatCard({ label, value }: Props) {
  return (
    <View style={styles.card}>
      <Text variant="tech" style={styles.label}>
        {label}
      </Text>
      <Text variant="stats" style={styles.value}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: rounded.xl,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    padding: spacing.gutter,
    gap: 6,
  },
  label: {
    textTransform: 'uppercase',
    fontSize: 10,
    letterSpacing: 1.5,
  },
  value: {
    color: colors.tacticalGold,
  },
});

