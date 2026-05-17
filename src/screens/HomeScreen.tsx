import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '../theme/colors';
import { spacing, rounded } from '../theme/spacing';
import { typography } from '../theme/typography';
import { useGameStore } from '../store/useGameStore';
import { PrimaryButton } from '../components/buttons/PrimaryButton';
import { Text } from '../components/typography/Text';
import { RootStackParamList } from '../navigation/types';
import { StatusChip } from '../components/chips/StatusChip';
import { haptics } from '../shared/haptics';

export function HomeScreen() {
  const initializeGame = useGameStore((s) => s.initializeGame);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <View style={styles.heroContainer}>
        <Image source={require('../assets/images/hero.png')} style={styles.hero} resizeMode="cover" />
        <View style={[styles.heroOverlay, styles.heroOverlayBg]}>
          <Text variant="header" style={styles.heroTitle}>
            SONGO
          </Text>
          <Text variant="body" color={colors.onPrimaryContainer}>
            L’Art de la Stratégie Pure
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle} variant="header" color={colors.onSurface}>
          Démarrer une Partie
        </Text>
        <Text variant="body" color={colors.onSurfaceVariant}>
          Affrontez l’IA en solo ou défiez un ami en mode local sur le même écran.
        </Text>
        <View style={styles.actions}>
          <PrimaryButton
            title="SOLO (IA)"
            onPress={() => {
              haptics.trigger('impactLight');
              initializeGame('SOLO');
              navigation.navigate('Game');
            }}
          />
          <PrimaryButton
            title="LOCAL (PVP)"
            onPress={() => {
              haptics.trigger('impactLight');
              initializeGame('LOCAL');
              navigation.navigate('Game');
            }}
          />
        </View>
        <View style={styles.modeRow}>
          <StatusChip label="Solo: IA Tactique" />
          <StatusChip label="Local: Duel" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.gutter,
    paddingTop: spacing.gutter,
    gap: spacing.gutter,
  },
  heroContainer: {
    height: 220,
    borderRadius: rounded.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    backgroundColor: colors.ebonyDeep,
  },
  hero: {
    width: '100%',
    height: '100%',
    opacity: 0.6,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    padding: spacing.gutter,
    gap: 4,
  },
  heroOverlayBg: {
    backgroundColor: 'rgba(0,0,0,0.25)'
  },
  heroTitle: {
    ...typography.headlineXl,
    fontSize: 48,
    lineHeight: 52,
    letterSpacing: 4,
  },
  card: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: rounded.xl,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    padding: spacing.gutter,
    gap: 12,
  },
  cardTitle: {
    ...typography.headlineLgMobile,
    letterSpacing: 0,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 4,
  },
  modeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.unit,
    marginTop: spacing.unit,
  },
});
