import { haptics } from './haptics';

// Placeholder for audio manager until assets are available
// This could be updated to use react-native-sound or expo-av

export const audio = {
  playSowing() {
    // bruits de pierres/bois
    haptics.trigger('selection');
  },
  playCapture() {
    haptics.trigger('notificationSuccess');
  },
  playError() {
    haptics.trigger('notificationWarning');
  },
};
