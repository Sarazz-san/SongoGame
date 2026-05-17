import { Platform } from 'react-native';

// Fallback to system serif/sans if custom fonts aren't available locally.
const systemSerif = Platform.select({ ios: 'Times New Roman', android: 'serif' });
const systemSans = Platform.select({ ios: 'System', android: 'sans-serif' });
const systemMono = Platform.select({ ios: 'JetBrains Mono', android: 'JetBrainsMono-Regular' }) || Platform.select({ ios: 'Courier', android: 'monospace' });

export const typography = {
  headlineXl: {
    fontFamily: systemSerif,
    fontWeight: '700' as const,
    fontSize: 48,
    lineHeight: 56,
    letterSpacing: 2,
  },
  headlineLg: {
    fontFamily: systemSerif,
    fontWeight: '600' as const,
    fontSize: 32,
    lineHeight: 40,
  },
  headlineLgMobile: {
    fontFamily: systemSerif,
    fontWeight: '600' as const,
    fontSize: 28,
    lineHeight: 34,
  },
  bodyMd: {
    fontFamily: systemSans,
    fontSize: 16,
    lineHeight: 24,
  },
  statsDisplay: {
    fontFamily: systemSans,
    fontWeight: '700' as const,
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: 1.2,
  },
  labelTechnical: {
    fontFamily: systemMono,
    fontSize: 12,
    lineHeight: 16,
  },
};
