import { useRef, useState } from "react";
import { initialState, type AppContextType, type AppState } from "./types";
import { AppContext } from "./AppContext";

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(initialState);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJs.Timeout | null>(null);
  const recordingIdRef = useRef<string>("");

  const navigateTo = (
    page: "home" | "part1" | "part2" | "part3" | "summary",
  ) => {
    setState((prev) => ({ ...prev, currentPage: page }));
  };

  const setMode = (mode: "practice" | "mock") => {
    setState((prev) => ({ ...prev, mode }));
  };

  const startRecording = async (id: string) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      recordingIdRef.current = id;

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        const duration = state.recordingTime;

        setState((prev) => ({
          ...prev,
          recordings: {
            ...prev.recordings,
            [recordingIdRef.current]: {
              id: recordingIdRef.current,
              blob,
              url,
              duration,
            },
          },
          isRecording: false,
          recordingTime: 0,
        }));

        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop());
        }
      };

      mediaRecorder.start();
      setState((prev) => ({ ...prev, isRecording: true, recordingTime: 0 }));

      // Start recording timer
      timerRef.current = setInterval(() => {
        setState((prev) => ({
          ...prev,
          recordingTime: prev.recordingTime + 1,
        }));
      }, 1000);
    } catch (error) {
      console.error("Error starting recording:", error);
      alert("Could not access microphone. Please check permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && state.isRecording) {
      mediaRecorderRef.current.stop();
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const nextQuestion = () => {
    setState((prev) => ({
      ...prev,
      currentQuestion: prev.currentQuestion + 1,
    }));
  };

  const prevQuestion = () => {
    setState((prev) => ({
      ...prev,
      currentQuestion: Math.max(0, prev.currentQuestion - 1),
    }));
  };

  const startPreparation = () => {
    setState((prev) => ({ ...prev, isPreparing: true, prepTime: 60 }));

    const prepTimer = setInterval(() => {
      setState((prev) => {
        if (prev.prepTime <= 1) {
          clearInterval(prepTimer);
          // Auto-start recording in mock mode
          if (prev.mode === "mock") {
            setTimeout(() => startRecording("part2"), 100);
          }
          return { ...prev, isPreparing: false, prepTime: 0 };
        }
        return { ...prev, prepTime: prev.prepTime - 1 };
      });
    }, 1000);
  };

  const reset = () => {
    // Stop any ongoing recording
    if (mediaRecorderRef.current && state.isRecording) {
      mediaRecorderRef.current.stop();
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }

    // Clear all recording URLs to prevent memory leaks
    Object.values(state.recordings).forEach((recording) => {
      URL.revokeObjectURL(recording.url);
    });

    setState(initialState);
  };

  const contextValue: AppContextType = {
    ...state,
    navigateTo,
    setMode,
    startRecording,
    stopRecording,
    nextQuestion,
    prevQuestion,
    startPreparation,
    reset,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export default AppProvider;
