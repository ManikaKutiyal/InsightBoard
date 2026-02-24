import { useEffect, useState, useContext } from "react";
import { API_BASE } from "../config";
import { AuthContext } from "../context/AuthContext";

export default function useTasks() {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);

  // LOAD TASKS
  async function loadTasks() {
    try {
      const res = await fetch(`${API_BASE}/tasks`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!res.ok) return setTasks([]);

      const data = await res.json();
      setTasks(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error loading tasks", err);
      setTasks([]);
    }
  }

  useEffect(() => {
    if (user) loadTasks();
    else setTasks([]);
  }, [user]);

  // ADD TASK
  async function addTask(taskObj) {
    // Ensure all required fields exist
    const safeTask = {
      title: taskObj.title || "Untitled Task",
      priority: taskObj.priority || "low",
      status: taskObj.status || "todo",
      description: taskObj.description || "",
      dueDate: taskObj.dueDate || null,
      storyPoints: taskObj.storyPoints || 0,
      tags: taskObj.tags || [],
      dependencies: taskObj.dependencies || [],
    };

    try {
      const res = await fetch(`${API_BASE}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(safeTask),
      });

      if (!res.ok) {
        const text = await res.text(); // debug bad request
        console.error("Bad Request:", text);
        return;
      }

      const newTask = await res.json();
      setTasks(prev => [...prev, newTask]);
    } catch (err) {
      console.error("Error adding task", err);
    }
  }

  // UPDATE ANY FIELD(S)
  async function updateTask(id, updates) {
    try {
      const res = await fetch(`${API_BASE}/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(updates),
      });

      const updated = await res.json();

      setTasks(prev => prev.map(t => (t._id === id ? updated : t)));
    } catch (err) {
      console.error("Error updating task", err);
    }
  }

  // MOVE TASK
  async function moveTask(id, direction) {
    const task = tasks.find(t => t._id === id);
    if (!task) return;

    const order = ["todo", "inprogress", "done"];
    let index = order.indexOf(task.status);

    if (direction === "next" && index < 2) index++;
    if (direction === "prev" && index > 0) index--;

    const newStatus = order[index];

    return updateTask(id, { status: newStatus });
  }

  // DELETE TASK
  async function deleteTask(id) {
    try {
      await fetch(`${API_BASE}/tasks/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setTasks(prev => prev.filter(t => t._id !== id));
    } catch (err) {
      console.error("Error deleting task", err);
    }
  }

  return { tasks, addTask, updateTask, moveTask, deleteTask };
}
