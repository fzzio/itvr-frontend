"use client";

import React from "react";
import type {
  CoreMessage,
  TextPart,
  ImagePart,
  FilePart,
  ToolCallPart,
  ToolContent,
} from "ai";
import Spinner from "./Spinner";

// A union of all part types we might see
type AnyPart = TextPart | ImagePart | FilePart | ToolCallPart;

function renderContent(content: string | AnyPart[] | ToolContent): React.ReactNode {
  // 1️⃣ Plain string
  if (typeof content === "string") {
    return content;
  }

  // 2️⃣ Array of parts (TextPart, ImagePart, FilePart, etc.)
  if (Array.isArray(content)) {
    return content.map((part, idx) => {
      // Each part has a `type` property
      switch (part.type) {
        case "text":
          return <span key={idx}>{(part as TextPart).text}</span>;
        default:
          return null;
      }
    });
  }

  // 3️⃣ Fallback for ToolContent or unknown object
  return (
    <pre className="bg-gray-50 p-2 rounded text-sm overflow-auto">
      {JSON.stringify(content, null, 2)}
    </pre>
  );
}

export default function ChatBody({
  messages,
  isThinking = false,
}: {
  messages: CoreMessage[];
  isThinking?: boolean;
}) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [messages, isThinking]);

  return (
    <div
      ref={ref}
      className="flex-1 p-4 overflow-y-auto space-y-4 chat-scroll"
    >
      {messages
        // hide system messages entirely
        .filter((m) => m.role !== "system")
        .map((m, idx) => {
          const isUser = m.role === "user";
          return (
            <div
              key={idx}
              className={`flex items-start gap-3 ${
                isUser ? "flex-row-reverse" : ""
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isUser
                    ? "bg-green-100 text-green-600"
                    : "bg-amber-100 text-amber-600"
                }`}
              >
                {isUser ? "👤" : "🤖"}
              </div>
              <div
                className={`max-w-[85%] p-3 rounded-lg ${
                  isUser
                    ? "bg-green-500 text-white"
                    : "bg-white border border-gray-200 text-gray-900"
                }`}
              >
                {renderContent(m.content as any)}
              </div>
            </div>
          );
        })}
      {isThinking && <Spinner />}
    </div>
  );
}
