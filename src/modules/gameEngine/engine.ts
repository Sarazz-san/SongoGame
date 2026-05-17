import {
  BOARD_SIZE,
  INITIAL_SEEDS_PER_PIT,
  PITS_PER_SIDE,
  WIN_SCORE,
  isIndexInTerritory,
  opponentLeftmostPitIndex,
  opponentOf,
  playerTerritoryRange,
} from './constants';
import type { GameState, PlayMoveResult, Player } from './types';

export const createInitialState = (): GameState => ({
  board: Array(BOARD_SIZE).fill(INITIAL_SEEDS_PER_PIT),
  currentPlayer: 'PLAYER_1',
  scorePlayer1: 0,
  scorePlayer2: 0,
  gameStatus: 'PLAYING',
});

const cloneState = (state: GameState): GameState => ({
  ...state,
  board: [...state.board],
});

const playerScoreKey = (player: Player) => (player === 'PLAYER_1' ? 'scorePlayer1' : 'scorePlayer2') as const;

const sowingLoopOrder = (player: Player): number[] => {
  // Rule (clubawale): in your camp: right -> left; in opponent camp: left -> right.
  // Our indexing increases left -> right inside each camp.
  const [_ownStart, ownEnd] = playerTerritoryRange(player);
  const opponent = opponentOf(player);
  const [oppStart, _oppEnd] = playerTerritoryRange(opponent);

  const ownRightToLeft = Array.from({ length: PITS_PER_SIDE }, (_, i) => ownEnd - i);
  const oppLeftToRight = Array.from({ length: PITS_PER_SIDE }, (_, i) => oppStart + i);
  return [...ownRightToLeft, ...oppLeftToRight];
};

const nextIndexInLoop = (loop: number[], currentIndex: number) => {
  const pos = loop.indexOf(currentIndex);
  if (pos < 0) throw new Error(`Index ${currentIndex} not in loop`);
  return loop[(pos + 1) % loop.length];
};

const applySowing = (board: number[], player: Player, startIndex: number) => {
  const loop = sowingLoopOrder(player);
  const seedsPicked = board[startIndex];
  board[startIndex] = 0;

  let lastIndex = startIndex;
  if (seedsPicked <= 0) return { seedsPicked, lastIndex };

  if (seedsPicked <= 13) {
    let remaining = seedsPicked;
    while (remaining > 0) {
      lastIndex = nextIndexInLoop(loop, lastIndex);
      board[lastIndex] += 1;
      remaining -= 1;
    }
    return { seedsPicked, lastIndex };
  }

  // Special rule: if > 13, do a full tour without filling the starting pit,
  // then continue sowing exclusively in opponent camp from the left, repeating if needed.
  let remaining = seedsPicked;

  // Full tour without startIndex => 13 drops.
  for (let i = 0; i < BOARD_SIZE - 1 && remaining > 0; i++) {
    lastIndex = nextIndexInLoop(loop, lastIndex);
    if (lastIndex === startIndex) {
      // Defensive: loop includes startIndex, but this should only happen after 14 steps.
      lastIndex = nextIndexInLoop(loop, lastIndex);
    }
    board[lastIndex] += 1;
    remaining -= 1;
  }

  const opponent = opponentOf(player);
  const [oppStart, _oppEnd] = playerTerritoryRange(opponent);
  const oppLeftToRight = Array.from({ length: PITS_PER_SIDE }, (_, i) => oppStart + i);
  let pos = 0;
  while (remaining > 0) {
    const idx = oppLeftToRight[pos];
    board[idx] += 1;
    lastIndex = idx;
    remaining -= 1;
    pos = (pos + 1) % oppLeftToRight.length;
  }

  return { seedsPicked, lastIndex };
};

export const getSowingPath = (board: number[], player: Player, startIndex: number) => {
  const loop = sowingLoopOrder(player);
  const seedsPicked = board[startIndex];
  if (seedsPicked <= 0) return { seedsPicked: 0, path: [] as number[], lastIndex: startIndex };

  const path: number[] = [];
  let lastIndex = startIndex;

  if (seedsPicked <= 13) {
    let remaining = seedsPicked;
    while (remaining > 0) {
      lastIndex = nextIndexInLoop(loop, lastIndex);
      path.push(lastIndex);
      remaining -= 1;
    }
    return { seedsPicked, path, lastIndex };
  }

  // >13 special: 13 drops around the loop skipping startIndex, then remaining only in opponent territory from the left.
  let remaining = seedsPicked;
  for (let i = 0; i < BOARD_SIZE - 1 && remaining > 0; i++) {
    lastIndex = nextIndexInLoop(loop, lastIndex);
    if (lastIndex === startIndex) lastIndex = nextIndexInLoop(loop, lastIndex);
    path.push(lastIndex);
    remaining -= 1;
  }

  const opponent = opponentOf(player);
  const [oppStart] = playerTerritoryRange(opponent);
  const oppLeftToRight = Array.from({ length: PITS_PER_SIDE }, (_, i) => oppStart + i);
  let pos = 0;
  while (remaining > 0) {
    const idx = oppLeftToRight[pos];
    path.push(idx);
    lastIndex = idx;
    remaining -= 1;
    pos = (pos + 1) % oppLeftToRight.length;
  }

  return { seedsPicked, path, lastIndex };
};

const computeCapture = (board: number[], player: Player, lastIndex: number, seedsPicked: number) => {
  const opponent = opponentOf(player);
  if (!isIndexInTerritory(opponent, lastIndex)) return { captured: 0 };

  const oppLeftmost = opponentLeftmostPitIndex(player);

  // Special: if ending in opponent's first pit after at least one full tour => capture only 1 (last seed).
  // (clubawale gives examples 14,21,28,35... so we approximate by seedsPicked >= 14)
  if (lastIndex === oppLeftmost && seedsPicked >= BOARD_SIZE) {
    board[lastIndex] -= 1;
    return { captured: 1 };
  }

  // Base capture: last pit has 2..4 (meaning before landing had 1..3) and not opponent first pit.
  // If the chain capture reaches opponent first pit, it can be captured (nuance).
  const capturedIndexes: number[] = [];
  let idx = lastIndex;

  const canCaptureHere = (pitIndex: number) => {
    if (!isIndexInTerritory(opponent, pitIndex)) return false;
    const seeds = board[pitIndex];
    return seeds >= 2 && seeds <= 4;
  };

  if (!canCaptureHere(idx) || idx === oppLeftmost) return { captured: 0 };

  while (canCaptureHere(idx)) {
    capturedIndexes.push(idx);
    idx -= 1;
  }

  let captured = 0;
  for (const pitIndex of capturedIndexes) {
    captured += board[pitIndex];
    board[pitIndex] = 0;
  }
  return { captured };
};

const territorySeedsTotal = (board: number[], player: Player) => {
  const [start, end] = playerTerritoryRange(player);
  let sum = 0;
  for (let i = start; i <= end; i++) sum += board[i];
  return sum;
};

const canFeedOpponentAtLeast = (board: number[], player: Player, minSeedsToOpponent: number) => {
  const [ownStart, ownEnd] = playerTerritoryRange(player);
  const loop = sowingLoopOrder(player);
  const opponent = opponentOf(player);
  const [oppStart, oppEnd] = playerTerritoryRange(opponent);

  for (let startIndex = ownStart; startIndex <= ownEnd; startIndex++) {
    const seedsPicked = board[startIndex];
    if (seedsPicked <= 0) continue;

    // Simulate only sowing distribution target counts (fast approximation).
    // For <=13: count how many drops land in opponent territory.
    // For >13: after first tour, remaining goes exclusively to opponent.
    let opponentDrops = 0;
    if (seedsPicked > 13) {
      const firstTourDrops = Math.min(seedsPicked, BOARD_SIZE - 1);
      // In first tour, some drops might land in opponent territory; then remaining all in opponent.
      let remaining = seedsPicked;
      let last = startIndex;
      for (let i = 0; i < firstTourDrops; i++) {
        last = nextIndexInLoop(loop, last);
        if (last === startIndex) last = nextIndexInLoop(loop, last);
        if (last >= oppStart && last <= oppEnd) opponentDrops += 1;
        remaining -= 1;
      }
      opponentDrops += remaining; // exclusive opponent sowing
    } else {
      let remaining = seedsPicked;
      let last = startIndex;
      while (remaining > 0) {
        last = nextIndexInLoop(loop, last);
        if (last >= oppStart && last <= oppEnd) opponentDrops += 1;
        remaining -= 1;
      }
    }

    if (opponentDrops >= minSeedsToOpponent) return true;
  }
  return false;
};

const validateForbidden7Rule = (state: GameState, startIndex: number) => {
  // Interdit 1 (clubawale): forbidden to sow 1 or 2 seeds in opponent territory using your pit 7.
  // Here we interpret "case 7" as the rightmost pit of your camp.
  const player = state.currentPlayer;
  const [_ownStart, ownEnd] = playerTerritoryRange(player);
  const rightmostIndex = ownEnd;
  if (startIndex !== rightmostIndex) return { forbidden: false };
  const seeds = state.board[startIndex];
  if (seeds !== 1 && seeds !== 2) return { forbidden: false };
  return { forbidden: true, reason: 'Interdit: semer 1 ou 2 graines chez l’adversaire depuis la case 7.' };
};

export const isValidMove = (state: GameState, startIndex: number) => {
  if (state.gameStatus !== 'PLAYING') return { valid: false, reason: 'Partie terminée.' };
  const player = state.currentPlayer;
  if (!isIndexInTerritory(player, startIndex)) return { valid: false, reason: 'Case hors de votre territoire.' };
  if (state.board[startIndex] <= 0) return { valid: false, reason: 'Case vide.' };

  const forbidden7 = validateForbidden7Rule(state, startIndex);
  if (forbidden7.forbidden) return { valid: false, reason: forbidden7.reason };

  // Solidarity: if opponent territory empty, must feed at least 7 if possible, else maximum possible.
  const opponent = opponentOf(player);
  const opponentEmpty = territorySeedsTotal(state.board, opponent) === 0;
  if (opponentEmpty) {
    const canFeed7 = canFeedOpponentAtLeast(state.board, player, 7);
    if (canFeed7) {
      // Ensure chosen move feeds >=7 (precise simulation for this move).
      const simBoard = [...state.board];
      applySowing(simBoard, player, startIndex);
      // Count opponent seeds gained = opponent total after - before
      const before = territorySeedsTotal(state.board, opponent);
      const after = territorySeedsTotal(simBoard, opponent);
      const gained = after - before;
      if (gained < 7) return { valid: false, reason: 'Solidarité: vous devez nourrir l’adversaire (≥7 si possible).' };
    } else {
      // must play move that gives the maximum possible (we approximate by maximizing opponent drops)
      const [ownStart, ownEnd] = playerTerritoryRange(player);
      let bestGain = -1;
      let chosenGain = -1;
      for (let i = ownStart; i <= ownEnd; i++) {
        if (state.board[i] <= 0) continue;
        const sim = [...state.board];
        applySowing(sim, player, i);
        const gain = territorySeedsTotal(sim, opponent) - territorySeedsTotal(state.board, opponent);
        bestGain = Math.max(bestGain, gain);
        if (i === startIndex) chosenGain = gain;
      }
      if (chosenGain >= 0 && chosenGain < bestGain) {
        return { valid: false, reason: 'Solidarité: vous devez donner le maximum possible.' };
      }
    }
  }

  return { valid: true };
};

const finalizeIfGameOver = (state: GameState): GameState => {
  const totalSeedsOnBoard = state.board.reduce((a, b) => a + b, 0);
  if (state.scorePlayer1 >= WIN_SCORE || state.scorePlayer2 >= WIN_SCORE) {
    return { ...state, gameStatus: 'FINISHED' };
  }
  if (totalSeedsOnBoard < 10) {
    // Remaining seeds return to the owner territory.
    const p1Remaining = territorySeedsTotal(state.board, 'PLAYER_1');
    const p2Remaining = territorySeedsTotal(state.board, 'PLAYER_2');
    const next: GameState = {
      ...state,
      board: Array(BOARD_SIZE).fill(0),
      scorePlayer1: state.scorePlayer1 + p1Remaining,
      scorePlayer2: state.scorePlayer2 + p2Remaining,
    };
    if (next.scorePlayer1 >= WIN_SCORE || next.scorePlayer2 >= WIN_SCORE) return { ...next, gameStatus: 'FINISHED' };
    return { ...next, gameStatus: 'DRAW' };
  }
  return state;
};

export const playMove = (state: GameState, startIndex: number): PlayMoveResult => {
  const validation = isValidMove(state, startIndex);
  if (!validation.valid) return { success: false, error: validation.reason, state };

  const next = cloneState(state);
  const player = next.currentPlayer;
  const opponent = opponentOf(player);

  const { seedsPicked, lastIndex } = applySowing(next.board, player, startIndex);

  // Capture and scoring
  const preOpponentSeeds = territorySeedsTotal(next.board, opponent);
  const { captured } = computeCapture(next.board, player, lastIndex, seedsPicked);

  // Interdit 2: cannot empty opponent completely; if move empties opponent, no capture.
  // (clubawale: "Si jamais un coup susceptible de le faire est joué, aucune prise n’est faite.")
  const postOpponentSeeds = territorySeedsTotal(next.board, opponent);
  const emptiedOpponent = preOpponentSeeds > 0 && postOpponentSeeds === 0;
  let capturedThisMove = captured;
  if (emptiedOpponent && capturedThisMove > 0) {
    // revert capture: we don't have the captured pits anymore, so re-simulate without capture and keep sowing.
    const replay = [...state.board];
    applySowing(replay, player, startIndex);
    next.board = replay;
    capturedThisMove = 0;
  }

  if (capturedThisMove > 0) {
    const key = playerScoreKey(player);
    next[key] += capturedThisMove;
  }

  next.currentPlayer = opponent;
  const finalized = finalizeIfGameOver(next);
  return { success: true, state: finalized, lastLandingIndex: lastIndex, capturedThisMove };
};
