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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const guide = (guides as Record<string, any>)[guideKey];
  const sections = guide.sections
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .flatMap((sec: any) => sec.questions.map((q: string) => `• ${q}`))
    .join("\n");

  const systemPrompt = `
You are a friendly AI interviewer for the topic “${guide.title}”.
Follow these rules step by step:
1. Ask each question in order, labeled naturally and enclosing the raw question in **bold**.
2. After the user reply, briefly recap (“I see you said …”) then move on.
3. If the reply doesn't answer, gently re-ask.
4. Allow digressions, but always cover all questions.
5. When done, say: “${guide.endingMessage}”
Discussion Guide:
${sections}
`;

  return systemPrompt;
}

export async function askSummary({
  guideKey,
  messages,
}: {
  guideKey: string;
  messages: CoreMessage[];
}): Promise<string> {
  const systemPrompt = buildSummaryPrompt(guideKey, messages);

  const { text } = await generateText({
    model: google("gemini-2.5-flash"),
    system: systemPrompt,
    prompt: "", // empty since we provided systemPrompt + conversation in system
    temperature: 0.5,
  });

  return text;
}

function buildSummaryPrompt(guideKey: string, messages: CoreMessage[]): string {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const guide = (guides as any)[guideKey];

  // build a skeleton for every section
  const skeleton = Object.entries(guide.sections)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .map(([_, sec]) => {
      const section = sec as { title: string; questions: string[] };
      const qLines = section.questions
        .map((q: string) => `    "${q}": ""`)
        .join(",\n");
      return `"${section.title}": {\n${qLines}\n  }`;
    })
    .join(",\n");

  return `
You are an AI analyst. Output ONLY valid JSON, no backticks or markdown.

Use this exact structure:
{
${skeleton}
}

Fill each empty string with the interviewee’s summarized answer.

Conversation:
${messages
  .map(
    (m) =>
      `${m.role === "assistant" ? "Interviewer" : "Interviewee"}: ${m.content}`
  )
  .join("\n")}
`;
}
