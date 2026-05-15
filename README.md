## 📄 README.md (SongoGame)


# SongoGame

Jeu de société traditionnel (Songo) sur mobile – React Native CLI.  
Deux joueurs, plateau 2×7 cases, semailles, prises, règles de solidarité.

---

## 🚀 Installation et premier lancement

```bash
git clone https://github.com/ton-compte/SongoGame.git
cd SongoGame
npm install
npx react-native start --reset-cache
```

**Second terminal :**
```bash
npx react-native run-android
```

> Appareil USB : `adb reverse tcp:8081 tcp:8081` avant `run-android`

---

## 📁 Structure et rôle des modules

### 🧠 `gameEngine`
**Rôle** : Logique métier complète du Songo.  
**Apport** : Contient l'état du plateau (2×7 cases, nombre de graines par case), les règles de distribution, les prises (chaîne), la solidarité, les interdits, et la détection de fin de partie.  
**Exporte** : `getBoard()`, `getScores()`, `playMove(player, houseIndex)`, `isValidMove()`, `isGameOver()`, `getWinner()`

### 🎨 `board`
**Rôle** : Affichage du plateau de jeu.  
**Apport** : Rend visible les 14 cases (2 lignes × 7 colonnes) avec le nombre de graines dans chacune. Met en évidence le joueur courant. Permet de cliquer sur une case pour jouer un coup.  
**Exporte** : `BoardComponent` (reçoit `board`, `currentPlayer`, `onHousePress`)

### 🔄 `turnManager`
**Rôle** : Gère l'alternance des joueurs et valide les coups avant exécution.  
**Apport** : S'assure qu'un joueur ne joue pas deux fois de suite, vérifie que la case choisie appartient bien au joueur courant, et appelle `gameEngine` pour exécuter le coup.  
**Exporte** : `getCurrentPlayer()`, `switchTurn()`, `validateAndExecuteMove(houseIndex)`

### 📊 `scoreDisplay`
**Rôle** : Affiche les scores des deux joueurs.  
**Apport** : Donne une visibilité immédiate sur les graines collectées. Se met à jour après chaque coup.  
**Exporte** : `ScoreComponent` (reçoit `scores`)

### 🔗 `integration` (lead)
**Rôle** : Assemble tous les modules dans l'écran principal.  
**Apport** : Branche `BoardComponent` avec `turnManager`, connecte `ScoreComponent` à `gameEngine`, et gère l'état global de la partie (en cours / terminée).  
**Exporte** : Rien – c'est le point d'entrée final (`App.js`)

---

## 🌿 Branches

| Module | Branche |
|--------|---------|
| `gameEngine` | `feat/game-engine` |
| `board` | `feat/board` |
| `turnManager` | `feat/turn-manager` |
| `scoreDisplay` | `feat/score-display` |
| `integration` | `feat/integration` |

```bash
git checkout feat/votre-module
```

---

## 🧪 Tester son module seul

Créer un mock dans `src/mocks/` pour simuler un autre module.

Exemple pour `board` qui a besoin de `gameEngine` :

```javascript
// src/mocks/mockGameEngine.js
export const mockGetBoard = () => [
  [5,5,5,5,5,5,5], // Sud
  [5,5,5,5,5,5,5]  // Nord
];
export const mockGetCurrentPlayer = () => 0;
```

---

## ⚠️ Règles d'or

1. Ne toucher qu'à `src/modules/son-module/`
2. Ne pas modifier `src/shared/interfaces.js` sans validation
3. Commits fréquents sur sa branche
4. Pas de merge sur `main` sans le lead

---

## 🔧 Dépendances (aucune pour l'instant – jeu 100% logique)

Aucune librairie externe nécessaire. Tout est en JavaScript pur.

---

## 📞 Problèmes fréquents

| Problème | Solution |
|----------|----------|
| Metro ne démarre pas | `npx react-native start --reset-cache` |
| `@react-native/metro-config` manquant | `npm install --save-dev @react-native/metro-config` |
| L'app plante | `npx react-native log-android` |
