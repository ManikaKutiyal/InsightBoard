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
    <div className="flex h-[calc(100vh-72px)] bg-brand-bg overflow-hidden">
      {/* KANBAN SECTION */}
      <div className={`flex-1 transition-all duration-500 overflow-x-auto custom-scrollbar ${showAI ? 'pr-4' : ''}`}>
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-black text-brand-charcoal">Synergy Board</h1>
            <div className="flex items-center gap-2">
              <p className="text-brand-coral font-bold text-xs uppercase tracking-widest">Global Intelligence • Real-Time sync</p>
              <span className="flex h-2 w-2 rounded-full bg-green-400 animate-pulse" title="Synergy Active"></span>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowAI(!showAI)}
              className={`p-3 rounded-2xl transition-all ${showAI ? 'bg-brand-coral text-white' : 'bg-brand-card text-brand-coral border border-brand-border'}`}
            >
              <FiCpu size={20} />
            </button>
            {/* 2. THE WORKING BUTTON */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-brand-charcoal text-white px-6 py-3 rounded-2xl font-bold text-sm flex items-center gap-2 hover:bg-brand-coral transition-all shadow-md active:scale-95"
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
                  <h2 className="font-black uppercase text-xs tracking-[0.2em] text-brand-charcoal/50">{label}</h2>
                  <span className="ml-auto bg-brand-card px-2 py-0.5 rounded-lg text-[10px] font-bold border border-brand-border text-brand-coral">
                    {tasks.filter(t => t.status === key).length}
                  </span>
                </div>

                <Droppable droppableId={key}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`space-y-4 p-2 overflow-y-auto max-h-[70vh] pr-2 scrollbar-thin rounded-2xl transition-colors min-h-[150px] ${snapshot.isDraggingOver ? "bg-brand-border/20" : ""
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
        <aside className="fixed inset-0 lg:relative lg:inset-auto z-50 lg:z-0 w-full lg:w-96 lg:border-l border-brand-border/50 bg-brand-card lg:bg-brand-card/50 backdrop-blur-3xl lg:backdrop-blur-xl p-6 flex flex-col animate-in slide-in-from-right duration-300">
          <div className="flex justify-between items-center mb-6 lg:hidden">
            <h2 className="text-xl font-black text-brand-charcoal">Synergy AI</h2>
            <button
              onClick={() => setShowAI(false)}
              className="p-2 bg-brand-bg rounded-xl text-brand-coral"
            >
              <span className="text-xs font-black uppercase tracking-widest">Close [X]</span>
            </button>
          </div>
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