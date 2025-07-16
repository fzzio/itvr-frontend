export interface GuideSection {
  title: string;
  questions: string[];
}

export interface Guide {
  title: string;
  objective: string;
  duration: string;
  domain: string;
  analysisPrompt: string;
  sections: GuideSection[];
  endingMessage: string;
  keyEntities: string[];
  analysisSchema: Record<string, string>;
}

export interface Message {
  id: number;
  role: "user" | "bot";
  content: string;
}
