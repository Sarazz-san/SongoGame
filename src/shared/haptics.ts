import { NativeModules, Platform } from 'react-native';

const RNHapticFeedback = NativeModules.RNHapticFeedback;

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

export const haptics = {
  trigger(type: HapticType) {
    if (Platform.OS !== 'ios' && Platform.OS !== 'android') return;
    if (!RNHapticFeedback) return;

    try {
      // Use dynamic import or direct trigger if available
      RNHapticFeedback.trigger(type, options);
    } catch {
      // no-op
    }
  },
};

