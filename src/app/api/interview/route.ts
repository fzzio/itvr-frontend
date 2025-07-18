import { NextResponse } from "next/server";
import { askGemini } from "@/services/geminiClient";

export async function POST(req: Request) {
  const { guideKey, messages } = await req.json();
  const response = await askGemini({ guideKey, messages });
  return NextResponse.json({ message: response });
}
