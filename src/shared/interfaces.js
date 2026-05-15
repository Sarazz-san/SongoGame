/**
 * CONTRAT entre modules – NE PAS MODIFIER sans validation du groupe
 * SongoGame – 5 modules
 */

// ===== GAME ENGINE =====
export const gameEngineContract = {
    // État
    getBoard: () => [[5,5,5,5,5,5,5], [5,5,5,5,5,5,5]],
    getCurrentPlayer: () => 0, // 0 = Sud, 1 = Nord
    getScores: () => [0, 0],

    // Actions
    playMove: (player, houseIndex) => ({
        success: true,
        newBoard: [[], []],
        nextPlayer: 1,
        scores: [0, 0],
        gameOver: false,
        winner: null
    }),

    // Validation
    isValidMove: (player, houseIndex) => true,

    // Fin de partie
    isGameOver: () => false,
    getWinner: () => null,
};

// ===== BOARD =====
export const boardContract = {
    BoardComponent: ({ board, currentPlayer, onHousePress }) => null,
};

// ===== TURN MANAGER =====
export const turnManagerContract = {
    getCurrentPlayer: () => 0,
    switchTurn: () => {},
        validateAndExecuteMove: (houseIndex) => ({
            valid: true,
            newBoard: [[], []],
            nextPlayer: 1,
            scores: [0, 0],
            gameOver: false
        }),
};

// ===== UI =====
export const uiContract = {
    MainScreen: ({ board, currentPlayer, scores, onHousePress, gameOver, winner, onNewGame }) => null,
};

// integration : pas de contrat
