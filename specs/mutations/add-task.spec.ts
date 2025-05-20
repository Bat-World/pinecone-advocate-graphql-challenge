import mongoose from "mongoose";
import dotenv from "dotenv";
import { addTask } from "@/graphql/resolvers/mutations/add-task";

dotenv.config();

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URL!);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Add Task Mutation", () => {
  const userId = "test-user";

  it("should add a task successfully", async () => {
    const unique = Date.now();
    const task = await addTask({}, {
      taskName: "Valid Task " + unique,
      description: "This is a valid description for the task.",
      priority: 2,
      userId,
    });

    expect(task).toHaveProperty("_id");
    expect(task.taskName).toContain("Valid Task");
    expect(task.description).toBe("This is a valid description for the task.");
    expect(task.priority).toBe(2);
    expect(task.userId).toBe(userId);
  });

  it("should throw validation error if description is too short", async () => {
    const input = {
      taskName: "Short Desc",
      description: "short ", 
      priority: 1,
      userId,
    };

    await expect(addTask({}, input)).rejects.toThrow(/validation/i);
  });

  it("should throw validation error if taskName === description", async () => {
    const input = {
      taskName: "SameText10",
      description: "SameText10",
      priority: 2,
      userId,
    };

    await expect(addTask({}, input)).rejects.toThrow("Description cannot be the same as task name.");
  });

  it("should throw generic error if no message is provided", async () => {
    const input = {
      taskName: "CatchErrorTest",
      description: "Valid long description here",
      priority: 2,
      userId,
    };

    const originalSave = mongoose.models.Task.prototype.save;
    mongoose.models.Task.prototype.save = jest.fn().mockImplementation(() => {
      throw {};
    });

    await expect(addTask({}, input)).rejects.toThrow("Something went wrong.");

    mongoose.models.Task.prototype.save = originalSave;
  });
});
