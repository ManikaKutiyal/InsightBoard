import express from "express";
import auth from "../middleware/auth.js";
import KanbanTask from "../models/KanbanTask.js";

const router = express.Router();

// GET all tasks
router.get("/", auth, async (req, res) => {
  try {
    const tasks = await KanbanTask.find({ user: req.user.id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// CREATE task
router.post("/", auth, async (req, res) => {
  try {
    const task = await KanbanTask.create({
      ...req.body,
      user: req.user.id
    });

    res.json(task);
  } catch (err) {
    res.status(500).json({ error: "Failed to create task" });
  }
});

// UPDATE TASK (AI uses this heavily)
router.put("/:id", auth, async (req, res) => {
  try {
    const updated = await KanbanTask.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Update failed", details: err.message });
  }
});

// DELETE task
router.delete("/:id", auth, async (req, res) => {
  try {
    await KanbanTask.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
});

export default router;
