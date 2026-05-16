import { createInitialState, playMove } from '../src/modules/gameEngine';

describe('gameEngine (Songo)', () => {
  test('sowing (PLAYER_1) stays in own camp right->left', () => {
    const state = createInitialState();
    state.board = Array(14).fill(1);
    state.board[6] = 5;

    const res = playMove(state, 6);
    expect(res.success).toBe(true);
    expect(res.lastLandingIndex).toBe(1);
    expect(res.state.board.slice(0, 7)).toEqual([1, 2, 2, 2, 2, 2, 0]);
    expect(res.state.board.slice(7)).toEqual([1, 1, 1, 1, 1, 1, 1]);
  });

  test('sowing (PLAYER_1) crosses to opponent left->right', () => {
    const state = createInitialState();
    state.board = Array(14).fill(0);
    // Keep ≥10 seeds on board to avoid early-end rule, but avoid captures.
    for (let i = 0; i <= 6; i++) state.board[i] = 1;
    state.board[1] = 5; // replaces the 1 at index 1

    const res = playMove(state, 1);
    expect(res.success).toBe(true);
    expect(res.lastLandingIndex).toBe(10);
    expect(res.state.board[0]).toBe(2);
    expect(res.state.board[7]).toBe(1);
    expect(res.state.board[8]).toBe(1);
    expect(res.state.board[9]).toBe(1);
    expect(res.state.board[10]).toBe(1);
  });

  test('capture is blocked on opponent leftmost pit (case 1) by default', () => {
    const state = createInitialState();
    state.board = Array(14).fill(1);
    state.board[0] = 1;
    state.board[7] = 1; // opponent leftmost for PLAYER_1

    const res = playMove(state, 0);
    expect(res.success).toBe(true);
    expect(res.lastLandingIndex).toBe(7);
    expect(res.capturedThisMove).toBe(0);
    expect(res.state.scorePlayer1).toBe(0);
    expect(res.state.board[7]).toBe(2);
  });

  test('capture occurs on opponent pits (2..4) and updates score', () => {
    const state = createInitialState();
    state.board = Array(14).fill(1);
    state.board[0] = 2; // will land on 7 then 8
    state.board[8] = 1; // becomes 2 => capture 2

    const res = playMove(state, 0);
    expect(res.success).toBe(true);
    expect(res.lastLandingIndex).toBe(8);
    // Chain capture captures pit 8 and then pit 7 (both become 2 after sowing) => 4
    expect(res.capturedThisMove).toBe(4);
    expect(res.state.scorePlayer1).toBe(4);
    expect(res.state.board[7]).toBe(0);
    expect(res.state.board[8]).toBe(0);
  });

  test('>13 seeds: skips start then continues exclusively in opponent from the left', () => {
    const state = createInitialState();
    state.board = Array(14).fill(1);
    state.board[6] = 14;

    const res = playMove(state, 6);
    expect(res.success).toBe(true);
    // After 13-drop tour: pits 5..0 and 7..13 get +1, start pit remains 0.
    // Remaining 1 seed goes to opponent from the left => pit 7.
    expect(res.state.board[6]).toBe(0);
    expect(res.state.board.slice(0, 6)).toEqual([2, 2, 2, 2, 2, 2]);
    // Special rule: ending on opponent leftmost after a full tour captures 1 seed.
    expect(res.state.board[7]).toBe(2);
    expect(res.state.scorePlayer1).toBe(1);
    expect(res.state.board[13]).toBe(2);
  });
});
