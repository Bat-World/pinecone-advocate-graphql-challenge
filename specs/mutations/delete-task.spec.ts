import mongoose from "mongoose";
import dotenv from "dotenv";
import { deleteTask } from "@/graphql/resolvers/mutations/delete-task";
import { addTask } from "@/graphql/resolvers/mutations/add-task";
import Task from "@/models/Task";

dotenv.config();

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URL!);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("deleteTask", () => {
  it("should delete a task successfully", async () => {
    const task = await addTask(
      {},
      {
        taskName: "To be deleted",
        description: "This task is valid",
        priority: 1,
        userId: "test-user",
      }
    );

    const result = await deleteTask({}, { taskId: task._id });
    expect(result.message).toBe("Task deleted successfully.");
    expect(result.task._id.toString()).toBe(task._id.toString());
  });

  it("should throw error if task not found", async () => {
    const nonExistentId = new mongoose.Types.ObjectId().toString();

    await expect(deleteTask({}, { taskId: nonExistentId })).rejects.toThrow(
      "Task not found."
    );
  });

  it("should throw error for invalid task ID format", async () => {
    await expect(deleteTask({}, { taskId: "invalid-id" })).rejects.toThrow(
      "Something went wrong."
    );
  });

  it("should throw generic error on unexpected failure", async () => {
    jest.spyOn(Task, "findById").mockImplementationOnce(() => {
      throw new Error("Unexpected DB error");
    });

    await expect(
      deleteTask({}, { taskId: "000000000000000000000000" })
    ).rejects.toThrow("Something went wrong.");
  });
});
