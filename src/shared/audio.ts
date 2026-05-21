import { haptics } from './haptics';
import { useSettingsStore } from '../store/useSettingsStore';

// Placeholder for audio manager until assets are available
// This could be updated to use react-native-sound or expo-av

export const audio = {
  playSowing() {
    // bruits de pierres/bois
    if (!useSettingsStore.getState().soundsEnabled) return;
    haptics.trigger('selection');
  },
  playCapture() {
    if (!useSettingsStore.getState().soundsEnabled) return;
    haptics.trigger('notificationSuccess');
  },
  playError() {
    if (!useSettingsStore.getState().soundsEnabled) return;
    haptics.trigger('notificationWarning');
  },
};
