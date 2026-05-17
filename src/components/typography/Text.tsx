import React from 'react';
import { StyleSheet, Text as RNText, type TextProps } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

type Variant = 'header' | 'body' | 'tech' | 'stats';

type Props = TextProps & {
  variant?: Variant;
  color?: string;
};

export function Text({ variant = 'body', color, style, ...props }: Props) {
  return <RNText {...props} style={[styles.base, stylesByVariant[variant], color ? { color } : null, style]} />;
}

const styles = StyleSheet.create({
  base: {
    color: colors.onSurface,
    fontFamily: typography.bodyMd.fontFamily,
  },
});

const stylesByVariant = StyleSheet.create({
  header: {
    ...typography.headlineLgMobile,
    color: colors.tacticalGold,
    letterSpacing: 3,
  },
  body: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
  },
  tech: {
    ...typography.labelTechnical,
    color: colors.onSurfaceVariant,
    letterSpacing: 1,
  },
  stats: {
    ...typography.statsDisplay,
    color: colors.tacticalGold,
  },
});

