import { create } from 'zustand';
import { createInitialState, playMove as enginePlayMove, type GameState as EngineGameState } from '../modules/gameEngine';
import { pickRandomValidMove } from '../modules/bot/simpleBot';

export type Player = 'PLAYER_1' | 'PLAYER_2';

export interface GameState {
  mode: 'SOLO' | 'LOCAL';
  timeControlMinutes: number;
  turnThinkingMinutes: number;
  handoffAlreadyShown: boolean;
  matchId: string;
  winner: 'PLAYER_1' | 'PLAYER_2' | 'DRAW' | null;
  engineState: EngineGameState;
  error?: string;
  lastMoveIndex?: number;
  lastLandingIndex?: number;
  history: EngineGameState[];
  initializeGame: (mode?: 'SOLO' | 'LOCAL', config?: { timeControlMinutes?: number; turnThinkingMinutes?: number }) => void;
  playMove: (startIndex: number) => { success: boolean; capturedThisMove?: number; lastLandingIndex?: number };
  playBotMove: () => void;
  undo: () => void;
  surrender: () => void;
  markHandoffShown: () => void;
  forfeitTurn: () => void;
  endMatchOnTime: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  mode: 'LOCAL',
  timeControlMinutes: 30,
  turnThinkingMinutes: 3,
  handoffAlreadyShown: false,
  matchId: '#0000-X',
  winner: null,
  engineState: createInitialState(),
  error: undefined,
  lastMoveIndex: undefined,
  lastLandingIndex: undefined,
  history: [],

  initializeGame: (mode = 'LOCAL', config) =>
    set({
      mode,
      timeControlMinutes: config?.timeControlMinutes ?? 30,
      turnThinkingMinutes: config?.turnThinkingMinutes ?? 3,
      handoffAlreadyShown: false,
      matchId: `#${Math.floor(1000 + Math.random() * 9000)}-${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`,
      winner: null,
      engineState: createInitialState(),
      error: undefined,
      lastMoveIndex: undefined,
      lastLandingIndex: undefined,
      history: [],
    }),

  playMove: (startIndex: number) => {
    const current = get();
    const result = enginePlayMove(current.engineState, startIndex);
    if (!result.success) {
      set({ error: result.error ?? 'Coup invalide.' });
      return { success: false };
    }

    const nextWinner =
      result.state.gameStatus !== 'PLAYING'
        ? result.state.scorePlayer1 === result.state.scorePlayer2
          ? 'DRAW'
          : result.state.scorePlayer1 > result.state.scorePlayer2
            ? 'PLAYER_1'
            : 'PLAYER_2'
        : current.winner;

    set({
      history: [...current.history, current.engineState],
      engineState: result.state,
      error: undefined,
      lastMoveIndex: startIndex,
      lastLandingIndex: result.lastLandingIndex,
      winner: nextWinner ?? null,
    });
    return { success: true, capturedThisMove: result.capturedThisMove, lastLandingIndex: result.lastLandingIndex };
  },

  playBotMove: () =>
    set((current) => {
      if (current.mode !== 'SOLO') return current;
      if (current.engineState.gameStatus !== 'PLAYING') return current;
      if (current.engineState.currentPlayer !== 'PLAYER_2') return current;

      const move = pickRandomValidMove(current.engineState);
      if (move === null) return current;

      const result = enginePlayMove(current.engineState, move);
      if (!result.success) return { ...current, error: result.error ?? 'Coup IA invalide.' };
      return {
        ...current,
        history: [...current.history, current.engineState],
        engineState: result.state,
        error: undefined,
        lastMoveIndex: move,
        lastLandingIndex: result.lastLandingIndex,
      };
    }),

  undo: () =>
    set((current) => {
      if (current.history.length === 0) return current;
      const previous = current.history[current.history.length - 1];
      return {
        ...current,
        engineState: previous,
        history: current.history.slice(0, -1),
        error: undefined,
        lastMoveIndex: undefined,
        lastLandingIndex: undefined,
      };
    }),

  surrender: () =>
    set((current) => {
      const state = current.engineState;
      if (state.gameStatus !== 'PLAYING') return current;
      const winner = state.currentPlayer === 'PLAYER_1' ? 'PLAYER_2' : 'PLAYER_1';
      const next: EngineGameState = {
        ...state,
        gameStatus: 'FINISHED',
      };
      return { ...current, engineState: next, winner, error: undefined };
    }),

  markHandoffShown: () => set({ handoffAlreadyShown: true }),

  forfeitTurn: () =>
    set((current) => {
      const state = current.engineState;
      if (state.gameStatus !== 'PLAYING') return current;
      const nextPlayer = state.currentPlayer === 'PLAYER_1' ? 'PLAYER_2' : 'PLAYER_1';
      const next: EngineGameState = { ...state, currentPlayer: nextPlayer };
      return {
        ...current,
        history: [...current.history, current.engineState],
        engineState: next,
        error: undefined,
        lastMoveIndex: undefined,
        lastLandingIndex: undefined,
      };
    }),

  endMatchOnTime: () =>
    set((current) => {
      const state = current.engineState;
      if (state.gameStatus !== 'PLAYING') return current;
      const winner =
        state.scorePlayer1 === state.scorePlayer2 ? 'DRAW' : state.scorePlayer1 > state.scorePlayer2 ? 'PLAYER_1' : 'PLAYER_2';
      const next: EngineGameState = { ...state, gameStatus: winner === 'DRAW' ? 'DRAW' : 'FINISHED' };
      return { ...current, engineState: next, winner, error: undefined };
    }),
}));
