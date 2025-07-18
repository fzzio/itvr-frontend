import Timer from "./Timer";
import type { Guide } from "@/types";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

export default function Sidebar({
  guide,
  answeredCount,
}: {
  guide: Guide;
  answeredCount: number;
}) {
  const { title, objective, duration, sections, keyEntities } = guide;
  const totalQuestions = sections.reduce((sum, sec) => sum + sec.questions.length, 0);

  return (
    <aside className="bg-white shadow-lg rounded-lg p-4">
      <Timer />
      <h2 className="text-lg font-semibold mb-2 text-am">{title}</h2>
      <p className="text-sm bg-amber-100 text-amber-800 font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-amber-400 dark:text-amber-950 mb-4">
        {duration}
      </p>

      <h3 className="font-medium text-sm mb-1">Objective</h3>
      <p className="text-xs text-gray-500 mb-4">{objective}</p>

      <h3 className="font-medium text-sm mb-1">Sections</h3>
      <ul className="space-y-2 mb-4">
       {sections.map((sec, idx) => {
         // how many questions come before this section?
         const prevQ = sections
           .slice(0, idx)
           .reduce((sum, s) => sum + s.questions.length, 0);
         // clamp answered in this section
         const answeredInSection = Math.min(
           Math.max(answeredCount - prevQ, 0),
           sec.questions.length
         );
         const done = answeredInSection === sec.questions.length;
         return (
           <li key={sec.title} className="flex items-center gap-2 text-xs">
             {done ? (
               <CheckCircleIcon className="w-4 h-4 text-amber-500" />
             ) : (
               <span className="w-4 h-4" />
             )}
             <span className="font-medium text-amber-700">
               [{answeredInSection}/{sec.questions.length}]
             </span>
             <span className="text-gray-700">{sec.title}</span>
           </li>
         );
       })}
      </ul>
     {/* progress bar by questions */}
     <div className="mb-4">
       <div className="h-2 w-full bg-gray-200 rounded overflow-hidden">
         <div
           className="h-2 bg-amber-500"
           style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
         />
       </div>
       <div className="text-xs text-gray-500 mt-1">
         {answeredCount} / {totalQuestions} questions
       </div>
     </div>
      <h3 className="font-medium text-sm mb-1">Entities</h3>
      <p className="text-xs text-gray-400">{keyEntities.join(", ")}</p>
    </aside>
  );
}
