import type { Player } from './types';

export const BOARD_SIZE = 14;
export const PITS_PER_SIDE = 7;
export const INITIAL_SEEDS_PER_PIT = 5;
export const WIN_SCORE = 40;

export const playerTerritoryRange = (player: Player): [number, number] => {
  return player === 'PLAYER_1' ? [0, 6] : [7, 13];
};

export const opponentOf = (player: Player): Player => (player === 'PLAYER_1' ? 'PLAYER_2' : 'PLAYER_1');

export const isIndexInTerritory = (player: Player, index: number) => {
  const [start, end] = playerTerritoryRange(player);
  return index >= start && index <= end;
};

export const opponentLeftmostPitIndex = (player: Player) => {
  // "case n°1, celle la plus à votre gauche" in opponent territory.
  // With our indexing, left-to-right is increasing within each territory.
  // PLAYER_1 opponent is 7..13 => leftmost = 7
  // PLAYER_2 opponent is 0..6  => leftmost = 0
  return player === 'PLAYER_1' ? 7 : 0;
};

