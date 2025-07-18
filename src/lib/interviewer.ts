import type { CoreMessage } from "ai";

export type InterviewRequest = {
  guideKey: string;
  messages: CoreMessage[];
};

export async function nextInterviewMessage({
  guideKey,
  messages,
}: InterviewRequest): Promise<string> {
  const res = await fetch("/api/interview", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ guideKey, messages }),
  });
  if (!res.ok) {
    throw new Error(`Interview API error: ${res.status}`);
  }
  const { message } = await res.json();
  return message;
}
