import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../theme/colors';
import { rounded, spacing } from '../theme/spacing';
import { Text } from './typography/Text';

type Props = {
  rank: number;
  name: string;
  elo: number;
  isYou?: boolean;
};

export function RankingRow({ rank, name, elo, isYou }: Props) {
  return (
    <View style={[styles.row, isYou ? styles.youRow : null]}>
      <Text variant="tech" style={[styles.rank, isYou ? styles.youText : null]}>
        {String(rank).padStart(2, '0')}
      </Text>
      <View style={styles.nameCol}>
        <Text variant="body" color={isYou ? colors.tacticalGold : colors.onSurface} style={styles.name}>
          {isYou ? 'VOUS' : name}
        </Text>
      </View>
      <Text variant="tech" style={[styles.elo, isYou ? styles.youText : null]}>
        {elo}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.unit * 2,
    paddingVertical: spacing.unit * 1.5,
    paddingHorizontal: spacing.unit * 2,
    borderTopWidth: 1,
    borderTopColor: colors.outlineVariant,
  },
  youRow: {
    backgroundColor: colors.surfaceContainerHigh,
    borderRadius: rounded.lg,
    borderTopWidth: 0,
    marginVertical: spacing.unit,
  },
  rank: {
    width: 38,
    textAlign: 'left',
    color: colors.onSurfaceVariant,
    fontSize: 14,
  },
  nameCol: {
    flex: 1,
  },
  name: {
    color: colors.onSurface,
  },
  elo: {
    width: 70,
    textAlign: 'right',
    color: colors.onSurfaceVariant,
  },
  youText: {
    color: colors.tacticalGold,
  },
});

