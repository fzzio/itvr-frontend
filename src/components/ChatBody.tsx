'use client'
import { useState } from "react";

interface Message {
  id: number;
  role: "user" | "bot";
  content: string;
}

export default function ChatBody() {
  const [messages] = useState<Message[]>([
    { id: 1, role: "bot", content: "Hi there! Ready to start the interview?" },
  ]);

  return (
    <div
      className="flex-1 p-4 overflow-y-auto space-y-4 chat-scroll"
    >
      {messages.map((m) => (
        <div
          key={m.id}
          className={`flex items-start gap-3 ${
            m.role === "user" ? "flex-row-reverse" : ""
          }`}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              m.role === "user"
                ? "bg-green-100 text-green-600"
                : "bg-amber-100 text-amber-600"
            }`}
          >
            {m.role === "user" ? "👤" : "🤖"}
          </div>
          <div
            className={`max-w-[85%] p-3 rounded-lg ${
              m.role === "user"
                ? "bg-green-500 text-white"
                : "bg-white border border-gray-200 text-gray-900"
            }`}
          >
            {m.content}
          </div>
        </div>
      ))}
    </div>
  );
}
