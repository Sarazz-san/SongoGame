import React, { useState } from 'react';
import { StyleSheet, View, ImageBackground, TouchableOpacity, Modal, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '../theme/colors';
import { spacing, rounded } from '../theme/spacing';
import { typography } from '../theme/typography';
import { useGameStore } from '../store/useGameStore';
import { Text } from '../components/typography/Text';
import { RootStackParamList } from '../navigation/types';
import { haptics } from '../shared/haptics';
import { TopAppBar } from '../components/TopAppBar';

export function HomeScreen() {
  const initializeGame = useGameStore((s) => s.initializeGame);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMode, setSelectedMode] = useState<'SOLO' | 'LOCAL'>('SOLO');
  const [timeControl, setTimeControl] = useState(30); // minutes
  const [turnThinking, setTurnThinking] = useState(3); // minutes

  const openMatchConfig = (mode: 'SOLO' | 'LOCAL') => {
    haptics.trigger('impactLight');
    setSelectedMode(mode);
    setModalVisible(true);
  };

  const startMatch = () => {
    haptics.trigger('impactLight');
    setModalVisible(false);
    initializeGame(selectedMode, { timeControlMinutes: timeControl, turnThinkingMinutes: turnThinking });
    navigation.navigate('Game');
  };

  const renderModal = () => (
    <Modal visible={modalVisible} transparent animationType="fade" onRequestClose={() => setModalVisible(false)}>
      <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
        <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>CONFIGURATION</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.modalBody}>
            <Text style={styles.modalLabel}>Mode de jeu</Text>
            <View style={styles.toggleRow}>
              <TouchableOpacity
                style={[styles.toggleBtn, selectedMode === 'SOLO' && styles.toggleBtnActive]}
                onPress={() => setSelectedMode('SOLO')}
              >
                <Text style={[styles.toggleBtnText, selectedMode === 'SOLO' && styles.toggleBtnTextActive]}>SOLO (IA)</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.toggleBtn, selectedMode === 'LOCAL' && styles.toggleBtnActive]}
                onPress={() => setSelectedMode('LOCAL')}
              >
                <Text style={[styles.toggleBtnText, selectedMode === 'LOCAL' && styles.toggleBtnTextActive]}>LOCAL (PVP)</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.modalLabel}>Cadence (Minutes)</Text>
            <View style={styles.timeRow}>
              {[15, 30, 45, 60].map((t) => (
                <TouchableOpacity
                  key={t}
                  style={[styles.timeBtn, timeControl === t && styles.timeBtnActive]}
                  onPress={() => setTimeControl(t)}
                >
                  <Text style={[styles.timeBtnText, timeControl === t && styles.timeBtnTextActive]}>{t}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.modalLabel}>Temps de réflexion / tour (Minutes)</Text>
            <View style={styles.timeRow}>
              {[2, 3, 5, 10].map((m) => (
                <TouchableOpacity
                  key={m}
                  style={[styles.timeBtn, turnThinking === m && styles.timeBtnActive]}
                  onPress={() => setTurnThinking(m)}
                >
                  <Text style={[styles.timeBtnText, turnThinking === m && styles.timeBtnTextActive]}>{m}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity style={styles.modalStartBtn} onPress={startMatch}>
            <Text style={styles.modalStartBtnText}>JOUER</Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );

  return (
    <View style={styles.screen}>
      <TopAppBar variant="home" />
      <ImageBackground source={require('../assets/images/hero.png')} style={styles.background} resizeMode="cover">
        <View style={styles.overlay}>
          <View style={styles.content}>

            <View style={styles.textSection}>
              <View style={styles.heroBadge}>
                <Text style={styles.heroBadgeText}>HÉRITAGE CENTRAL AFRICAIN</Text>
              </View>
              <Text style={styles.heroTitle}>L'Art de la Stratégie Pure</Text>
              <Text style={styles.heroSubtitle}>
                Rejoignez l'élite du Songo. Maîtrisez les semailles, anticipez les captures et gravez votre nom dans l'histoire.
              </Text>
            </View>

            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <View>
                  <Text style={styles.lightningIcon}>⚡</Text>
                  <Text style={styles.cardTitle}>Partie Rapide</Text>
                </View>
                <TouchableOpacity style={styles.playIconButton} onPress={() => openMatchConfig('SOLO')}>
                  <Text style={styles.playTriangle}>▶</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.cardDesc}>
                Affrontez l’IA en solo ou défiez un ami en mode local sur le même écran.
              </Text>

              <View style={styles.actions}>
                <TouchableOpacity style={styles.actionButton} onPress={() => openMatchConfig('SOLO')}>
                  <Text style={styles.actionButtonText}>SOLO (IA)</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButtonDark} onPress={() => openMatchConfig('LOCAL')}>
                  <Text style={styles.actionButtonTextDark}>LOCAL (PVP)</Text>
                </TouchableOpacity>
              </View>
            </View>

          </View>
        </View>
      </ImageBackground>
      {renderModal()}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.ebonyDeep,
  },
  background: {
    flex: 1,
    width: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(24, 18, 16, 0.3)',
    justifyContent: 'flex-end',
  },
  content: {
    paddingHorizontal: spacing.gutter,
    paddingBottom: spacing.gutter * 1.5,
    gap: spacing.gutter * 1.5,
  },
  textSection: {
    gap: 12,
  },
  heroBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: rounded.full,
    borderWidth: 1,
    borderColor: colors.tacticalGold,
    marginBottom: 8,
  },
  heroBadgeText: {
    ...typography.labelTechnical,
    color: colors.tacticalGold,
  },
  heroTitle: {
    ...typography.headlineLg,
    color: colors.onSurface,
  },
  heroSubtitle: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
  },
  card: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: rounded.xl,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    padding: spacing.gutter,
    gap: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  lightningIcon: {
    fontSize: 24,
    color: colors.tacticalGold,
    marginBottom: 8,
  },
  cardTitle: {
    ...typography.headlineLgMobile,
    color: colors.tacticalGold,
  },
  playIconButton: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: 'rgba(208, 163, 95, 0.1)',
    borderWidth: 2,
    borderColor: 'rgba(208, 163, 95, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playTriangle: {
    fontSize: 24,
    color: 'rgba(208, 163, 95, 0.5)',
    marginLeft: 4,
  },
  cardDesc: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: colors.primaryContainer,
    borderRadius: rounded.md,
  },
  actionButtonText: {
    ...typography.labelTechnical,
    color: colors.ebonyDeep,
  },
  actionButtonDark: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: rounded.md,
  },
  actionButtonTextDark: {
    ...typography.labelTechnical,
    color: colors.tacticalGold,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    padding: spacing.gutter,
  },
  modalContent: {
    backgroundColor: colors.surfaceContainer,
    borderRadius: rounded.xl,
    borderWidth: 1,
    borderColor: colors.mahoganyRich,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.gutter,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceContainerHighest,
  },
  modalTitle: {
    ...typography.headlineLgMobile,
    fontSize: 20,
    color: colors.tacticalGold,
  },
  closeButton: {
    padding: 4,
  },
  closeButtonText: {
    fontSize: 24,
    color: colors.onSurfaceVariant,
  },
  modalBody: {
    padding: spacing.gutter,
    gap: 16,
  },
  modalLabel: {
    ...typography.labelTechnical,
    color: colors.onSurfaceVariant,
    marginTop: 8,
  },
  toggleRow: {
    flexDirection: 'row',
    backgroundColor: colors.ebonyDeep,
    borderRadius: rounded.md,
    padding: 4,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: rounded.sm,
  },
  toggleBtnActive: {
    backgroundColor: colors.surfaceContainerHighest,
  },
  toggleBtnText: {
    ...typography.labelTechnical,
    color: colors.onSurfaceVariant,
  },
  toggleBtnTextActive: {
    color: colors.tacticalGold,
  },
  timeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  timeBtn: {
    flex: 1,
    minWidth: 60,
    paddingVertical: 12,
    backgroundColor: colors.ebonyDeep,
    borderRadius: rounded.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  timeBtnActive: {
    backgroundColor: 'rgba(208, 163, 95, 0.1)',
    borderColor: colors.tacticalGold,
  },
  timeBtnText: {
    ...typography.statsDisplay,
    fontSize: 16,
    color: colors.onSurfaceVariant,
  },
  timeBtnTextActive: {
    color: colors.tacticalGold,
  },
  modalStartBtn: {
    backgroundColor: colors.primaryContainer,
    paddingVertical: 16,
    alignItems: 'center',
  },
  modalStartBtnText: {
    ...typography.labelTechnical,
    color: colors.ebonyDeep,
    fontSize: 16,
  },
});
