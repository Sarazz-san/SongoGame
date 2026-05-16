import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { StatusChip } from '../components/chips/StatusChip';
import { Text } from '../components/typography/Text';
import { colors } from '../theme/colors';
import { rounded, spacing } from '../theme/spacing';
import { StatCard } from '../components/StatCard';
import { RankingRow } from '../components/RankingRow';

export function RankingsScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <Text variant="header">Mes Statistiques</Text>

      <View style={styles.statsRow}>
        <StatCard label="Win / Loss ratio" value="68%" />
        <StatCard label="Moyenne 'Krou'" value="14.2" />
      </View>
      <View style={styles.statsRow}>
        <StatCard label="Record capture" value="22" />
      </View>

      <View style={styles.sectionHeader}>
        <Text variant="header" style={styles.sectionTitle} color={colors.onSurface}>
          Classement Global
        </Text>
        <StatusChip label="Saison 4 : L’ÉVEIL" />
      </View>

      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text variant="tech" style={styles.th}>
            Rang
          </Text>
          <Text variant="tech" style={[styles.th, styles.thName]}>
            Joueur
          </Text>
          <Text variant="tech" style={[styles.th, styles.thElo]}>
            ELO
          </Text>
        </View>

        <RankingRow rank={1} name="Koffi_LeGrand" elo={2840} />
        <RankingRow rank={2} name="Nala_Songo" elo={2715} />
        <RankingRow rank={3} name="Mansa_M" elo={2690} />
        <RankingRow rank={42} name="VOUS" elo={1950} isYou />
        <RankingRow rank={4} name="Obi_Wan_Songo" elo={2580} />
      </View>

      <View style={styles.footer}>
        <StatusChip label="Afficher plus de joueurs" />
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
  statsRow: {
    flexDirection: 'row',
    gap: spacing.unit * 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.unit,
    marginTop: spacing.unit,
  },
  sectionTitle: {
    letterSpacing: 0,
  },
  table: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: rounded.xl,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    gap: spacing.unit * 2,
    paddingHorizontal: spacing.unit * 2,
    paddingVertical: spacing.unit * 1.5,
    backgroundColor: colors.surfaceContainer,
    borderBottomWidth: 1,
    borderBottomColor: colors.outlineVariant,
  },
  th: {
    width: 38,
    textTransform: 'uppercase',
    fontSize: 10,
    letterSpacing: 1.4,
    color: colors.onSurfaceVariant,
  },
  thName: {
    flex: 1,
    width: 'auto',
  },
  thElo: {
    width: 70,
    textAlign: 'right',
  },
  footer: {
    alignItems: 'center',
    paddingTop: spacing.unit,
  },
});
