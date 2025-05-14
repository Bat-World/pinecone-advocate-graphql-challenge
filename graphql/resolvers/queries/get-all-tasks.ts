import { Task } from "@/graphql/schemas/task.schema";

export const getAllTasks = async () => {
  try {
    const tasks = await Task.find({ status: "active" });
    return tasks;
  } catch (error) {
    console.error("Error fetching all tasks:", error);
    throw new Error("Failed to fetch active tasks.");
  }
};
