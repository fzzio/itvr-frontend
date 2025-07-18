"use client";

import { useState, useEffect, useRef } from "react";
import { useTimer } from "@/context/TimerContext";
import type { Guide } from "@/types";
import type { CoreMessage } from "ai";
import { nextInterviewMessage } from "@/lib/interviewer";

import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
import WelcomeScreen from "./WelcomeScreen";
import SummaryScreen from "./SummaryScreen";

export default function ChatWindow({
  guide,
  selectedKey,
  onProgress,
}: {
  guide: Guide;
  selectedKey: string;
  onProgress: (coveredQuestions: number) => void;
}) {
  const { start, stop } = useTimer();
  const [phase, setPhase] = useState<"welcome" | "chat" | "summary">("welcome");
  const [messages, setMessages] = useState<CoreMessage[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  // For progress: count how many questions (assistant messages) have been shown
  const askedCount = messages.filter((m) => m.role === "assistant").length;

  // Scroll & report progress on each message update
  useEffect(() => {
    onProgress(askedCount);
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages, askedCount, onProgress]);

  // Kick off the interview: empty history => system prompt + Q1
  const begin = async () => {
    start();
    setPhase("chat");
    setIsThinking(true);

    const firstQ = await nextInterviewMessage({
      guideKey: selectedKey,
      messages: [], // tells the server to inject the system prompt and first question
    });

    setMessages([{ role: "assistant", content: firstQ }]);
    setIsThinking(false);
  };

  // Handle each user answer
  const handleSend = async (text: string) => {
    // 1️⃣ Append user message
    const userMsg: CoreMessage = { role: "user", content: text };
    const history = [...messages, userMsg];
    setMessages(history);

    // 2️⃣ Ask Gemini for the recap + next question (or ending)
    setIsThinking(true);
    const reply = await nextInterviewMessage({
      guideKey: selectedKey,
      messages: history,
    });
    setIsThinking(false);

    // 3️⃣ Append assistant reply
    const botMsg: CoreMessage = { role: "assistant", content: reply };
    setMessages((prev) => [...prev, botMsg]);

    // 4️⃣ If this was the final thank-you, move to summary
    if (reply.trim() === guide.endingMessage.trim()) {
      stop();
      setPhase("summary");
    }
  };

  // Render phases
  if (phase === "welcome") {
    return <WelcomeScreen onStart={begin} guide={guide} />;
  }
  if (phase === "summary") {
    return (
      <SummaryScreen guide={guide} onRestart={() => window.location.reload()} />
    );
  }

  // Main chat UI
  return (
    <div
      className="lg:col-span-3 flex flex-col bg-white rounded-lg shadow"
      style={{ maxHeight: "calc(100vh - 3rem)" }}
    >
      <ChatHeader title={selectedKey} />
      <ChatBody ref={bodyRef} messages={messages} isThinking={isThinking} />
      <ChatFooter onSend={handleSend} />
    </div>
  );
}
