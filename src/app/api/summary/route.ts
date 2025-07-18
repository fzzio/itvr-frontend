import { NextResponse } from "next/server";
import { askSummary } from "@/services/geminiClient";

export async function POST(req: Request) {
  const { guideKey, messages } = await req.json();

  try {
    const raw = await askSummary({ guideKey, messages });
    console.log("Generated RAW summary:", raw);
    const jsonText = raw.replace(/```(json)?/g, "");
    const parsed = JSON.parse(jsonText);
    console.log("Parsed summary JSON:", parsed);
    return NextResponse.json(parsed);
  } catch (err) {
    console.error("Summary API error:", err);
    return NextResponse.error();
  }
}
