import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  taskName: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ["active", "finished"], default: "active" },
});


export const Task = mongoose.models.Task || mongoose.model("Task", TaskSchema);
