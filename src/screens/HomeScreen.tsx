import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '../theme/colors';
import { spacing, rounded } from '../theme/spacing';
import { typography } from '../theme/typography';
import { useGameStore } from '../store/useGameStore';
import { PrimaryButton } from '../components/buttons/PrimaryButton';
import { Text } from '../components/typography/Text';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { StatusChip } from '../components/chips/StatusChip';
import { haptics } from '../shared/haptics';

export function HomeScreen() {
  const initializeGame = useGameStore((s) => s.initializeGame);
  const navigation = useNavigation();
  const rootNavigation = navigation.getParent<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="header">SONGO</Text>
        <Text variant="body">L’Art de la Stratégie Pure</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle} variant="header" color={colors.onSurface}>
          Partie Rapide
        </Text>
        <Text variant="body">Affrontez l’IA (à venir) ou jouez localement.</Text>
        <View style={styles.actions}>
          <PrimaryButton
            title="SOLO"
            onPress={() => {
              haptics.trigger('impactLight');
              initializeGame('SOLO');
              rootNavigation?.navigate('Game');
            }}
          />
          <PrimaryButton
            title="LOCAL"
            onPress={() => {
              haptics.trigger('impactLight');
              initializeGame('LOCAL');
              rootNavigation?.navigate('Game');
            }}
          />
        </View>
        <View style={styles.modeRow}>
          <StatusChip label="Solo: IA random" />
          <StatusChip label="Local: 2 joueurs" />
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
  header: {
    gap: 8,
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
