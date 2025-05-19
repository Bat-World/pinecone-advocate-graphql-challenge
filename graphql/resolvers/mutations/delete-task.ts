import Task from "@/models/Task";

export const deleteTask = async (_: any, { taskId }: { taskId: string }) => {
  try {
    const task = await Task.findById(taskId);
    if (!task) throw new Error("Task not found.");

    await Task.findByIdAndDelete(taskId);
    return {
      task,
      message: "Task deleted successfully.",
    };
  } catch (error: any) {
    if (error.message === "Task not found.") throw error;
    throw new Error("Something went wrong.");
  }
};
