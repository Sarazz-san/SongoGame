import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../theme/colors';

type Variant = 0 | 1 | 2 | 3;

type Props = {
  variant?: Variant;
  size?: number;
};

export function Seed({ variant = 0, size = 6 }: Props) {
  return <View style={[styles.base, variantStyles[variant], { width: size, height: size, borderRadius: size / 2 }]} />;
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: colors.seedIvory,
    shadowColor: '#000',
    shadowOpacity: 0.55,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
  },
});

const variantStyles = StyleSheet.create({
  0: {
    opacity: 0.95,
  },
  1: {
    opacity: 0.9,
  },
  2: {
    opacity: 0.85,
  },
  3: {
    opacity: 0.92,
  },
});

