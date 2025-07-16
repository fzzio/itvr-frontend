export default function Sidebar() {
  return (
    <aside className="bg-white shadow-lg rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-2 text-am">Discussion Guide</h2>
      <p className="text-sm text-gray-600 mb-4">20-30 minutes</p>

      <h3 className="font-medium text-sm mb-1">Objective</h3>
      <p className="text-xs text-gray-500 mb-4">
        Understand developers’ experiences with AI coding tools, usage patterns,
        and decision-making.
      </p>

      <h3 className="font-medium text-sm mb-1">Sections</h3>
      <ul className="list-disc list-inside text-xs space-y-1 mb-4">
        <li>Tool Discovery & Trial Experience</li>
        <li>Detailed Tool Evaluation</li>
        <li>Future Tool Considerations</li>
        <li>Vibe-Coding Experience</li>
      </ul>

      <h3 className="font-medium text-sm mb-1">Tools Mentioned</h3>
      <p className="text-xs text-gray-400">None yet</p>
    </aside>
  );
}
