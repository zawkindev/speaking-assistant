export interface Recording {
  id: string;
  blob: Blob;
  url: string;
  duration: number;
}

export interface AppState {
  currentPage: "home" | "part1" | "part2" | "part3" | "summary";
  mode: "practice" | "mock" | null;
  recordings: { [key: string]: Recording };
  currentPart: number;
  currentQuestion: number;
  isRecording: boolean;
  isPreparing: boolean;
  prepTime: number;
  recordingTime: number;
}

export interface AppContextType extends AppState {
  navigateTo: (page: "home" | "part1" | "part2" | "part3" | "summary") => void;
  setMode: (mode: "practice" | "mock") => void;
  startRecording: (id: string) => void;
  stopRecording: () => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  startPreparation: () => void;
  reset: () => void;
}

// Initial state
export const initialState: AppState = {
  currentPage: "home",
  mode: null,
  recordings: {},
  currentPart: 1,
  currentQuestion: 0,
  isRecording: false,
  isPreparing: false,
  prepTime: 0,
  recordingTime: 0,
};
