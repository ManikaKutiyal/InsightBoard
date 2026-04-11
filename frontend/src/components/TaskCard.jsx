// export default function TaskCard({ task, moveTask, deleteTask }) {
//   // Priority colors
//   const priorityColors = {
//     low: "bg-green-200 text-green-800",
//     medium: "bg-yellow-200 text-yellow-800",
//     high: "bg-red-200 text-red-800",
//   };

//   return (
//     <div className="bg-white p-4 rounded shadow mb-4 border hover:shadow-lg transition-shadow">
//       {/* Title */}
//       <h3 className="font-semibold text-lg mb-1">{task.title}</h3>

//       {/* Priority */}
//       <span className={`inline-block px-2 py-1 rounded text-sm font-semibold ${priorityColors[task.priority]}`}>
//         {task.priority.toUpperCase()}
//       </span>

//       {/* Description */}
//       {task.description && (
//         <p className="text-gray-700 text-sm mt-2 whitespace-pre-line">
//           {task.description}
//         </p>
//       )}

//       {/* Due Date & Story Points */}
//       <div className="flex justify-between items-center text-gray-600 text-sm mt-2">
//         {task.dueDate && <span>📅 {task.dueDate}</span>}
//         {task.storyPoints > 0 && <span>⭐ {task.storyPoints} SP</span>}
//       </div>

//       {/* Tags */}
//       {task.tags && task.tags.length > 0 && (
//         <div className="flex flex-wrap gap-1 mt-2">
//           {task.tags.map((tag, idx) => (
//             <span key={idx} className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs">
//               {tag}
//             </span>
//           ))}
//         </div>
//       )}

//       {/* Dependencies */}
//       {task.dependencies && task.dependencies.length > 0 && (
//         <div className="mt-2 text-gray-500 text-xs">
//           Depends on: {task.dependencies.join(", ")}
//         </div>
//       )}

//       {/* Buttons */}
//       <div className="flex gap-2 mt-3">
//         <button onClick={() => moveTask(task._id, "prev")} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">←</button>
//         <button onClick={() => moveTask(task._id, "next")} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">→</button>
//         <button onClick={() => deleteTask(task._id)} className="px-2 py-1 bg-red-300 rounded hover:bg-red-400">🗑</button>
//       </div>
//     </div>
//   );
// }

export default function TaskCard({ task, moveTask, deleteTask }) {
  const priorityStyles = {
    high: "bg-[#FADCD9] text-[#F8AFA6]",
    medium: "bg-[#FEF1E6] text-[#F9B208]",
    low: "bg-[#EBF5EE] text-[#5BB381]",
  };

  return (
    <div className="group bg-brand-card rounded-[2rem] p-5 shadow-sm border border-transparent hover:border-brand-coral hover:shadow-xl transition-all duration-300">
      <div className="flex justify-between items-start mb-3">
        <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${priorityStyles[task.priority]}`}>
          {task.priority}
        </span>
        <button onClick={() => deleteTask(task._id)} className="opacity-0 group-hover:opacity-100 text-brand-charcoal/20 hover:text-red-400 transition-all text-sm">🗑</button>
      </div>

      <h3 className="font-bold text-brand-charcoal leading-tight mb-2">{task.title}</h3>
      {task.description && <p className="text-xs text-brand-charcoal/60 line-clamp-2 mb-4 leading-relaxed">{task.description}</p>}

      <div className="flex items-center gap-3 mb-4">
        {task.tags?.map((tag, i) => (
          <span key={i} className="text-[9px] font-bold text-brand-coral bg-brand-coral/5 px-2 py-0.5 rounded-md italic">#{tag}</span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-brand-border/30">
        <div className="flex -space-x-2">
          <button onClick={() => moveTask(task._id, "prev")} className="w-8 h-8 rounded-full bg-brand-bg flex items-center justify-center text-brand-charcoal hover:bg-brand-coral hover:text-white transition-all text-xs">←</button>
          <button onClick={() => moveTask(task._id, "next")} className="w-8 h-8 rounded-full bg-brand-bg flex items-center justify-center text-brand-charcoal hover:bg-brand-coral hover:text-white transition-all text-xs">→</button>
        </div>
        {task.storyPoints > 0 && (
          <div className="flex items-center gap-1 text-[10px] font-black text-brand-charcoal/40">
            <span className="text-brand-coral">⭐</span> {task.storyPoints} SP
          </div>
        )}
      </div>
    </div>
  );
}