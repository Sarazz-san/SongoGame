import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { colors } from '../../theme/colors';
import { rounded, spacing } from '../../theme/spacing';
import { Text } from '../typography/Text';

type Tone = 'default' | 'warning';

type Props = {
  label: string;
  tone?: Tone;
  onPress?: () => void;
};

export function StatusChip({ label, tone = 'default', onPress }: Props) {
  const content = (
    <View style={[styles.chip, tone === 'warning' ? styles.warning : null]}>
      <Text variant="tech" color={tone === 'warning' ? colors.error : colors.onSurfaceVariant} style={styles.text}>
        {label}
      </Text>
    </View>
  );

  if (!onPress) return content;
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={({ pressed }) => (pressed ? styles.pressed : null)}>
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: rounded.full,
    borderWidth: 1,
    borderColor: 'rgba(208,163,95,0.06)',
    paddingHorizontal: spacing.unit * 1.5,
    paddingVertical: spacing.unit,
  },
  warning: {
    borderColor: colors.error,
    backgroundColor: colors.surfaceContainer,
  },
  text: {
    textTransform: 'uppercase',
    fontSize: 10,
    letterSpacing: 1.5,
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.99 }],
  },
});
