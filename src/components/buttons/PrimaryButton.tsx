import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { rounded } from '../../theme/spacing';
import { Text } from '../typography/Text';

type Props = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  testID?: string;
};

export function PrimaryButton({ title, onPress, disabled, testID }: Props) {
  return (
    <Pressable
      testID={testID}
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [styles.button, disabled && styles.disabled, pressed && !disabled ? styles.pressed : null]}
    >
      <Text variant="tech" color={colors.tacticalGold} style={styles.title}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.mahoganyRich,
    borderRadius: rounded.full,
    borderWidth: 1,
    borderColor: colors.tacticalGold,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },
  disabled: {
    opacity: 0.5,
  },
  title: {
    textAlign: 'center',
    letterSpacing: 2,
  },
});

