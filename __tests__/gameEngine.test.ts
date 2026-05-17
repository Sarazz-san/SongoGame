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

  test('Solidarity rule: must feed opponent if they are empty', () => {
    const state = createInitialState();
    state.board = Array(14).fill(0);
    // Player 1: 0..6, Player 2: 7..13
    state.board[0] = 10; // Can feed 7 seeds to opponent (7..13)
    state.board[1] = 5;  // Can feed 5 seeds to opponent

    // If P2 is empty, P1 must play pit 0 (gives 7) instead of pit 1 (gives 5)
    const res1 = playMove(state, 1);
    expect(res1.success).toBe(false);
    expect(res1.error).toContain('Solidarité');

    const res0 = playMove(state, 0);
    expect(res0.success).toBe(true);
    const p2Total = res0.state.board.slice(7, 14).reduce((a, b) => a + b, 0);
    expect(p2Total).toBe(7);
  });

  test('Forbidden move: pit 7 with 1 or 2 seeds', () => {
    const state = createInitialState();
    state.board = Array(14).fill(5);
    state.board[6] = 2; // Pit 7 (index 6) for Player 1

    const res = playMove(state, 6);
    expect(res.success).toBe(false);
    expect(res.error).toContain('Interdit');
  });

  test('Grand Slam: cannot capture all seeds in opponent territory', () => {
    const state = createInitialState();
    state.board = Array(14).fill(0);
    // Add some seeds in own territory to stay > 10 total
    state.board[1] = 10;
    state.board[0] = 2; // Lands on 7 and 8
    state.board[7] = 2; // Becomes 3
    state.board[8] = 2; // Becomes 3
    // Opponent has only pits 7 and 8 with seeds. If we capture them, they are empty.
    // Total seeds on board = 10 + 0 (from 0) + 3 + 3 = 16 (>= 10)

    const res = playMove(state, 0);
    expect(res.success).toBe(true);
    expect(res.capturedThisMove).toBe(0); // Capture cancelled to avoid emptying opponent
    expect(res.state.scorePlayer1).toBe(0);
    expect(res.state.board[7]).toBe(3);
    expect(res.state.board[8]).toBe(3);
  });
});
