// // import { useState } from "react";

// // export default function AddTaskModal({ addTask }) {
// //   const [title, setTitle] = useState("");
// //   const [priority, setPriority] = useState("low");
// //   const [description, setDescription] = useState("");
// //   const [dueDate, setDueDate] = useState("");
// //   const [storyPoints, setStoryPoints] = useState(0);
// //   const [tags, setTags] = useState("");

// //   // Convert comma-separated tags string to array
// //   const tagArray = tags
// //     .split(",")
// //     .map(t => t.trim())
// //     .filter(t => t.length > 0);

// //   const handleAdd = () => {
// //     if (!title.trim()) return;

// //     // Build full task object compatible with backend + AI
// //     const taskObj = {
// //       title: title.trim(),
// //       priority,
// //       status: "todo",
// //       description: description.trim(),
// //       dueDate: dueDate || null,
// //       storyPoints: Number(storyPoints) || 0,
// //       tags: tagArray,
// //       dependencies: []
// //     };

// //     addTask(taskObj);

// //     // Reset form
// //     setTitle("");
// //     setPriority("low");
// //     setDescription("");
// //     setDueDate("");
// //     setStoryPoints(0);
// //     setTags("");
// //   };

// //   return (
// //     <div className="bg-white p-4 rounded shadow mb-4">
// //       <h2 className="font-bold mb-2">Add New Task</h2>

// //       <input
// //         placeholder="Task title"
// //         className="border p-2 w-full mb-2"
// //         value={title}
// //         onChange={e => setTitle(e.target.value)}
// //       />

// //       <select
// //         className="border p-2 w-full mb-2"
// //         value={priority}
// //         onChange={e => setPriority(e.target.value)}
// //       >
// //         <option value="low">Low</option>
// //         <option value="medium">Medium</option>
// //         <option value="high">High</option>
// //       </select>

// //       <textarea
// //         placeholder="Description (optional)"
// //         className="border p-2 w-full mb-2"
// //         value={description}
// //         onChange={e => setDescription(e.target.value)}
// //       />

// //       <input
// //         type="date"
// //         className="border p-2 w-full mb-2"
// //         value={dueDate}
// //         onChange={e => setDueDate(e.target.value)}
// //       />

// //       <input
// //         type="number"
// //         placeholder="Story Points"
// //         className="border p-2 w-full mb-2"
// //         value={storyPoints}
// //         onChange={e => setStoryPoints(e.target.value)}
// //       />

// //       <input
// //         placeholder="Tags (comma separated)"
// //         className="border p-2 w-full mb-2"
// //         value={tags}
// //         onChange={e => setTags(e.target.value)}
// //       />

// //       <button
// //         className="bg-blue-500 text-white px-4 py-2 rounded w-full"
// //         onClick={handleAdd}
// //       >
// //         Add Task
// //       </button>
// //     </div>
// //   );
// // }


// import { useState } from "react";
// import { FiX } from "react-icons/fi";

// export default function AddTaskModal({ addTask, closeModal }) {
//   const [formData, setFormData] = useState({
//     title: "",
//     priority: "low",
//     description: "",
//     dueDate: "",
//     storyPoints: 0,
//     tags: ""
//   });

//   const handleAdd = () => {
//     if (!formData.title.trim()) return;

//     const tagArray = formData.tags.split(",").map(t => t.trim()).filter(t => t.length > 0);

//     addTask({
//       ...formData,
//       title: formData.title.trim(),
//       description: formData.description.trim(),
//       storyPoints: Number(formData.storyPoints) || 0,
//       tags: tagArray,
//       status: "todo",
//       dependencies: []
//     });

//     closeModal(); // Close after adding!
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       {/* Backdrop */}
//       <div className="absolute inset-0 bg-[#5B4B49]/20 backdrop-blur-sm" onClick={closeModal} />
      
//       {/* Modal Card */}
//       <div className="relative bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl border border-white">
//         <button onClick={closeModal} className="absolute top-6 right-6 text-[#5B4B49]/30 hover:text-[#F8AFA6]">
//           <FiX size={24} />
//         </button>

//         <h2 className="text-2xl font-black text-[#5B4B49] mb-6">Create New Task ✨</h2>

//         <div className="space-y-4">
//           <input
//             placeholder="What needs to be done?"
//             className="w-full bg-[#FDF8F5] border-none rounded-2xl py-3 px-4 text-sm font-bold text-[#5B4B49] outline-none ring-2 ring-transparent focus:ring-[#F8AFA6]/20 transition-all"
//             value={formData.title}
//             onChange={e => setFormData({...formData, title: e.target.value})}
//           />

//           <div className="grid grid-cols-2 gap-4">
//             <select
//               className="bg-[#FDF8F5] border-none rounded-2xl py-3 px-4 text-xs font-bold text-[#5B4B49] outline-none"
//               value={formData.priority}
//               onChange={e => setFormData({...formData, priority: e.target.value})}
//             >
//               <option value="low">Low Priority</option>
//               <option value="medium">Medium Priority</option>
//               <option value="high">High Priority</option>
//             </select>

//             <input
//               type="number"
//               placeholder="Story Points"
//               className="bg-[#FDF8F5] border-none rounded-2xl py-3 px-4 text-xs font-bold text-[#5B4B49] outline-none"
//               value={formData.storyPoints}
//               onChange={e => setFormData({...formData, storyPoints: e.target.value})}
//             />
//           </div>

//           <textarea
//             placeholder="Add a description..."
//             rows="3"
//             className="w-full bg-[#FDF8F5] border-none rounded-2xl py-3 px-4 text-sm font-medium text-[#5B4B49] outline-none"
//             value={formData.description}
//             onChange={e => setFormData({...formData, description: e.target.value})}
//           />

//           <input
//             type="text"
//             placeholder="Tags (comma separated)"
//             className="w-full bg-[#FDF8F5] border-none rounded-2xl py-3 px-4 text-xs font-bold text-[#5B4B49] outline-none"
//             value={formData.tags}
//             onChange={e => setFormData({...formData, tags: e.target.value})}
//           />

//           <button
//             className="w-full bg-[#F8AFA6] text-white py-4 rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-[#F8AFA6]/30 hover:bg-[#5B4B49] transition-all mt-4"
//             onClick={handleAdd}
//           >
//             Add to Board
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";

export default function AddTaskModal({ addTask, onClose }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("low");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [storyPoints, setStoryPoints] = useState(0);
  const [tags, setTags] = useState("");

  const tagArray = tags
    .split(",")
    .map(t => t.trim())
    .filter(t => t.length > 0);

  const handleAdd = () => {
    if (!title.trim()) return;

    const taskObj = {
      title: title.trim(),
      priority,
      status: "todo",
      description: description.trim(),
      dueDate: dueDate || null,
      storyPoints: Number(storyPoints) || 0,
      tags: tagArray,
      dependencies: []
    };

    addTask(taskObj);
    onClose(); // ✅ close modal after adding
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-[350px] shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-lg">Add New Task</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-black">✕</button>
        </div>

        <input
          placeholder="Task title"
          className="border p-2 w-full mb-2 rounded"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <select
          className="border p-2 w-full mb-2 rounded"
          value={priority}
          onChange={e => setPriority(e.target.value)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <textarea
          placeholder="Description (optional)"
          className="border p-2 w-full mb-2 rounded"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />

        <input
          type="date"
          className="border p-2 w-full mb-2 rounded"
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
        />

        <input
          type="number"
          placeholder="Story Points"
          className="border p-2 w-full mb-2 rounded"
          value={storyPoints}
          onChange={e => setStoryPoints(e.target.value)}
        />

        <input
          placeholder="Tags (comma separated)"
          className="border p-2 w-full mb-4 rounded"
          value={tags}
          onChange={e => setTags(e.target.value)}
        />

        <button
          className="bg-[#5B4B49] text-white px-4 py-2 rounded w-full font-bold hover:bg-[#F8AFA6] transition-all"
          onClick={handleAdd}
        >
          Add Task
        </button>
      </div>
    </div>
  );
}
