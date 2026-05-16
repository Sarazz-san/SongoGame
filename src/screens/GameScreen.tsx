import React from 'react';
import { Pressable, StyleSheet, View, useWindowDimensions } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Board } from '../components/Board';
import { colors } from '../theme/colors';
import { spacing, rounded } from '../theme/spacing';
import { typography } from '../theme/typography';
import { useGameStore } from '../store/useGameStore';
import { PlayerCard } from '../components/PlayerCard';
import { StatusChip } from '../components/chips/StatusChip';
import { Text } from '../components/typography/Text';
import { getSowingPath, isValidMove } from '../modules/gameEngine';
import { PrimaryButton } from '../components/buttons/PrimaryButton';
import { haptics } from '../shared/haptics';

type RootStackParamList = {
  Home: undefined;
  Game: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Game'>;

const playerLabel = (p: 'PLAYER_1' | 'PLAYER_2') => (p === 'PLAYER_1' ? 'Vous' : 'Adversaire');

export function GameScreen({ navigation }: Props) {
  const { width } = useWindowDimensions();
  const { engineState, error, playMove, initializeGame, lastMoveIndex, lastLandingIndex, undo, surrender, history } =
    useGameStore((s) => ({
    engineState: s.engineState,
    error: s.error,
    playMove: s.playMove,
    initializeGame: s.initializeGame,
    lastMoveIndex: s.lastMoveIndex,
    lastLandingIndex: s.lastLandingIndex,
    undo: s.undo,
    surrender: s.surrender,
    history: s.history,
  }));
  const { mode, playBotMove } = useGameStore((s) => ({ mode: s.mode, playBotMove: s.playBotMove }));

  const { board, currentPlayer, scorePlayer1, scorePlayer2, gameStatus } = engineState;
  const highlighted = [lastMoveIndex, lastLandingIndex].filter((v): v is number => typeof v === 'number');
  const [animatingPit, setAnimatingPit] = React.useState<number | null>(null);
  const [isAnimating, setIsAnimating] = React.useState(false);
  const [handoffVisible, setHandoffVisible] = React.useState(false);
  const prevPlayerRef = React.useRef(engineState.currentPlayer);

  React.useEffect(() => {
    if (mode !== 'SOLO') return;
    if (engineState.gameStatus !== 'PLAYING') return;
    if (engineState.currentPlayer !== 'PLAYER_2') return;
    if (isAnimating) return;
    const id = setTimeout(() => playBotMove(), 350);
    return () => clearTimeout(id);
  }, [engineState.currentPlayer, engineState.gameStatus, isAnimating, mode, playBotMove]);

  React.useEffect(() => {
    if (mode !== 'LOCAL') {
      prevPlayerRef.current = engineState.currentPlayer;
      return;
    }
    if (engineState.gameStatus !== 'PLAYING') {
      prevPlayerRef.current = engineState.currentPlayer;
      setHandoffVisible(false);
      return;
    }

    const prev = prevPlayerRef.current;
    const next = engineState.currentPlayer;
    prevPlayerRef.current = next;
    if (prev !== next && history.length > 0) {
      setHandoffVisible(true);
    }
  }, [engineState.currentPlayer, engineState.gameStatus, history.length, mode]);

  const handlePressPit = React.useCallback(
    (index: number) => {
      if (isAnimating) return;
      if (handoffVisible) return;
      const validation = isValidMove(engineState, index);
      if (!validation.valid) {
        haptics.trigger('notificationWarning');
        playMove(index);
        return;
      }

      const { path } = getSowingPath(engineState.board, engineState.currentPlayer, index);
      if (path.length === 0) {
        haptics.trigger('notificationWarning');
        playMove(index);
        return;
      }

      haptics.trigger('selection');
      setIsAnimating(true);
      let step = 0;
      setAnimatingPit(path[0]);

      const tick = () => {
        step += 1;
        if (step >= path.length) {
          setAnimatingPit(null);
          setIsAnimating(false);
          return;
        }
        setAnimatingPit(path[step]);
        setTimeout(tick, 60);
      };

      // Apply the move immediately; animation is only a visual path-follow.
      playMove(index);
      setTimeout(tick, 60);
    },
    [engineState, handoffVisible, isAnimating, playMove]
  );

  const gap = Math.max(8, Math.min(12, width < 380 ? 8 : 12));
  const horizontalPadding = spacing.gutter * 2;
  const availableWidth = Math.max(0, width - horizontalPadding);
  const computedPitSize = Math.floor((availableWidth - gap * 6) / 7);
  const pitSize = Math.max(34, Math.min(60, computedPitSize));

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Pressable accessibilityRole="button" onPress={() => navigation.goBack()} style={styles.topButton}>
          <Text variant="tech" style={styles.topButtonText}>
            Retour
          </Text>
        </Pressable>
        <Text variant="header" style={styles.brand}>
          SONGO
        </Text>
        <Pressable
          accessibilityRole="button"
          onPress={() => {
            initializeGame();
          }}
          style={styles.topButton}
        >
          <Text variant="tech" style={styles.topButtonText}>
            Reset
          </Text>
        </Pressable>
      </View>

      <PlayerCard name="Adversaire" subtitle="Grandmaster" captured={scorePlayer2} active={currentPlayer === 'PLAYER_2'} />

      <View style={styles.turnCard}>
        <View style={styles.turnRow}>
          <StatusChip label={`Tour: ${playerLabel(currentPlayer)}`} />
          {gameStatus !== 'PLAYING' ? <StatusChip tone="warning" label={`Statut: ${gameStatus}`} /> : null}
        </View>
        {!!error && (
          <Text variant="body" color={colors.error} style={styles.errorText}>
            {error}
          </Text>
        )}
        {gameStatus !== 'PLAYING' && (
          <Text variant="body" style={styles.statusText}>
            Partie terminée.
          </Text>
        )}
      </View>

      <View style={styles.boardWrap}>
        <Board
          board={board}
          currentPlayer={currentPlayer}
          perspectivePlayer={mode === 'LOCAL' ? currentPlayer : 'PLAYER_1'}
          pitSize={pitSize}
          gap={gap}
          highlightedIndexes={[...highlighted, ...(animatingPit !== null ? [animatingPit] : [])]}
          isPitPlayable={(index) => isValidMove(engineState, index).valid}
          onPressPit={handlePressPit}
        />
      </View>

      <PlayerCard name="Vous" subtitle="Challenger" captured={scorePlayer1} active={currentPlayer === 'PLAYER_1'} />

      <View style={styles.actions}>
        <PrimaryButton
          title="UNDO"
          onPress={() => {
            haptics.trigger('impactLight');
            undo();
          }}
          disabled={history.length === 0 || gameStatus !== 'PLAYING' || isAnimating}
        />
        <PrimaryButton
          title="SURRENDER"
          onPress={() => {
            haptics.trigger('notificationWarning');
            surrender();
          }}
          disabled={gameStatus !== 'PLAYING' || isAnimating}
        />
      </View>

      {handoffVisible ? (
        <Pressable accessibilityRole="button" style={styles.handoffOverlay} onPress={() => setHandoffVisible(false)}>
          <View style={styles.handoffCard}>
            <Text variant="header" style={styles.handoffTitle}>
              Passation
            </Text>
            <Text variant="body" color={colors.onSurface}>
              Passe le téléphone au joueur suivant.
            </Text>
            <View style={styles.handoffRow}>
              <StatusChip label={`Tour: ${playerLabel(engineState.currentPlayer)}`} />
              <StatusChip label="Tap pour continuer" />
            </View>
          </View>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.gutter,
    paddingTop: spacing.gutter,
    gap: spacing.gutter,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brand: {
    ...typography.headlineLgMobile,
    letterSpacing: 3,
  },
  topButton: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: rounded.full,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    backgroundColor: colors.surfaceContainerLow,
  },
  topButtonText: {
    ...typography.labelTechnical,
    color: colors.onSurfaceVariant,
  },
  turnCard: {
    backgroundColor: colors.surfaceContainer,
    borderRadius: rounded.lg,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    padding: spacing.unit * 2,
    gap: 6,
  },
  turnRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.unit,
  },
  errorText: {
    ...typography.bodyMd,
  },
  statusText: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
  },
  boardWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.unit * 2,
    paddingBottom: spacing.unit * 2,
  },
  handoffOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.gutter,
  },
  handoffCard: {
    width: '100%',
    maxWidth: 520,
    backgroundColor: colors.surfaceContainer,
    borderRadius: rounded.xl,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    padding: spacing.gutter,
    gap: spacing.unit * 2,
  },
  handoffTitle: {
    letterSpacing: 0,
  },
  handoffRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.unit,
  },
});
