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
import { audio } from '../shared/audio';
import { RootStackParamList } from '../navigation/types';
import { TopAppBar } from '../components/TopAppBar';
import { useSettingsStore } from '../store/useSettingsStore';
import { useUserStatsStore } from '../store/useUserStatsStore';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type Props = NativeStackScreenProps<RootStackParamList, 'Game'>;

const playerLabel = (p: 'PLAYER_1' | 'PLAYER_2', nickname: string) => (p === 'PLAYER_1' ? nickname : 'Adversaire');
const rankLabelFromCaptured = (captured: number) =>
  captured >= 40 ? 'Grandmaster' : captured >= 25 ? 'Master' : captured >= 10 ? 'Apprentice' : 'Novice';

export function GameScreen({ navigation }: Props) {
  const { width } = useWindowDimensions();
  const nickname = useSettingsStore((s) => s.nickname);
  const showMoveHints = useSettingsStore((s) => s.showMoveHints);
  const reduceMotion = useSettingsStore((s) => s.reduceMotion);
  const recordGameFinished = useUserStatsStore((s) => s.recordGameFinished);
  const touchActive = useUserStatsStore((s) => s.touchActive);

  const engineState = useGameStore((s) => s.engineState);
  const error = useGameStore((s) => s.error);
  const playMove = useGameStore((s) => s.playMove);
  const initializeGame = useGameStore((s) => s.initializeGame);
  const matchId = useGameStore((s) => s.matchId);
  const timeControlMinutes = useGameStore((s) => s.timeControlMinutes);
  const turnThinkingMinutes = useGameStore((s) => s.turnThinkingMinutes);
  const lastMoveIndex = useGameStore((s) => s.lastMoveIndex);
  const lastLandingIndex = useGameStore((s) => s.lastLandingIndex);
  const undo = useGameStore((s) => s.undo);
  const surrender = useGameStore((s) => s.surrender);
  const forfeitTurn = useGameStore((s) => s.forfeitTurn);
  const endMatchOnTime = useGameStore((s) => s.endMatchOnTime);
  const history = useGameStore((s) => s.history);
  const mode = useGameStore((s) => s.mode);
  const playBotMove = useGameStore((s) => s.playBotMove);
  const handoffAlreadyShown = useGameStore((s) => s.handoffAlreadyShown);
  const markHandoffShown = useGameStore((s) => s.markHandoffShown);

  const { board, currentPlayer, scorePlayer1, scorePlayer2, gameStatus } = engineState;
  const highlighted = [lastMoveIndex, lastLandingIndex].filter((v): v is number => typeof v === 'number');
  const [animatingPit, setAnimatingPit] = React.useState<number | null>(null);
  const [isAnimating, setIsAnimating] = React.useState(false);
  const [handoffVisible, setHandoffVisible] = React.useState(false);
  const prevPlayerRef = React.useRef(engineState.currentPlayer);

  const [remainingSeconds, setRemainingSeconds] = React.useState(timeControlMinutes * 60);
  const [turnRemainingSeconds, setTurnRemainingSeconds] = React.useState(turnThinkingMinutes * 60);
  React.useEffect(() => {
    // Reset both timers only when a new match starts (matchId changes), or when cadence changes explicitly.
    setRemainingSeconds(timeControlMinutes * 60);
  }, [matchId, timeControlMinutes]);

  React.useEffect(() => {
    // Turn timer is allowed to change if the per-turn setting changes.
    setTurnRemainingSeconds(turnThinkingMinutes * 60);
  }, [matchId, turnThinkingMinutes]);

  React.useEffect(() => {
    // Reset the per-turn timer whenever the player changes (new turn).
    setTurnRemainingSeconds(turnThinkingMinutes * 60);
  }, [engineState.currentPlayer, turnThinkingMinutes]);

  React.useEffect(() => {
    if (engineState.gameStatus !== 'PLAYING') return;
    if (handoffVisible) return;
    const id = setInterval(() => {
      setRemainingSeconds((s) => Math.max(0, s - 1));
      setTurnRemainingSeconds((s) => Math.max(0, s - 1));
    }, 1000);
    return () => clearInterval(id);
  }, [engineState.gameStatus, handoffVisible]);

  const timeRemainingText = React.useMemo(() => {
    const mm = Math.floor(remainingSeconds / 60);
    const ss = remainingSeconds % 60;
    return `${mm}:${String(ss).padStart(2, '0')}`;
  }, [remainingSeconds]);

  const turnTimeText = React.useMemo(() => {
    const mm = Math.floor(turnRemainingSeconds / 60);
    const ss = turnRemainingSeconds % 60;
    return `${mm}:${String(ss).padStart(2, '0')}`;
  }, [turnRemainingSeconds]);

  React.useEffect(() => {
    if (engineState.gameStatus !== 'PLAYING') return;
    if (turnRemainingSeconds > 0) return;
    // Time per turn: player loses the turn (no match end).
    audio.playError();
    haptics.trigger('notificationWarning');
    forfeitTurn();
  }, [engineState.gameStatus, forfeitTurn, turnRemainingSeconds]);

  React.useEffect(() => {
    if (engineState.gameStatus !== 'PLAYING') return;
    if (remainingSeconds > 0) return;
    // Global match time over: end match and decide winner by scores (or draw).
    audio.playError();
    haptics.trigger('notificationWarning');
    endMatchOnTime();
  }, [endMatchOnTime, engineState.gameStatus, remainingSeconds]);

  React.useEffect(() => {
    touchActive();
  }, [touchActive]);

  const prevStatusRef = React.useRef(engineState.gameStatus);
  React.useEffect(() => {
    const prev = prevStatusRef.current;
    const next = engineState.gameStatus;
    prevStatusRef.current = next;
    if (prev === 'PLAYING' && next !== 'PLAYING') {
      recordGameFinished(engineState.scorePlayer1);
    }
  }, [engineState.gameStatus, engineState.scorePlayer1, recordGameFinished]);

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
    if (!handoffAlreadyShown && prev !== next && history.length > 0) {
      setHandoffVisible(true);
      markHandoffShown();
    }
  }, [engineState.currentPlayer, engineState.gameStatus, handoffAlreadyShown, history.length, markHandoffShown, mode]);

  const handlePressPit = React.useCallback(
    (index: number) => {
      if (isAnimating) return;
      if (handoffVisible) return;
      const validation = isValidMove(engineState, index);
      if (!validation.valid) {
        audio.playError();
        playMove(index);
        return;
      }

      const { path } = getSowingPath(engineState.board, engineState.currentPlayer, index);
      if (path.length === 0) {
        audio.playError();
        playMove(index);
        return;
      }

      haptics.trigger('selection');
      setIsAnimating(true);
      let step = 0;
      setAnimatingPit(path[0]);
      audio.playSowing();

      const stepDelay = reduceMotion ? 20 : 60;
      const tick = () => {
        step += 1;
        if (step >= path.length) {
          setAnimatingPit(null);
          setIsAnimating(false);
          return;
        }
        setAnimatingPit(path[step]);
        audio.playSowing();
        setTimeout(tick, stepDelay);
      };

      // Apply the move immediately; animation is only a visual path-follow.
      const res: any = playMove(index);
      if ((res?.capturedThisMove ?? 0) > 0) {
        setTimeout(() => audio.playCapture(), path.length * stepDelay + 100);
      }
      setTimeout(tick, stepDelay);
    },
    [engineState, handoffVisible, isAnimating, playMove, reduceMotion]
  );

  const gap = Math.max(8, Math.min(12, width < 380 ? 8 : 12));
  const horizontalPadding = spacing.gutter * 2;
  const availableWidth = Math.max(0, width - horizontalPadding);
  const computedPitSize = Math.floor((availableWidth - gap * 6) / 7);
  const pitSize = Math.max(34, Math.min(60, computedPitSize));

  return (
    <View style={styles.screen}>
      <TopAppBar variant="game" matchId={matchId} timeRemaining={turnTimeText} />
      <View style={styles.container}>
        <View style={styles.topActionsRow}>
          <Pressable accessibilityRole="button" onPress={() => navigation.goBack()} style={styles.iconButton}>
            <MaterialIcons name="arrow-back" size={22} color={colors.tacticalGold} />
          </Pressable>
          <View style={styles.matchTimeChip}>
            <Text style={styles.matchTimeLabel}>MATCH</Text>
            <Text style={styles.matchTimeValue}>{timeRemainingText}</Text>
          </View>
          <Pressable
            accessibilityRole="button"
            onPress={() => initializeGame(mode, { timeControlMinutes, turnThinkingMinutes })}
            style={styles.iconButton}
          >
            <MaterialIcons name="refresh" size={22} color={colors.tacticalGold} />
          </Pressable>
        </View>

        <PlayerCard
          name="Adversaire"
          subtitle={rankLabelFromCaptured(scorePlayer2)}
          captured={scorePlayer2}
          active={currentPlayer === 'PLAYER_2'}
        />

        <View style={styles.turnCard}>
          <View style={styles.turnRow}>
            <StatusChip label={`Tour: ${playerLabel(currentPlayer, nickname)}`} />
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
            highlightedIndexes={showMoveHints ? [...highlighted, ...(animatingPit !== null ? [animatingPit] : [])] : []}
            isPitPlayable={(index) => (showMoveHints ? isValidMove(engineState, index).valid : true)}
            onPressPit={handlePressPit}
          />
        </View>

        <PlayerCard name={nickname} subtitle="Challenger" captured={scorePlayer1} active={currentPlayer === 'PLAYER_1'} />

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
                <StatusChip label={`Tour: ${playerLabel(engineState.currentPlayer, nickname)}`} />
                <StatusChip label="Tap pour continuer" />
              </View>
            </View>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing.gutter,
    paddingTop: spacing.gutter,
    gap: spacing.gutter,
  },
  topActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 4,
  },
  matchTimeChip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: rounded.sm,
    backgroundColor: colors.surfaceContainerLow,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    minWidth: 92,
    gap: 6,
  },
  matchTimeLabel: {
    ...typography.labelTechnical,
    color: colors.onSurfaceVariant,
    fontSize: 9,
    letterSpacing: 1.4,
    includeFontPadding: false,
  },
  matchTimeValue: {
    ...typography.statsDisplay,
    color: colors.tacticalGold,
    fontSize: 12,
    lineHeight: 16,
    includeFontPadding: false,
  },
  iconButton: {
    width: 38,
    height: 32,
    borderRadius: rounded.sm,
    backgroundColor: colors.surfaceContainerLow,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    alignItems: 'center',
    justifyContent: 'center',
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
