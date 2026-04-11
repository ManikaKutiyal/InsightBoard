import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: { type: String, default: "" },
  subjects: { type: [String], default: [] },
  theme: { type: String, default: "cream" },
  avatar: { type: String, default: "" },
}, { timestamps: true });

export default mongoose.model("KanbanUser", userSchema);
