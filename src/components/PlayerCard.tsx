import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../theme/colors';
import { rounded, spacing } from '../theme/spacing';
import { Text } from './typography/Text';
import { AnimatedNumber } from './AnimatedNumber';

type Props = {
  name: string;
  subtitle?: string;
  captured: number;
  active?: boolean;
};

export function PlayerCard({ name, subtitle, captured, active }: Props) {
  return (
    <View style={[styles.card, active ? styles.active : null]}>
      <View style={styles.left}>
        <Text variant="body" color={colors.onSurface}>
          {name}
        </Text>
        {!!subtitle && (
          <Text variant="tech" style={styles.subtitle}>
            {subtitle}
          </Text>
        )}
      </View>
      <View style={styles.right}>
        <Text variant="tech" style={styles.capturedLabel}>
          Captured
        </Text>
        <AnimatedNumber value={captured} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.unit * 2,
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: rounded.xl,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    paddingHorizontal: spacing.gutter,
    paddingVertical: spacing.unit * 2,
  },
  active: {
    borderColor: colors.tacticalGold,
    shadowColor: colors.tacticalGold,
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
  },
  left: {
    flex: 1,
    gap: 4,
  },
  subtitle: {
    opacity: 0.9,
  },
  right: {
    alignItems: 'flex-end',
    gap: 2,
  },
  capturedLabel: {
    textTransform: 'uppercase',
    fontSize: 10,
    letterSpacing: 1.5,
  },
});
