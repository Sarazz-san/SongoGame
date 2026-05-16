import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../../theme/colors';
import { rounded, spacing } from '../../theme/spacing';
import { Text } from '../typography/Text';

type Tone = 'default' | 'warning';

type Props = {
  label: string;
  tone?: Tone;
};

export function StatusChip({ label, tone = 'default' }: Props) {
  return (
    <View style={[styles.chip, tone === 'warning' ? styles.warning : null]}>
      <Text variant="tech" color={tone === 'warning' ? colors.error : colors.onSurfaceVariant} style={styles.text}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    backgroundColor: colors.ebonyDeep,
    borderRadius: rounded.full,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    paddingHorizontal: spacing.unit * 1.5,
    paddingVertical: spacing.unit,
  },
  warning: {
    borderColor: colors.error,
  },
  text: {
    textTransform: 'uppercase',
    fontSize: 10,
    letterSpacing: 1.5,
  },
});

