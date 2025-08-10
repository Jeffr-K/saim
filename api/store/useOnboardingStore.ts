import { create } from 'zustand';
import { OnboardingGoal, OnboardingState, createEmptyOnboardingState, Occupation, ReferralSource } from '@/api/model/onboarding';

interface OnboardingStore extends OnboardingState {
  setEmail: (email: string) => void;
  setUsername: (username: string) => void;
  setHeight: (heightCm: number | null) => void;
  setWeight: (weightKg: number | null) => void;
  setGoal: (goal: OnboardingGoal | null) => void;
  setOccupation: (occupation: Occupation | null) => void;
  setReferral: (referral: ReferralSource | null) => void;
  reset: () => void;
}

export const useOnboardingStore = create<OnboardingStore>((set) => ({
  ...createEmptyOnboardingState(),
  setEmail: (email) => set({ email }),
  setUsername: (username) => set({ username }),
  setHeight: (heightCm) => set({ heightCm }),
  setWeight: (weightKg) => set({ weightKg }),
  setGoal: (goal) => set({ goal }),
  setOccupation: (occupation) => set({ occupation }),
  setReferral: (referral) => set({ referral }),
  reset: () => set(createEmptyOnboardingState()),
}));


