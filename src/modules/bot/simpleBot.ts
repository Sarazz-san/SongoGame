import { isValidMove, type GameState } from '../gameEngine';

export type BotStrategy = 'RANDOM_VALID';

const playerTerritoryIndexes = (player: 'PLAYER_1' | 'PLAYER_2') => (player === 'PLAYER_1' ? [0, 6] : [7, 13]);

export function pickRandomValidMove(state: GameState): number | null {
  if (state.gameStatus !== 'PLAYING') return null;

  const [start, end] = playerTerritoryIndexes(state.currentPlayer);
  const candidates: number[] = [];
  for (let i = start; i <= end; i++) {
    if (isValidMove(state, i).valid) candidates.push(i);
  }
  if (candidates.length === 0) return null;
  return candidates[Math.floor(Math.random() * candidates.length)];
}

