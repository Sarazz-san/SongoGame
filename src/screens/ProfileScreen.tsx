import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { StatusChip } from '../components/chips/StatusChip';
import { Text } from '../components/typography/Text';
import { colors } from '../theme/colors';
import { rounded, spacing } from '../theme/spacing';
import { PlayerCard } from '../components/PlayerCard';

export function ProfileScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <Text variant="header">Profil & Succès</Text>
      <PlayerCard name="Vous" subtitle="Master Level" captured={32} active />

      <View style={styles.section}>
        <Text variant="body" color={colors.onSurface}>
          Trophées
        </Text>
        <View style={styles.chips}>
          <StatusChip label="🏆 10" />
          <StatusChip label="⚡ 4" />
          <StatusChip label="🧠 6" />
          <StatusChip label="+5" />
        </View>
      </View>

      <View style={styles.card}>
        <Text variant="tech" style={styles.smallTitle}>
          Progression
        </Text>
        <View style={styles.progressTrack}>
          <View style={styles.progressFill} />
        </View>
        <Text variant="tech" style={styles.progressText}>
          65%
        </Text>
      </View>

      <View style={styles.card}>
        <Text variant="body" color={colors.onSurface}>
          Défi du Jour
        </Text>
        <Text variant="body">Capturez 20 graines en moins de 10 coups.</Text>
        <View style={styles.ctaRow}>
          <StatusChip label="COMMENCER LE DÉFI" />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: spacing.gutter,
    paddingTop: spacing.gutter,
    paddingBottom: spacing.gutter * 2,
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
    width: '65%',
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
