export type Player = 'PLAYER_1' | 'PLAYER_2';

export type GameStatus = 'PLAYING' | 'FINISHED' | 'DRAW';

export interface GameState {
  board: number[]; // 14 pits, 0..13
  currentPlayer: Player;
  scorePlayer1: number;
  scorePlayer2: number;
  gameStatus: GameStatus;
}

export interface PlayMoveResult {
  success: boolean;
  error?: string;
  state: GameState;
  lastLandingIndex?: number;
  capturedThisMove?: number;
}

