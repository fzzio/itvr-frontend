"use client";
import { useState, useEffect, useRef } from "react";
import { useTimer } from "@/context/TimerContext";
import type { Guide, Message } from "@/types";
import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
import WelcomeScreen from "./WelcomeScreen";
import SummaryScreen from "./SummaryScreen";

export default function ChatWindow({
  guide,
  onProgress,
}: {
  guide: Guide;
  onProgress: (coveredSections: number) => void;
}) {
  const { start, stop } = useTimer();
  const allQs = guide.sections.flatMap((sec) => sec.questions);
  const totalQ = allQs.length;

  const [phase, setPhase] = useState<"welcome" | "chat" | "summary">("welcome");
  const [messages, setMessages] = useState<Message[]>([]);
  const [qIndex, setQIndex] = useState(0);
  const [offtopicCount, setOfftopicCount] = useState(0);
  const [isThinking, setIsThinking] = useState(false);

  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onProgress(qIndex);
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [qIndex, guide.sections, onProgress]);

  // Start interview
  const begin = () => {
    start();
    setPhase("chat");
    setMessages([{ id: 0, role: "bot", content: allQs[0] }]);
    setQIndex(1);
  };

  const handleSend = (text: string) => {
    setMessages((m) => [...m, { id: m.length, role: "user", content: text }]);
    // off-topic detection (mock: if reply doesn’t match “got it” or contains “?”)
    const onTopic = /got it/i.test(text) || text.trim().length < 50;
    if (!onTopic) {
      setOfftopicCount((c) => c + 1);
      if (offtopicCount < 2) {
        setMessages((m) => [
          ...m,
          {
            id: m.length + 1,
            role: "bot",
            content: "I'm still working through the guide—let's keep going.",
          },
        ]);
        return;
      }
      // reset after 3 off-topic
      setOfftopicCount(0);
    }

    // Normal flow: ask next
    if (qIndex < totalQ) {
      setIsThinking(true);
      setTimeout(() => {
        setIsThinking(false);
        setMessages((m) => [
          ...m,
          { id: m.length, role: "bot", content: allQs[qIndex] },
        ]);
        setQIndex((i) => i + 1);
      }, 1000);
    } else {
      // finish
      stop();
      console.log("FINISH");
      setPhase("summary");
    }
  };

  if (phase === "welcome") {
    return <WelcomeScreen onStart={begin} guide={guide} />;
  }
  if (phase === "summary") {
    return (
      <SummaryScreen guide={guide} onRestart={() => window.location.reload()} />
    );
  }

  return (
    <div
      className="lg:col-span-3 flex flex-col bg-white rounded-lg shadow"
      style={{ maxHeight: "calc(100vh - 3rem)" }}
    >
      <ChatHeader title={guide.title} />
      <ChatBody ref={bodyRef} messages={messages} isThinking={isThinking} />
      <ChatFooter onSend={handleSend} />
    </div>
  );
}
