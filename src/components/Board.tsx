import React from 'react';
import { StyleSheet, View } from 'react-native';
import { spacing } from '../theme/spacing';
import { Pit } from './Pit';

type Props = {
  board: number[]; // 14 pits
  currentPlayer: 'PLAYER_1' | 'PLAYER_2';
  onPressPit: (index: number) => void;
  isPitPlayable?: (index: number) => boolean;
  highlightedIndexes?: number[];
  perspectivePlayer?: 'PLAYER_1' | 'PLAYER_2';
  pitSize?: number;
  gap?: number;
};

const isPlayerPit = (player: 'PLAYER_1' | 'PLAYER_2', index: number) => {
  if (player === 'PLAYER_1') return index >= 0 && index <= 6;
  return index >= 7 && index <= 13;
};

export function Board({
  board,
  currentPlayer,
  onPressPit,
  perspectivePlayer = 'PLAYER_1',
  isPitPlayable,
  highlightedIndexes,
  pitSize,
  gap = spacing.boardGap,
}: Props) {
  const showPlayer2OnTop = perspectivePlayer === 'PLAYER_1';
  // Default (PLAYER_1 perspective): Top row: PLAYER_2 territory (7..13), Bottom: PLAYER_1 (0..6)
  // Flipped (PLAYER_2 perspective): Top row: PLAYER_1 (0..6), Bottom: PLAYER_2 (7..13)
  const topRow = showPlayer2OnTop ? board.slice(7, 14) : board.slice(0, 7);
  const bottomRow = showPlayer2OnTop ? board.slice(0, 7) : board.slice(7, 14);

  return (
    <View style={styles.container}>
      <View style={[styles.row, { gap }]}>
        {topRow.map((seeds, i) => {
          const index = showPlayer2OnTop ? 7 + i : i;
          const disabled = !isPlayerPit(currentPlayer, index);
          return (
            <View key={index} style={styles.cell}>
              <Pit
                index={index}
                seeds={seeds}
                size={pitSize}
                disabled={disabled}
                highlight={isPlayerPit(currentPlayer, index) && (isPitPlayable ? isPitPlayable(index) : seeds > 0)}
                selected={highlightedIndexes?.includes(index)}
                onPress={() => onPressPit(index)}
              />
            </View>
          );
        })}
      </View>
      <View style={[styles.row, { gap }]}>
        {bottomRow.map((seeds, i) => {
          const index = showPlayer2OnTop ? i : 7 + i;
          const disabled = !isPlayerPit(currentPlayer, index);
          return (
            <View key={index} style={styles.cell}>
              <Pit
                index={index}
                seeds={seeds}
                size={pitSize}
                disabled={disabled}
                highlight={isPlayerPit(currentPlayer, index) && (isPitPlayable ? isPitPlayable(index) : seeds > 0)}
                selected={highlightedIndexes?.includes(index)}
                onPress={() => onPressPit(index)}
              />
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: spacing.boardGap,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
  },
  cell: {
    flex: 0,
  },
});
