import React, { useState } from "react";
import useTasks from "../data/useTasks";
import TaskCard from "./TaskCard";
import AIChatPanel from "./AIChatPanel"; // New Component
import AddTaskModal from "./AddTaskModal";
import { useParams, Link } from "react-router-dom";
import { FiPlus, FiCpu, FiArrowLeft } from "react-icons/fi";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

export default function UnifiedKanban() {
  const { tasks, addTask, moveTask, deleteTask, updateTask } = useTasks();
  const [showAI, setShowAI] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // NEW STATE
  const columns = {
    todo: { label: "To Do", emoji: "☁️" },
    inprogress: { label: "In Progress", emoji: "✨" },
    done: { label: "Done", emoji: "🎀" },
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Update status if moved to a different column
    if (destination.droppableId !== source.droppableId) {
      updateTask(draggableId, { status: destination.droppableId });
    }
  };

  return (
    <div className="flex h-[calc(100vh-72px)] bg-[#FDF8F5] overflow-hidden">
      {/* KANBAN SECTION */}
      <div className={`flex-1 p-8 transition-all duration-500 overflow-y-auto ${showAI ? 'pr-4' : 'pr-8'}`}>
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-black text-[#5B4B49]">Personal Board</h1>
            <p className="text-[#F8AFA6] font-bold text-xs uppercase tracking-widest">Focus • Productivity • AI</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowAI(!showAI)}
              className={`p-3 rounded-2xl transition-all ${showAI ? 'bg-[#F8AFA6] text-white' : 'bg-white text-[#F8AFA6] border border-[#FADCD9]'}`}
            >
              <FiCpu size={20} />
            </button>
            {/* 2. THE WORKING BUTTON */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#5B4B49] text-white px-6 py-3 rounded-2xl font-bold text-sm flex items-center gap-2 hover:bg-[#F8AFA6] transition-all shadow-md active:scale-95"
            >
              <FiPlus /> New Task
            </button>
          </div>
        </header>

        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {Object.entries(columns).map(([key, { label, emoji }]) => (
              <div key={key} className="flex flex-col h-full">
                <div className="flex items-center gap-2 mb-4 px-2">
                  <span className="text-xl">{emoji}</span>
                  <h2 className="font-black uppercase text-xs tracking-[0.2em] text-[#5B4B49]/50">{label}</h2>
                  <span className="ml-auto bg-white px-2 py-0.5 rounded-lg text-[10px] font-bold border border-[#FADCD9] text-[#F8AFA6]">
                    {tasks.filter(t => t.status === key).length}
                  </span>
                </div>

                <Droppable droppableId={key}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`space-y-4 p-2 overflow-y-auto max-h-[70vh] pr-2 scrollbar-thin rounded-2xl transition-colors min-h-[150px] ${snapshot.isDraggingOver ? "bg-[#FADCD9]/20" : ""
                        }`}
                    >
                      {tasks
                        .filter(t => t.status === key)
                        .map((task, index) => (
                          <Draggable key={task._id} draggableId={task._id} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={{
                                  ...provided.draggableProps.style,
                                  opacity: snapshot.isDragging ? 0.8 : 1,
                                }}
                              >
                                <TaskCard
                                  task={task}
                                  moveTask={moveTask}
                                  deleteTask={deleteTask}
                                />
                              </div>
                            )}
                          </Draggable>
                        ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </DragDropContext>
      </div>

      {/* AI ASSISTANT PANEL */}
      {showAI && (
        <aside className="w-96 border-l border-[#FADCD9]/50 bg-white/50 backdrop-blur-xl p-6 flex flex-col">
          <AIChatPanel tasks={tasks} addTask={addTask} updateTask={updateTask} />
        </aside>
      )}
      {isModalOpen && (
        <AddTaskModal
          addTask={addTask}
          onClose={() => setIsModalOpen(false)}
        />
      )}

    </div>
  );
}