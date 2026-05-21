import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type ISODate = string; // YYYY-MM-DD

const toISODate = (d: Date) => d.toISOString().slice(0, 10);

const addDays = (iso: ISODate, deltaDays: number) => {
  const dt = new Date(`${iso}T00:00:00.000Z`);
  dt.setUTCDate(dt.getUTCDate() + deltaDays);
  return toISODate(dt);
};

export interface UserStatsState {
  streakDays: number;
  lastActiveDate?: ISODate;
  gamesPlayed: number;
  gamesFinished: number;
  seedsCapturedTotal: number;
  dailyChallenge: { targetSeeds: number; maxMoves: number; key: ISODate };

  touchActive: (now?: Date) => void;
  recordGameFinished: (capturedByYou: number) => void;
}

export const useUserStatsStore = create<UserStatsState>()(
  persist(
    (set, get) => ({
      streakDays: 1,
      lastActiveDate: undefined,
      gamesPlayed: 0,
      gamesFinished: 0,
      seedsCapturedTotal: 0,
      dailyChallenge: { targetSeeds: 20, maxMoves: 10, key: toISODate(new Date()) },

      touchActive: (now = new Date()) => {
        const today = toISODate(now);
        const { lastActiveDate, streakDays } = get();

        const seed = today.split('-').reduce((a, v) => a + Number(v), 0);
        const targetSeeds = 14 + (seed % 17); // 14..30
        const maxMoves = 8 + (seed % 7); // 8..14

        if (!lastActiveDate) {
          set({ lastActiveDate: today, streakDays: 1, dailyChallenge: { targetSeeds, maxMoves, key: today } });
          return;
        }
        if (lastActiveDate === today) return;

        const yesterday = addDays(today, -1);
        if (lastActiveDate === yesterday) {
          set({
            lastActiveDate: today,
            streakDays: Math.max(1, streakDays + 1),
            dailyChallenge: { targetSeeds, maxMoves, key: today },
          });
          return;
        }
        set({ lastActiveDate: today, streakDays: 1, dailyChallenge: { targetSeeds, maxMoves, key: today } });
      },

      recordGameFinished: (capturedByYou: number) => {
        const current = get();
        set({
          gamesFinished: current.gamesFinished + 1,
          seedsCapturedTotal: current.seedsCapturedTotal + Math.max(0, capturedByYou),
        });
      },
    }),
    {
      name: 'songo.userStats',
      version: 1,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (s) => ({
        streakDays: s.streakDays,
        lastActiveDate: s.lastActiveDate,
        gamesPlayed: s.gamesPlayed,
        gamesFinished: s.gamesFinished,
        seedsCapturedTotal: s.seedsCapturedTotal,
        dailyChallenge: s.dailyChallenge,
      }),
    }
  )
);
