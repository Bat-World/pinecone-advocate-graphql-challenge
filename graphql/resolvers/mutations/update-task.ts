import { Task } from "@/graphql/schemas/task.schema";
import { TaskInput } from "@/graphql/types/task";

export const updateTask = async (_: any, args: TaskInput) => {
  try {
    const { taskName, description, status = "active" } = args;

    const updatedTask = await Task.findOneAndUpdate(
      { taskName }, 
      { description, status },
      { new: true } 
    );

    if (!updatedTask) {
      throw new Error("Task not found");
    }

    return updatedTask;
  } catch (error) {
    console.error("Error updating task:", error);
    throw new Error("Failed to update task");
  }
};
