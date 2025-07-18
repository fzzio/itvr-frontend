'use client'
import { useState } from "react";
import { TimerProvider } from "@/context/TimerContext";
import guides from "@/data/discussion-guides.json";
import type { Guide } from "@/types";
import GuideSelector from "./GuideSelector";
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";

export default function ChatLayout() {
  const guideKeys = Object.keys(guides);
  const [selectedKey, setSelectedKey] = useState<string>(guideKeys[0]);
  const selectedGuide = (guides as Record<string, Guide>)[selectedKey];
  const [answeredCount, setAnsweredCount] = useState(0);

  return (
    <TimerProvider>
      <div className="min-h-screen bg-gradient-to-br from-amber-800 to-amber-200 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-4">
            <GuideSelector
              guides={guides as Record<string, Guide>}
              selectedKey={selectedKey}
              onChange={setSelectedKey}
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <Sidebar
              guide={selectedGuide}
              answeredCount={answeredCount}
            />
            <ChatWindow
              guide={selectedGuide}
              selectedKey={selectedKey}
              onProgress={(n) => setAnsweredCount(n)}
            />
          </div>
        </div>
      </div>
    </TimerProvider>
  );
}
