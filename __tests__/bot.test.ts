import { createInitialState } from '../src/modules/gameEngine';
import { pickRandomValidMove } from '../src/modules/bot/simpleBot';

describe('simpleBot', () => {
  test('returns a valid move for current player when available', () => {
    const state = createInitialState();
    state.currentPlayer = 'PLAYER_1';
    const move = pickRandomValidMove(state);
    expect(move).not.toBeNull();
    expect(move!).toBeGreaterThanOrEqual(0);
    expect(move!).toBeLessThanOrEqual(6);
  });

  test('returns null when game is not playing', () => {
    const state = createInitialState();
    state.gameStatus = 'FINISHED';
    expect(pickRandomValidMove(state)).toBeNull();
  });
});

