import { Task } from "@/graphql/schemas/task.schema";

export const getFinishedTasks = async () => {
  try {
    const finishedTasks = await Task.find({ status: "finished" });
    return finishedTasks;
  } catch (error) {
    console.error("Error fetching finished tasks:", error);
    throw new Error("Failed to fetch finished tasks.");
  }
};
