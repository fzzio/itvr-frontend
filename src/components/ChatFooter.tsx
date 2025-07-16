'use client'
import { useState } from "react";

export default function ChatFooter() {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("User says:", input);
    setInput("");
  };

  return (
    <footer className="border-t p-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Share your thoughts or ask a question..."
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
        <button
          type="submit"
          className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700"
        >
          Send
        </button>
      </form>
    </footer>
  );
}
