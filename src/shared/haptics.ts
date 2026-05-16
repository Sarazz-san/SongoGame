import { Platform } from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
} as const;

type HapticType =
  | 'selection'
  | 'impactLight'
  | 'impactMedium'
  | 'impactHeavy'
  | 'notificationSuccess'
  | 'notificationWarning'
  | 'notificationError';

const mapType = (type: HapticType) => {
  // Map to library names
  switch (type) {
    case 'selection':
      return 'selection';
    case 'impactLight':
      return 'impactLight';
    case 'impactMedium':
      return 'impactMedium';
    case 'impactHeavy':
      return 'impactHeavy';
    case 'notificationSuccess':
      return 'notificationSuccess';
    case 'notificationWarning':
      return 'notificationWarning';
    case 'notificationError':
      return 'notificationError';
  }
};

export const haptics = {
  trigger(type: HapticType) {
    try {
      if (Platform.OS !== 'ios' && Platform.OS !== 'android') return;
      ReactNativeHapticFeedback.trigger(mapType(type), options);
    } catch {
      // no-op: haptics must never crash the app
    }
  },
};

