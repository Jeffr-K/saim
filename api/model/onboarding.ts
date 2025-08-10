export type OnboardingGoal = 'lose_weight' | 'gain_muscle' | 'stay_fit';
export type Occupation = 'student' | 'office_worker' | 'self_employed' | 'freelancer' | 'etc';
export type ReferralSource =
  | 'app_store'
  | 'friend'
  | 'instagram'
  | 'youtube'
  | 'search'
  | 'community'
  | 'etc';

export interface OnboardingState {
  email: string;
  username: string;
  heightCm: number | null;
  weightKg: number | null;
  goal: OnboardingGoal | null;
  occupation: Occupation | null;
  referral: ReferralSource | null;
}

export const createEmptyOnboardingState = (): OnboardingState => ({
  email: '',
  username: '',
  heightCm: null,
  weightKg: null,
  goal: null,
  occupation: null,
  referral: null,
});


