import { Task } from "@/graphql/schemas/task.schema";
import { TaskInput } from "@/graphql/types/task";

export const addTask = async (_: any, args: TaskInput) => {
  try {
    const { taskName, description, status = "active" } = args;
    const newTask = await Task.create({ taskName, description, status });

    return newTask;
  } catch (error) {
    console.error("Error creating task:", error);
    throw new Error("Failed to create task");
  }
};
