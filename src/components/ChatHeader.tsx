'use client'

export default function ChatHeader({ title }: { title: string }) {
  return (
    <header className="flex items-center justify-between p-4 border-b">
      <h2 className="text-lg font-semibold flex items-center gap-2">
        🤖 AI Research Interviewer
      </h2>
      <h2 className="text-lg font-semibold flex items-center gap-2">
        {title}
      </h2>
    </header>
  );
}
