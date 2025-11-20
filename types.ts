export enum AppMode {
  STUDENT = 'student',
  WORK = 'work',
  HOME = 'home'
}

export enum ViewState {
  IDLE = 'idle',
  ACTIVE = 'active', // Pooping now
  LOGGING = 'logging', // Post-poop details
  SOCIAL = 'social',
  STATS = 'stats',
  MAP = 'map'
}

export interface PoopLog {
  id: string;
  startTime: number;
  endTime: number;
  durationSeconds: number;
  bristolType: number; // 1-7
  color: string;
  notes: string;
  aiAnalysis?: string;
  date: string;
}

export interface ToiletReview {
  id: string;
  locationName: string;
  rating: number;
  cleanliness: number;
  hasPaper: boolean;
  comment: string;
  timestamp: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai' | 'anon';
  text: string;
  timestamp: number;
}
