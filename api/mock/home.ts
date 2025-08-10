export type TodayWorkoutStatus = 'available' | 'done' | 'none';

export interface TodayWorkout {
  status: TodayWorkoutStatus;
  title?: string;
  subtitle?: string;
  estimatedMinutes?: number;
}

export interface RecentRecordItem {
  id: string;
  title: string;
  date: string; // ISO string
  durationMinutes: number;
}

export interface HomeData {
  today: TodayWorkout;
  recent: RecentRecordItem[];
}

export function fetchHomeMock(): Promise<HomeData> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        today: {
          status: 'none',
        },
        recent: [
          { id: '1', title: '상체 근력', date: new Date().toISOString(), durationMinutes: 28 },
          { id: '2', title: '하체 집중', date: new Date(Date.now() - 86400000).toISOString(), durationMinutes: 35 },
          { id: '3', title: '유산소 러닝', date: new Date(Date.now() - 2*86400000).toISOString(), durationMinutes: 20 },
        ],
      });
    }, 300);
  });
}


