import { create } from 'zustand';
import { createInitialState, playMove as enginePlayMove, type GameState as EngineGameState } from '../modules/gameEngine';
import { pickRandomValidMove } from '../modules/bot/simpleBot';

export type Player = 'PLAYER_1' | 'PLAYER_2';

export interface GameState {
  mode: 'SOLO' | 'LOCAL';
  engineState: EngineGameState;
  error?: string;
  lastMoveIndex?: number;
  lastLandingIndex?: number;
  history: EngineGameState[];
  initializeGame: (mode?: 'SOLO' | 'LOCAL') => void;
  playMove: (startIndex: number) => void;
  playBotMove: () => void;
  undo: () => void;
  surrender: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  mode: 'LOCAL',
  engineState: createInitialState(),
  error: undefined,
  lastMoveIndex: undefined,
  lastLandingIndex: undefined,
  history: [],

  initializeGame: (mode = 'LOCAL') =>
    set({
      mode,
      engineState: createInitialState(),
      error: undefined,
      lastMoveIndex: undefined,
      lastLandingIndex: undefined,
      history: [],
    }),

  playMove: (startIndex: number) =>
    set((current) => {
      const result = enginePlayMove(current.engineState, startIndex);
      if (!result.success) return { ...current, error: result.error ?? 'Coup invalide.' };
      return {
        ...current,
        history: [...current.history, current.engineState],
        engineState: result.state,
        error: undefined,
        lastMoveIndex: startIndex,
        lastLandingIndex: result.lastLandingIndex,
      };
    }),

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
      const next: EngineGameState = {
        ...state,
        gameStatus: 'FINISHED',
        // Winner tracking UI will come later; for now we freeze the game.
      };
      return { ...current, engineState: next, error: undefined };
    }),
}));
