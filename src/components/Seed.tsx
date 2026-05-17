import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../theme/colors';

type Variant = 0 | 1 | 2 | 3;

type Props = {
  variant?: Variant;
  size?: number;
};

export function Seed({ size = 7 }: Props) {
  return (
    <View style={[styles.base, { width: size, height: size, borderRadius: size / 2 }]}>
      <View
        style={[
          styles.highlight,
          {
            width: size * 0.4,
            height: size * 0.3,
            borderRadius: size * 0.2,
            top: size * 0.1,
            left: size * 0.15,
          },
        ]}
      />
      <View
        style={[
          styles.shadow,
          {
            width: size * 0.6,
            height: size * 0.2,
            borderRadius: size * 0.1,
            bottom: size * 0.1,
            right: size * 0.1,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: colors.seedIvory,
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.15)',
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 1,
    shadowOffset: { width: 0, height: 1 },
    overflow: 'hidden',
  },
  highlight: {
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  shadow: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
});
