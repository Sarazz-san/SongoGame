import React from 'react';
import { Image, Pressable, StyleSheet, Switch, TextInput, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AVATARS } from '../assets/avatars';
import { StatusChip } from '../components/chips/StatusChip';
import { TopAppBar } from '../components/TopAppBar';
import { Text } from '../components/typography/Text';
import type { RootStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';
import { rounded, spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { haptics } from '../shared/haptics';
import { useSettingsStore } from '../store/useSettingsStore';

type Props = NativeStackScreenProps<RootStackParamList, 'Settings'>;

export function SettingsScreen({ navigation }: Props) {
  const nickname = useSettingsStore((s) => s.nickname);
  const avatarIndex = useSettingsStore((s) => s.avatarIndex);
  const cycleAvatar = useSettingsStore((s) => s.cycleAvatar);
  const setNickname = useSettingsStore((s) => s.setNickname);
  const hapticsEnabled = useSettingsStore((s) => s.hapticsEnabled);
  const soundsEnabled = useSettingsStore((s) => s.soundsEnabled);
  const showMoveHints = useSettingsStore((s) => s.showMoveHints);
  const reduceMotion = useSettingsStore((s) => s.reduceMotion);
  const toggleHaptics = useSettingsStore((s) => s.toggleHaptics);
  const toggleSounds = useSettingsStore((s) => s.toggleSounds);
  const toggleShowMoveHints = useSettingsStore((s) => s.toggleShowMoveHints);
  const toggleReduceMotion = useSettingsStore((s) => s.toggleReduceMotion);

  return (
    <View style={styles.screen}>
      <TopAppBar variant="settings" />
      <View style={styles.container}>
        <View style={styles.section}>
          <Text variant="tech" style={styles.sectionTitle}>
            Profil
          </Text>

          <View style={styles.profileRow}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Changer photo de profil"
              onPress={() => {
                haptics.trigger('selection');
                cycleAvatar();
              }}
              style={styles.avatarRing}
            >
              <Image source={AVATARS[avatarIndex]} style={styles.avatar} />
            </Pressable>

            <View style={styles.profileCol}>
              <Text variant="body" color={colors.onSurface}>
                Pseudo
              </Text>
              <TextInput
                value={nickname}
                onChangeText={setNickname}
                placeholder="Votre pseudo"
                placeholderTextColor={colors.onSurfaceVariant}
                style={styles.input}
                selectionColor={colors.tacticalGold}
                autoCapitalize="words"
                autoCorrect={false}
                maxLength={18}
                returnKeyType="done"
              />
              <View style={styles.hintRow}>
                <StatusChip label="Tap avatar pour changer" />
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text variant="tech" style={styles.sectionTitle}>
            Préférences
          </Text>

          <SettingToggle
            label="Vibrations"
            value={hapticsEnabled}
            onValueChange={() => {
              haptics.trigger('impactLight');
              toggleHaptics();
            }}
          />
          <SettingToggle
            label="Sons"
            value={soundsEnabled}
            onValueChange={() => {
              haptics.trigger('impactLight');
              toggleSounds();
            }}
          />
          <SettingToggle
            label="Aides visuelles"
            value={showMoveHints}
            onValueChange={() => {
              haptics.trigger('impactLight');
              toggleShowMoveHints();
            }}
          />
          <SettingToggle
            label="Réduire animations"
            value={reduceMotion}
            onValueChange={() => {
              haptics.trigger('impactLight');
              toggleReduceMotion();
            }}
          />
        </View>

        <Pressable accessibilityRole="button" style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text variant="tech" color={colors.tacticalGold}>
            RETOUR
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

function SettingToggle({
  label,
  value,
  onValueChange,
}: {
  label: string;
  value: boolean;
  onValueChange: () => void;
}) {
  return (
    <View style={styles.toggleRow}>
      <Text variant="body" color={colors.onSurface} style={styles.toggleLabel}>
        {label}
      </Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: colors.surfaceContainerHigh, true: colors.primaryContainer }}
        thumbColor={value ? colors.tacticalGold : colors.onSurfaceVariant}
      />
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
  section: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: rounded.xl,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    padding: spacing.gutter,
    gap: spacing.unit * 2,
  },
  sectionTitle: {
    textTransform: 'uppercase',
    letterSpacing: 1.8,
    fontSize: 10,
    color: colors.onSurfaceVariant,
  },
  profileRow: {
    flexDirection: 'row',
    gap: spacing.gutter,
    alignItems: 'center',
  },
  avatarRing: {
    width: 84,
    height: 84,
    borderRadius: 42,
    borderWidth: 2,
    borderColor: colors.tacticalGold,
    overflow: 'hidden',
    backgroundColor: colors.ebonyDeep,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  profileCol: {
    flex: 1,
    gap: 8,
  },
  input: {
    ...typography.bodyMd,
    color: colors.onSurface,
    backgroundColor: colors.ebonyDeep,
    borderRadius: rounded.lg,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  hintRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.unit,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.unit * 2,
    paddingVertical: 6,
    borderTopWidth: 1,
    borderTopColor: colors.outlineVariant,
  },
  toggleLabel: {
    flex: 1,
  },
  backButton: {
    alignSelf: 'center',
    paddingVertical: 10,
  },
});

