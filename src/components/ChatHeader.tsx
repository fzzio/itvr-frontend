'use client'

export default function ChatHeader() {
  return (
    <header className="flex items-center justify-between p-4 border-b">
      <h2 className="text-lg font-semibold flex items-center gap-2">
        🤖 AI Research Interviewer
      </h2>
      <button
        onClick={() => console.log("Change Topic clicked")}
        className="text-sm text-gray-600 hover:text-gray-800"
      >
        Change Topic
      </button>
    </header>
  );
}
