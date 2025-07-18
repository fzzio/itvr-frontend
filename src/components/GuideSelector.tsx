"use client";
import React from "react";
import type { Guide } from "@/types";

interface Props {
  guides: Record<string, Guide>;
  selectedKey: string;
  onChange: (key: string) => void;
}

export default function GuideSelector({
  guides,
  selectedKey,
  onChange,
}: Props) {
  return (
    <select
      value={selectedKey}
      onChange={(e) => onChange(e.target.value)}
      className="border rounded px-3 py-2 bg-white"
    >
      {Object.entries(guides).map(([key, guide]) => (
        <option key={key} value={key}>
          {guide.title}
        </option>
      ))}
    </select>
  );
}
