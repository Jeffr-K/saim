/**
 * AsyncStorage 에 사용자의 온보딩 완료 상태를 저장하는 키
 * @constant
 * @type {string}
 * @description 이 키의 값으로 'true' 가 저장되면 온보딩을 완료한 것으로 처리합니다.
 * @example
 * // 값 저장하기
 * await AsyncStorage.setItem(ONBOARDING_STATUS_KEY, 'true');
 * @example
 * // 값 불러오기
 * const status = await AsyncStorage.getItem(ONBOARDING_STATUS_KEY);
 */
export const ONBOARDING_STATUS_KEY = '@app/onboardingComplete';