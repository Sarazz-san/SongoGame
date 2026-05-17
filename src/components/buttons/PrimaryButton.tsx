import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
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
      style={({ pressed }) => [styles.wrapper, pressed && !disabled ? styles.pressed : null]}
    >
      <View style={[styles.gradient, disabled ? styles.disabled : { backgroundColor: colors.tacticalGold }]}>
        <Text variant="tech" color={disabled ? colors.onSurfaceVariant : colors.onPrimary} style={styles.title}>
          {title}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: rounded.full,
    overflow: 'hidden',
  },
  gradient: {
    borderRadius: rounded.full,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.15)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 6 },
  },
  pressed: {
    opacity: 0.95,
    transform: [{ scale: 0.995 }],
  },
  disabled: {
    opacity: 0.6,
  },
  title: {
    textAlign: 'center',
    letterSpacing: 1.5,
    fontWeight: '700',
  },
});

