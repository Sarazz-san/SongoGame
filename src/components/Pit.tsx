import React from 'react';
import { Animated, Easing, Pressable, StyleSheet, View } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { Text } from './typography/Text';
import { Seed } from './Seed';

type Props = {
  index: number;
  seeds: number;
  size?: number;
  disabled?: boolean;
  selected?: boolean;
  highlight?: boolean;
  onTap?: () => void;
};

/* eslint-disable no-bitwise */
const mulberry32 = (a: number) => {
  return () => {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};
/* eslint-enable no-bitwise */

export function Pit({ index, seeds, size, disabled, selected, highlight, onTap }: Props) {
  const renderedSeeds = Math.min(seeds, 12);
  const extraSeeds = seeds - renderedSeeds;
  const rand = mulberry32(index * 1337 + seeds * 97);
  const pulse = React.useRef(new Animated.Value(0)).current;
  const pop = React.useRef(new Animated.Value(0)).current;
  const longPressedRef = React.useRef(false);
  const [showBigCount, setShowBigCount] = React.useState(false);

  React.useEffect(() => {
    if (!selected) {
      pulse.stopAnimation();
      pulse.setValue(0);
      return;
    }

    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 450, easing: Easing.out(Easing.quad), useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0, duration: 450, easing: Easing.in(Easing.quad), useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [pulse, selected]);

  const scale = selected ? pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.05] }) : 1;
  const pitSize = typeof size === 'number' ? size : undefined;

  const showCount = React.useCallback(() => {
    longPressedRef.current = true;
    setShowBigCount(true);
    pop.stopAnimation();
    pop.setValue(0);
    Animated.timing(pop, { toValue: 1, duration: 180, easing: Easing.out(Easing.cubic), useNativeDriver: true }).start();
  }, [pop]);

  const hideCount = React.useCallback(() => {
    if (!showBigCount) return;
    Animated.timing(pop, { toValue: 0, duration: 140, easing: Easing.in(Easing.quad), useNativeDriver: true }).start(
      ({ finished }) => {
        if (finished) setShowBigCount(false);
      }
    );
  }, [pop, showBigCount]);

  return (
    <Animated.View style={[styles.wrapper, { transform: [{ scale }] }]}>
      {showBigCount ? (
        <Animated.View
          pointerEvents="none"
          style={[
            styles.bigCountWrap,
            {
              opacity: pop,
              transform: [
                { translateY: pop.interpolate({ inputRange: [0, 1], outputRange: [10, -12] }) },
                { scale: pop.interpolate({ inputRange: [0, 1], outputRange: [0.96, 1.08] }) },
              ],
            },
          ]}
        >
          <Text variant="header" style={styles.bigCountText} color={colors.tacticalGold}>
            {seeds}
          </Text>
        </Animated.View>
      ) : null}

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Pit ${index + 1}`}
        disabled={disabled}
        delayLongPress={260}
        onLongPress={() => {
          if (disabled) return;
          showCount();
        }}
        onPress={() => {
          // Tap = play. Long-press = reveal count (no play).
          if (disabled) return;
          if (longPressedRef.current) {
            longPressedRef.current = false;
            return;
          }
          onTap?.();
        }}
        onPressOut={() => {
          hideCount();
        }}
        style={({ pressed }) => [
          styles.pit,
          pitSize ? { width: pitSize, height: pitSize } : null,
          selected && styles.pitSelected,
          highlight && styles.pitHighlight,
          disabled && styles.pitDisabled,
          pressed && !disabled ? styles.pitPressed : null,
        ]}
      >
        <View style={styles.inner}>
          <View style={styles.innerShadow} pointerEvents="none" />
          <View style={styles.gradientOverlay} pointerEvents="none" />
          <View style={styles.seedWrap} pointerEvents="none">
            {Array.from({ length: renderedSeeds }).map((_, i) => {
              const variant = (Math.floor(rand() * 4) as 0 | 1 | 2 | 3) ?? 0;
              const seedSize = 6 + Math.floor(rand() * 3);
              const jitterX = (rand() - 0.5) * 14;
              const jitterY = (rand() - 0.5) * 14;
              return (
                <View key={i} style={{ transform: [{ translateX: jitterX }, { translateY: jitterY }] }}>
                  <Seed variant={variant} size={seedSize} />
                </View>
              );
            })}
            {extraSeeds > 0 ? (
              <Text variant="tech" color={colors.onSurfaceVariant} style={styles.more}>
                +{extraSeeds}
              </Text>
            ) : null}
          </View>
          <Text variant="tech" color={colors.tacticalGold} style={styles.countSmall}>
            {seeds}
          </Text>
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pit: {
    borderRadius: 9999,
    backgroundColor: colors.ebonyDeep,
    borderWidth: 1.5,
    borderColor: colors.outlineVariant,
    overflow: 'hidden',
  },
  inner: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 8,
    backgroundColor: colors.ebonyDeep,
  },
  innerShadow: {
    ...StyleSheet.absoluteFill,
    borderWidth: 8,
    borderColor: 'rgba(0,0,0,0.5)',
    borderRadius: 999,
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFill,
    borderRadius: 999,
    zIndex: 0,
  },
  seedWrap: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  more: {
    fontSize: 10,
    position: 'absolute',
    bottom: -2,
    right: 12,
    zIndex: 2,
  },
  countSmall: {
    ...typography.labelTechnical,
    position: 'absolute',
    top: 8,
    right: 10,
    fontSize: 12,
    opacity: 0.9,
    zIndex: 2,
  },
  bigCountWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: -22,
    alignItems: 'center',
    zIndex: 3,
  },
  bigCountText: {
    letterSpacing: 0,
    fontSize: 22,
    textShadowColor: 'rgba(0,0,0,0.7)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  pitSelected: {
    borderColor: colors.tacticalGold,
    backgroundColor: 'rgba(208, 163, 95, 0.05)',
    shadowColor: colors.tacticalGold,
    shadowOpacity: 0.8,
    shadowRadius: 15,
  },
  pitHighlight: {
    borderColor: 'rgba(208, 163, 95, 0.4)',
    shadowColor: colors.tacticalGold,
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  pitPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.96 }],
  },
  pitDisabled: {
    opacity: 0.35,
  },
});
