'use client'
import { useState, useEffect } from "react";
import type { Guide, Message } from "@/types";
import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";

export default function ChatWindow({ guide }: { guide: Guide }) {
  const allQuestions = guide.sections.flatMap((sec) => sec.questions);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: "bot",
      content: `📝 ${guide.title}: ${guide.objective}`,
    },
  ]);
  const [qIndex, setQIndex] = useState(0);

  const handleSend = (text: string) => {
    setMessages((m) => [...m, { id: m.length, role: "user", content: text }]);

    // mock bot reply next question
    setTimeout(() => {
      const next =
        qIndex < allQuestions.length
          ? allQuestions[qIndex]
          : guide.endingMessage;
      setMessages((m) => [
        ...m,
        { id: m.length, role: "bot", content: next },
      ]);
      setQIndex((i) => i + 1);
    }, 500);
  };

  return (
    <div className="lg:col-span-3 flex flex-col bg-white rounded-lg shadow max-h-screen">
      <ChatHeader title={guide.title} />
      <ChatBody messages={messages} />
      <ChatFooter onSend={handleSend} />
    </div>
  );
}
