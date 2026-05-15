/**
 * CONTRAT entre modules – NE PAS MODIFIER sans validation du groupe
 */

// ===== GAME ENGINE =====
// Cœur du jeu : règles, état du plateau, calcul des coups valides
export const gameEngineContract = {
    // État
    getBoard: () => [[0,0,0,0,0,0,0], [0,0,0,0,0,0,0]], // 2 lignes x 7 cases
    getCurrentPlayer: () => 0, // 0 = Sud, 1 = Nord (ou l'inverse)
    getScores: () => [0, 0],

    // Actions
    playMove: (player, houseIndex) => ({ success: true, newBoard, nextPlayer, scores, gameOver }),

    // Validation
    isValidMove: (player, houseIndex) => true,

    // Règles spéciales
    canApplySolidarity: () => true,

    // Fin de partie
    isGameOver: () => false,
    getWinner: () => null, // null, ou 0, ou 1
};

// ===== BOARD =====
// Affichage uniquement, pas de logique métier
export const boardContract = {
    BoardComponent: () => null, // Composant React
    // Props attendues : board (matrice 2x7), currentPlayer, onHousePress(houseIndex)
};

// ===== TURN MANAGER =====
// Gère l'alternance, valide que le coup est autorisé
export const turnManagerContract = {
    getCurrentPlayer: () => 0,
    switchTurn: () => {},
        validateAndExecuteMove: (houseIndex) => ({ valid: true, newBoard, nextPlayer, scores }),
};

// ===== SCORE DISPLAY =====
// Affiche juste les scores
export const scoreDisplayContract = {
    ScoreComponent: () => null, // Props : scores [joueurSud, joueurNord]
};

// integration : pas de contrat, c'est toi
