import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { Text } from './typography/Text';
import { AVATARS } from '../assets/avatars';
import { useSettingsStore } from '../store/useSettingsStore';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { useUserStatsStore } from '../store/useUserStatsStore';

export type TopAppBarVariant = 'home' | 'game' | 'learn' | 'profile' | 'settings';

interface TopAppBarProps {
  variant?: TopAppBarVariant;
  matchId?: string;
  timeRemaining?: string;
}

export function TopAppBar({ variant = 'home', matchId = '#7821-X', timeRemaining = '14:28' }: TopAppBarProps) {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const avatarIndex = useSettingsStore((s) => s.avatarIndex);
  const nickname = useSettingsStore((s) => s.nickname);
  const seedsCapturedTotal = useUserStatsStore((s) => s.seedsCapturedTotal);

  const levelLabel =
    seedsCapturedTotal >= 400 ? 'GRANDMASTER' : seedsCapturedTotal >= 200 ? 'MASTER LEVEL' : seedsCapturedTotal >= 50 ? 'APPRENTICE' : 'NOVICE';

  const renderHome = () => (
    <>
      <View style={styles.profileSection}>
        <View style={styles.avatarContainer}>
          <Image
            source={AVATARS[avatarIndex]}
            style={styles.avatar}
          />
        </View>
        <Text style={styles.levelText}>{levelLabel}</Text>
      </View>
      <Text style={styles.titleCenter}>SONGO</Text>
      <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Settings')}>
        <MaterialIcons name="settings" size={24} color={colors.tacticalGold} />
      </TouchableOpacity>
    </>
  );

  const renderGame = () => (
    <>
      <View style={styles.profileSection}>
        <View style={styles.avatarContainer}>
          <Image
            source={AVATARS[avatarIndex]}
            style={styles.avatar}
          />
        </View>
        <View style={styles.gameTitleCol}>
          <Text style={styles.gameTitle}>SONGO</Text>
          <Text style={styles.gameMatchId}>MATCH ID: {matchId}</Text>
        </View>
      </View>
      <View style={styles.gameRightCol}>
        <View style={styles.timeContainer}>
          <Text style={styles.timeLabel} numberOfLines={1} adjustsFontSizeToFit>Time Remaining</Text>
          <Text style={styles.timeValue} numberOfLines={1} adjustsFontSizeToFit>{timeRemaining}</Text>
        </View>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Settings')}>
          <MaterialIcons name="settings" size={24} color={colors.tacticalGold} />
        </TouchableOpacity>
      </View>
    </>
  );

  const renderLearn = () => (
    <>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <MaterialIcons name="arrow-back" size={20} color={colors.tacticalGold} style={styles.backIcon} />
        <Text style={styles.backText}>BACK TO HOME</Text>
      </TouchableOpacity>
      <Text style={styles.titleCenter}>SONGO</Text>
      <View style={styles.personIconContainer}>
        <MaterialIcons name="person" size={20} color={colors.tacticalGold} />
      </View>
    </>
  );

  const renderProfile = () => (
    <>
      <Text style={styles.titleLeft}>PROFIL & SUCCÈS</Text>
      <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Settings')}>
        <MaterialIcons name="settings" size={24} color={colors.tacticalGold} />
      </TouchableOpacity>
    </>
  );

  const renderSettings = () => (
    <>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <MaterialIcons name="arrow-back" size={20} color={colors.tacticalGold} style={styles.backIcon} />
        <Text style={styles.backText}>BACK</Text>
      </TouchableOpacity>
      <View style={styles.settingsTitleCol}>
        <Text style={styles.titleLeft}>PARAMÈTRES</Text>
        <Text style={styles.settingsSubtitle} numberOfLines={1}>
          {nickname}
        </Text>
      </View>
      <View style={styles.personIconContainer}>
        <MaterialIcons name="tune" size={20} color={colors.tacticalGold} />
      </View>
    </>
  );

  return (
    <View style={[styles.header, { paddingTop: insets.top }]}>
      <View style={styles.content}>
        {variant === 'home' && renderHome()}
        {variant === 'game' && renderGame()}
        {variant === 'learn' && renderLearn()}
        {variant === 'profile' && renderProfile()}
        {variant === 'settings' && renderSettings()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.ebonyDeep,
    borderBottomWidth: 1,
    borderBottomColor: colors.mahoganyRich,
    shadowColor: colors.mahoganyRich,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
    zIndex: 50,
  },
  content: {
    height: 64, // h-16
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.marginMobile,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.tacticalGold,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.surfaceContainerLow,
  },
  levelText: {
    ...typography.labelTechnical,
    color: colors.tacticalGold,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  titleCenter: {
    ...typography.headlineLgMobile,
    color: colors.tacticalGold,
    textTransform: 'uppercase',
    letterSpacing: 4,
    fontSize: 24,
    textAlign: 'center',
  },
  titleLeft: {
    ...typography.headlineLgMobile,
    color: colors.tacticalGold,
    textTransform: 'uppercase',
    letterSpacing: 2,
    fontSize: 20,
  },
  iconButton: {
    padding: 8,
  },
  iconText: {
    fontSize: 20,
    color: colors.tacticalGold,
  },
  iconTextGold: {
    fontSize: 16,
    color: colors.tacticalGold,
  },
  gameTitleCol: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  gameTitle: {
    ...typography.headlineLgMobile,
    color: colors.tacticalGold,
    textTransform: 'uppercase',
    letterSpacing: 4,
    fontSize: 18,
    lineHeight: 18,
  },
  gameMatchId: {
    ...typography.labelTechnical,
    color: colors.onSurfaceVariant,
    fontSize: 10,
  },
  gameRightCol: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  timeContainer: {
    alignItems: 'flex-end',
  },
  timeLabel: {
    ...typography.labelTechnical,
    color: colors.onSurfaceVariant,
    fontSize: 10,
    textTransform: 'uppercase',
  },
  timeValue: {
    ...typography.statsDisplay,
    color: colors.tacticalGold,
    fontSize: 20,
    lineHeight: 24,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  backIcon: {
    marginRight: 8,
  },
  backText: {
    ...typography.labelTechnical,
    color: colors.tacticalGold,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  settingsTitleCol: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
  },
  settingsSubtitle: {
    ...typography.labelTechnical,
    color: colors.onSurfaceVariant,
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  personIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.mahoganyRich,
    backgroundColor: colors.surfaceContainer,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
