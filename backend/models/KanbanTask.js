import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  priority: { type: String, default: "low" },
  status: { type: String, default: "todo" },

  // NEW FIELDS FOR AI (OPTION A)
  description: { type: String, default: "" },
  dueDate: { type: String, default: null },
  storyPoints: { type: Number, default: 0 },
  tags: { type: [String], default: [] },
  dependencies: { type: [String], default: [] },

  user: { type: mongoose.Schema.Types.ObjectId, ref: "KanbanUser", required: true }
});

const KanbanTask = mongoose.model("KanbanTask", TaskSchema);

export default KanbanTask;
