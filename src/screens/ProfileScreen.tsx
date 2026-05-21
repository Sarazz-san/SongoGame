import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StatusChip } from '../components/chips/StatusChip';
import { Text } from '../components/typography/Text';
import { colors } from '../theme/colors';
import { rounded, spacing } from '../theme/spacing';
import { PlayerCard } from '../components/PlayerCard';
import { TopAppBar } from '../components/TopAppBar';
import { useSettingsStore } from '../store/useSettingsStore';
import { StatCard } from '../components/StatCard';
import { useUserStatsStore } from '../store/useUserStatsStore';
import { useGameStore } from '../store/useGameStore';
import type { RootStackParamList } from '../navigation/types';
import { haptics } from '../shared/haptics';

export function ProfileScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const nickname = useSettingsStore((s) => s.nickname);
  const streakDays = useUserStatsStore((s) => s.streakDays);
  const gamesFinished = useUserStatsStore((s) => s.gamesFinished);
  const seedsCapturedTotal = useUserStatsStore((s) => s.seedsCapturedTotal);
  const dailyChallenge = useUserStatsStore((s) => s.dailyChallenge);
  const initializeGame = useGameStore((s) => s.initializeGame);
  const progressPercent = Math.min(100, Math.round((seedsCapturedTotal / 200) * 100));
  const levelLabel =
    seedsCapturedTotal >= 400 ? 'Grandmaster' : seedsCapturedTotal >= 200 ? 'Master Level' : seedsCapturedTotal >= 50 ? 'Apprentice' : 'Novice';
  return (
    <View style={styles.screen}>
      <TopAppBar variant="profile" />
      <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <PlayerCard name={nickname} subtitle={levelLabel} captured={seedsCapturedTotal} active />

        <View style={styles.statsRow}>
          <StatCard label="Streak (jours)" value={`${streakDays}`} />
          <StatCard label="Parties finies" value={`${gamesFinished}`} />
        </View>

        <View style={styles.card}>
          <Text variant="tech" style={styles.smallTitle}>
            Progression
          </Text>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
          </View>
          <Text variant="tech" style={styles.progressText}>
            {progressPercent}%
          </Text>
        </View>

        <View style={styles.card}>
          <Text variant="body" color={colors.onSurface}>
            Défi du Jour
          </Text>
          <Text variant="body">
            Capturez {dailyChallenge.targetSeeds} graines en moins de {dailyChallenge.maxMoves} coups.
          </Text>
          <View style={styles.ctaRow}>
            <StatusChip
              label="COMMENCER LE DÉFI"
              onPress={() => {
                haptics.trigger('impactLight');
                initializeGame('SOLO', { timeControlMinutes: 30, turnThinkingMinutes: 3 });
                navigation.navigate('Game');
              }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: spacing.gutter,
    paddingTop: spacing.gutter,
    paddingBottom: spacing.gutter * 2,
    gap: spacing.unit * 2,
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.unit * 2,
  },
  section: {
    gap: spacing.unit,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.unit,
  },
  card: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: rounded.xl,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    padding: spacing.gutter,
    gap: 10,
  },
  smallTitle: {
    textTransform: 'uppercase',
    fontSize: 10,
    letterSpacing: 1.5,
  },
  progressTrack: {
    height: 8,
    borderRadius: 9999,
    backgroundColor: colors.surfaceContainerHigh,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.tacticalGold,
  },
  progressText: {
    textAlign: 'right',
  },
  ctaRow: {
    alignItems: 'center',
  },
});
