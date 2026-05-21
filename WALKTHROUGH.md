# Plan d'Action Exhaustif : Projet SongoGame (React Native)

Ce document est le **Walkthrough** officiel de l'application SongoGame. Il est conçu pour le travail en équipe : chaque membre peut consulter ce document, s'assigner une sous-tâche, créer sa branche (ex: `feature/2.3-capture-logic`), développer, tester, et une fois validé, cocher la case correspondante sur la branche principale (`main`).

L'objectif final de ce plan est de passer d'un dossier vide à un **APK fonctionnel et complet**.

---

## Phase 1 : Initialisation & Architecture de Base
*Objectif : Mettre en place les fondations du projet, le routage et le système de variables globales.*

- [x] **1.1 Initialisation du projet** : 
  - Création du projet React Native (React Native CLI).
  - Nettoyage des fichiers par défaut.
- [x] **1.2 Import des Assets** : 
  - Ajout des polices d'écriture (*EB Garamond, Metropolis, JetBrains Mono*).
  - Ajout des images et icônes (Hero banner du menu, icônes des actions, avatars placeholders).
- [x] **1.3 Configuration du Design System ("Songo Heritage")** :
  - Création du fichier `src/theme/colors.ts` (Ebony deep, Mahogany rich, Tactical gold, etc.).
  - Création du fichier `src/theme/typography.ts` (mapping des tailles et polices).
  - Création du fichier `src/theme/spacing.ts`.
- [x] **1.4 Configuration de la Navigation** :
  - Installation de `react-navigation`.
  - Création du `RootNavigator` (Stack Navigation) pour basculer entre le Menu Principal, le Plateau de Jeu, et les Règles.
- [x] **1.5 Mise en place du State Management** :
  - Configuration de Zustand (ou Redux Toolkit) pour l'état global (ex: `useGameStore`).

---

## Phase 2 : Moteur de Jeu (Logique du Songo)
*Objectif : Implémenter strictement les règles du jeu en TypeScript pur (indépendamment de l'UI).*
*Conseil : Développer cette partie en Test Driven Development (TDD) avec Jest.*

- [x] **2.1 Structure des données** : 
  - Modélisation du plateau (un tableau de 14 entiers, initialisés à 5).
  - Modélisation de l'état de la partie (`currentPlayer`, `scorePlayer1`, `scorePlayer2`, `gameStatus`).
- [x] **2.2 Logique de Distribution (Sowing)** : 
  - Algorithme de répartition des graines une à une, dans le sens inverse des aiguilles d'une montre.
  - Règle spéciale : si la case choisie a `> 13 graines`, sauter la case de départ lors du tour complet.
- [x] **2.3 Logique de Capture (Récolte)** : 
  - Vérification de la condition de base (fin dans le camp adverse, case finale a 2, 3 ou 4 graines).
  - Règle spéciale : Exclusion de la prise dans la première case de l'adversaire (sauf si prise en chaîne, ou graine unique après 1 tour complet).
  - Logique de "Prise à la chaîne" : reculer case par case et capturer tant que la condition est valide.
- [x] **2.4 Règles d'Interdits & Solidarité** : 
  - Interdit 1 : Empêcher de jouer 1 ou 2 graines depuis la case 7 chez l'adversaire.
  - Interdit 2 : Empêcher un coup qui vide complètement le camp adverse sans prise valide.
  - Solidarité : Imposer un coup qui donne au moins 7 graines à l'adversaire s'il est affamé (ou le max possible).
- [x] **2.5 Fin de partie** : 
  - Détection des victoires (un joueur atteint 40 graines).
  - Détection d'égalité (moins de 10 graines restantes sur le plateau ou aucun ne peut atteindre 40).
  - Arrêt si la solidarité est impossible.
- [x] **2.6 Tests Unitaires du Moteur** : 
  - Écriture des tests Jest pour valider tous les cas extrêmes et s'assurer que le moteur est infaillible.

---

## Phase 3 : Création des Composants UI
*Objectif : Transformer les maquettes Google Stitch en composants React Native réutilisables.*

- [x] **3.1 Composants de Typographie** : 
  - `Header` (EB Garamond), `BodyText` (Metropolis), `TechLabel` (JetBrains Mono).
- [x] **3.2 Boutons et Contrôles** : 
  - `PrimaryButton` (Fond Mahogany, bordure et texte Tactical Gold).
  - `StatusChip` (Capsule Ebony pour le statut/tour du joueur).
- [x] **3.3 Composant `Pit` (La Case)** : 
  - Conteneur rond avec `inner shadow` pour l'effet de profondeur.
  - État actif : glow doré autour de la case.
  - Affichage du nombre de graines en bas à droite (`TechLabel`).
- [x] **3.4 Composant `Seed` (La Graine)** : 
  - Rendu visuel d'une graine (formes arrondies, couleur `seed-ivory`).
- [x] **3.5 Composant `PlayerCard`** : 
  - Affichage de la photo de profil, nom, et le gros compteur de graines capturées.

---

## Phase 4 : Écran du Plateau de Jeu (Gameplay UI)
*Objectif : Connecter l'UI au Moteur de jeu pour rendre la partie jouable.*

- [x] **4.1 Layout du Plateau** : 
  - Intégration de 2 rangées de 7 `Pit` composantes.
  - Disposition du HUD (PlayerCard haut/bas, Header avec Timer).
- [x] **4.2 Connexion UI / State** : 
  - Mapping du tableau de 14 entiers (`useGameStore`) vers les 14 composants `Pit`.
  - Gestion des appuis sur les cases (déclencher la fonction Sowing du moteur).
- [x] **4.3 Animations de Base (Reanimated)** : 
  - Animation de transition du score (incrémentation visuelle).
  - Feedback visuel de sélection de case (Glow).
- [x] **4.4 Animations de Distribution (Avancé)** : 
  - Animation des graines volant d'une case à l'autre lors du tour (peut être simplifié dans un premier temps par une mise à jour rapide des chiffres, puis amélioré avec `react-native-reanimated`).
- [x] **4.5 Actions In-Game** : 
  - Câblage des boutons : "Undo" (Annuler), "Surrender" (Abandon).

---

## Phase 5 : Écrans de Navigation et Annexes
*Objectif : Habiller l'application autour du plateau de jeu.*

- [x] **5.1 Écran Menu Principal** : 
  - Layout hero image, titre "L'Art de la Stratégie Pure".
  - Implémentation de la Bottom Tab Navigation (Play, Learn, Rankings, Profile).
  - Liste des cartes (Partie Rapide, Apprendre, Classements, etc.).
- [x] **5.2 Écran Règles & Apprentissage** : 
  - Présentation textuelle et visuelle des règles (utilisation du contenu récupéré de clubawale.com).
- [x] **5.3 Profil & Statistiques (UI Visuelle)** : 
  - Affichage factice ou local du rang mondial et des trophées.

---

## Phase 6 : Fonctionnalités Avancées & Polissage
*Objectif : Rendre le jeu "Premium" comme demandé dans le DESIGN.md.*

- [x] **6.1 Mode IA Basique (Solo)** : 
  - Implémentation d'un bot très simple (Random valide ou Min-Max basique) pour le bouton "Partie Rapide" en solo.
- [x] **6.2 Mode Multijoueur Local** : 
  - Configuration de l'UI pour jouer à deux sur le même téléphone (rotation du plateau ou informations claires sur à qui le tour).
- [x] **6.3 Retours Haptiques (Vibrations)** : 
  - Utilisation de `expo-haptics` ou `react-native-haptic-feedback` lors du ramassage et de la pose des graines.
- [x] **6.4 Effets Sonores (Audio)** : 
  - Utilisation de `expo-av` ou `react-native-sound` pour des bruits de pierres/bois à chaque interaction.

---

## Phase 7 : Stabilisation & Tests
*Objectif : S'assurer que l'application est prête pour la production.*

- [x] **7.1 Responsive Design** : 
  - Vérification du rendu sur petits écrans et tablettes (ajustement du gap des cases).
- [x] **7.2 Débogage final** : 
  - Résolution des cas limites du moteur de jeu rencontrés lors du gameplay réel.
- [x] **7.3 Nettoyage du Code** : 
  - Vérification du linting (ESLint/Prettier), typage strict en TypeScript.

---

## Phase 8 : Build & Déploiement (Génération de l'APK)
*Objectif : Compiler l'application pour Android.*

- [x] **8.1 Assets Android** : 
  - Configuration de l'icône de l'application (Android mipmap).
  - Configuration du Splash Screen natif aux couleurs du Songo.
- [x] **8.2 Configuration du Keystore** : 
  - Génération d'une clé de signature release.
  - Configuration du fichier `android/app/build.gradle`.
- [x] **8.3 Génération de l'APK** : 
  - Lancement de la commande de build (`cd android && ./gradlew assembleRelease` pour RN CLI, ou `eas build -p android --profile production` pour Expo).
  - Test de l'APK généré sur un appareil physique.

---

**Comment utiliser ce plan dans votre workflow Git ?**
1. Un dev choisit une tâche non cochée, ex: `2.3 Logique de Capture`.
2. Il crée une branche : `git checkout -b feature/2.3-logique-capture`.
3. Il développe, passe les tests, et commit ses changements.
4. Il ouvre une Pull Request (PR) vers `main`.
5. Une fois la PR validée et fusionnée, il modifie ce fichier `WALKTHROUGH.md` pour cocher la case `[x] 2.3 Logique de Capture` et pousse sur `main`.
6. Le développeur suivant sait exactement ce qu'il reste à faire !
