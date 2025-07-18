"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface TimerContextValue {
  elapsed: number;
  running: boolean;
  start: () => void;
  stop: () => void;
  reset: () => void;
}

const TimerContext = createContext<TimerContextValue | undefined>(undefined);

export function TimerProvider({ children }: { children: ReactNode }) {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let id: ReturnType<typeof setInterval> | null = null;
    if (running) {
      id = setInterval(() => setElapsed((e) => e + 1), 1000);
    }
    return () => {
      if (id !== null) {
        clearInterval(id);
      }
    };
  }, [running]);

  const start = () => {
    setElapsed(0);
    setRunning(true);
  };
  const stop = () => setRunning(false);
  const reset = () => {
    setElapsed(0);
    setRunning(false);
  };

  return (
    <TimerContext.Provider value={{ elapsed, running, start, stop, reset }}>
      {children}
    </TimerContext.Provider>
  );
}

export function useTimer() {
  const ctx = useContext(TimerContext);
  if (!ctx) throw new Error("useTimer must be inside TimerProvider");
  return ctx;
}
