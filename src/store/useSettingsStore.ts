import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { AvatarIndex } from '../assets/avatars';

export interface SettingsState {
  nickname: string;
  avatarIndex: AvatarIndex;
  hapticsEnabled: boolean;
  soundsEnabled: boolean;
  showMoveHints: boolean;
  reduceMotion: boolean;

  cycleAvatar: () => void;
  setNickname: (nickname: string) => void;
  toggleHaptics: () => void;
  toggleSounds: () => void;
  toggleShowMoveHints: () => void;
  toggleReduceMotion: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      nickname: 'Vous',
      avatarIndex: 1,
      hapticsEnabled: true,
      soundsEnabled: true,
      showMoveHints: true,
      reduceMotion: false,

      cycleAvatar: () =>
        set((s) => ({
          avatarIndex: ((s.avatarIndex + 1) % 9) as AvatarIndex,
        })),
      setNickname: (nickname: string) => set({ nickname }),
      toggleHaptics: () => set((s) => ({ hapticsEnabled: !s.hapticsEnabled })),
      toggleSounds: () => set((s) => ({ soundsEnabled: !s.soundsEnabled })),
      toggleShowMoveHints: () => set((s) => ({ showMoveHints: !s.showMoveHints })),
      toggleReduceMotion: () => set((s) => ({ reduceMotion: !s.reduceMotion })),
    }),
    {
      name: 'songo.settings',
      version: 1,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (s) => ({
        nickname: s.nickname,
        avatarIndex: s.avatarIndex,
        hapticsEnabled: s.hapticsEnabled,
        soundsEnabled: s.soundsEnabled,
        showMoveHints: s.showMoveHints,
        reduceMotion: s.reduceMotion,
      }),
    }
  )
);
