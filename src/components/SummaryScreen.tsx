"use client";
import React from "react";
import type { Guide } from "@/types";

export default function SummaryScreen({
  guide,
  onRestart,
}: {
  guide: Guide;
  onRestart: () => void;
}) {
  return (
    <div className="lg:col-span-3 flex-1 flex flex-col items-center justify-center space-y-6 p-8 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold text-amber-600">
        Interview Complete!
      </h2>
      <p className="max-w-prose text-center text-gray-700">
        Here’s a quick mock summary of what we learned about{" "}
        <strong>{guide.title}</strong>:
      </p>
      <ul className="list-disc list-inside space-y-2 text-gray-600">
        {guide.sections.map((s, i) => (
          <li key={i}>
            <strong>{s.title}:</strong> user responses collected...
          </li>
        ))}
      </ul>
      <button
        onClick={onRestart}
        className="mt-6 bg-amber-500 hover:bg-amber-600 text-white px-5 py-2 rounded-lg"
      >
        Restart Interview
      </button>
    </div>
  );
}
