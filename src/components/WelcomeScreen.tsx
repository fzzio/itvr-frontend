"use client";
import React from "react";
import { Guide } from "@/types";

export default function WelcomeScreen({
  guide,
  onStart,
}: {
  guide: Guide;
  onStart: () => void;
}) {
  return (
    <div className="lg:col-span-3 flex-1 flex flex-col items-center justify-center space-y-6 bg-white rounded-lg shadow p-6">
      <div className="w-24 h-24 border-4 border-amber-400 rounded-full animate-pulse" />
      <h1 className="text-2xl font-semibold text-amber-600">
        {guide.title}
      </h1>
      <p className="text-gray-600 text-center max-w-sm">
        {guide.objective}
      </p>
      <button
        onClick={onStart}
        className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg transition"
      >
        Start Interview
      </button>
    </div>
  );
}
