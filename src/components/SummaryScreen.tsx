"use client";
import React, { useEffect, useState } from "react";
import type { CoreMessage } from "ai";
import Timer from "./Timer";
import Spinner from "./Spinner";

export default function SummaryScreen({
  guideKey,
  onRestart,
  messages,
}: {
  guideKey: string;
  onRestart: () => void;
  messages: CoreMessage[];
}) {
  const [rawSummary, setRawSummary] = useState<string | null>(null);
  const [summary, setSummary] = useState<Record<string, Record<string, string>>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/summary", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ guideKey, messages }),
        });
        // 🔍 Grab the raw text
        const text = await res.text();
        console.log("Raw summary response:", text);
        setRawSummary(text);

        // 🔍 Parse the JSON
        const parsed = JSON.parse(rawSummary || "{}");
        console.log("Parsed summary JSON:", parsed);
        setSummary(parsed);

      } catch (err) {
        console.error("Fetch summary failed", err);
        setRawSummary("Error fetching summary");
      } finally {
        setLoading(false);
      }
    })();
  }, [guideKey, messages, rawSummary]);

  if (loading) {
    return (
      <div className="lg:col-span-3 flex-1 flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="lg:col-span-3 p-8 bg-white rounded shadow space-y-6">
      <h2 className="text-xl font-semibold text-amber-600">Interview Summary</h2>
      <Timer />

      {Object.entries(summary).map(([sectionTitle, qmap]) => (
        <div key={sectionTitle}>
          <h3 className="font-semibold text-lg">{sectionTitle}</h3>
          <ul className="list-disc list-inside ml-4">
            {Object.entries(qmap).map(([question, answer]) => (
              <li key={question} className="mb-2">
                <p className="font-medium">{question}</p>
                <p className="text-gray-700">{answer}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <button
        onClick={onRestart}
        className="mt-6 bg-amber-500 hover:bg-amber-600 text-white px-5 py-2 rounded-lg"
      >
        Restart Interview
      </button>
    </div>
  );
}
