"use client";

import React, {
  forwardRef,
  useImperativeHandle,
  useEffect,
  useRef,
} from "react";
import type {
  CoreMessage,
  TextPart,
  ImagePart,
  FilePart,
  ToolCallPart,
  ToolContent,
} from "ai";
import Spinner from "./Spinner";

// Unión de posibles partes de contenido
type AnyPart = TextPart | ImagePart | FilePart | ToolCallPart;

// Props de ChatBody
interface ChatBodyProps {
  messages: CoreMessage[];
  isThinking?: boolean;
}

// Función para renderizar cualquier tipo de contenido
function renderContent(
  content: string | AnyPart[] | ToolContent
): React.ReactNode {
  if (typeof content === "string") {
    return content;
  }
  if (Array.isArray(content)) {
    return content.map((part, idx) => {
      switch (part.type) {
        case "text":
          return <span key={idx}>{(part as TextPart).text}</span>;
        default:
          return null;
      }
    });
  }
  return (
    <pre className="bg-gray-50 p-2 rounded text-sm overflow-auto">
      {JSON.stringify(content, null, 2)}
    </pre>
  );
}

// Componente con forwardRef para exponer el ref al <div>
const ChatBody = forwardRef<HTMLDivElement, ChatBodyProps>(
  ({ messages, isThinking = false }, ref) => {
    const localRef = useRef<HTMLDivElement>(null);

    // Exponer localRef al padre
    useImperativeHandle(ref, () => localRef.current as HTMLDivElement);

    // Auto-scroll
    useEffect(() => {
      const node = localRef.current;
      if (node) node.scrollTop = node.scrollHeight;
    }, [messages, isThinking]);

    return (
      <div
        ref={localRef}
        className="flex-1 p-4 overflow-y-auto space-y-4 chat-scroll"
      >
        {messages
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
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {renderContent(m.content as any)}
                </div>
              </div>
            );
          })}
        {isThinking && <Spinner />}
      </div>
    );
  }
);

// Asignamos displayName para que ESLint y React DevTools lo reconozcan
ChatBody.displayName = "ChatBody";

export default ChatBody;
