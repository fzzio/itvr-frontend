"use client";
import { useTimer } from "@/context/TimerContext";

export default function Timer() {
  const { elapsed, running } = useTimer();

  const mins = Math.floor(elapsed/60).toString().padStart(2,'0');
  const secs = (elapsed%60).toString().padStart(2,'0');
  return (
    <div className="text-xs text-gray-500 mb-4">
      ⏱ {running ? "Running" : "Paused"} - {" "}
      ⏱ <span className="font-semibold">{mins}:{secs}</span>
    </div>
  );
}
