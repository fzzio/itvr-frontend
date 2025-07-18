import type { CoreMessage } from "ai";
import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import guides from "@/data/discussion-guides.json";

export async function askGemini({
  guideKey,
  messages,
}: {
  guideKey: string;
  messages: CoreMessage[];
}): Promise<string> {
  const systemPrompt = buildSystemPrompt(guideKey);

  const conversation = messages
    .map((m) => {
      const who = m.role === "assistant" ? "Assistant" : "User";
      return `${who}: ${m.content}`;
    })
    .join("\n");

  const { text } = await generateText({
    model: google("gemini-2.5-flash"),
    system: systemPrompt,
    prompt: conversation,
  });

  return text;
}

function buildSystemPrompt(guideKey: string): string {
  const guide = (guides as Record<string, any>)[guideKey];
  const sections = guide.sections
    .flatMap((sec: any) => sec.questions.map((q: string) => `• ${q}`))
    .join("\n");

  const systemPrompt = `
You are a friendly AI interviewer for the topic “${guide.title}”.
Follow these rules step by step:
1. Ask each question in order, labeled naturally.
2. After the user reply, briefly recap (“I see you said …”) then move on.
3. If the reply doesn’t answer, gently re-ask.
4. Allow digressions, but always cover all questions.
5. When done, say: “${guide.endingMessage}”
Discussion Guide:
${sections}
`;

  return systemPrompt;
}