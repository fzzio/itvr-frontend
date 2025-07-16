import type { Guide } from "@/types";

export default function Sidebar({ guide }: { guide: Guide }) {
  const { title, objective, duration, sections, keyEntities } = guide;

  return (
    <aside className="bg-white shadow-lg rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-2 text-am">{title}</h2>
      <p className="text-sm bg-amber-100 text-amber-800 font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-amber-400 dark:text-amber-950 mb-4">
        {duration}
      </p>

      <h3 className="font-medium text-sm mb-1">Objective</h3>
      <p className="text-xs text-gray-500 mb-4">{objective}</p>

      <h3 className="font-medium text-sm mb-1">Sections</h3>
      <ul className="list-disc list-inside text-xs space-y-1 mb-4">
        {sections.map((s) => (
          <li key={s.title}>{s.title}</li>
        ))}
      </ul>

      <h3 className="font-medium text-sm mb-1">Entities</h3>
      <p className="text-xs text-gray-400">{keyEntities.join(", ")}</p>
    </aside>
  );
}
