import { updateTask } from "@/graphql/resolvers/mutations/update-task";
import { addTask } from "@/graphql/resolvers/mutations/add-task";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Task from "@/models/Task";

dotenv.config({ path: ".env" });

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URL!);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Update Task Mutation", () => {
  const userId = "test-user";
  const unique = Date.now();
  let createdTask: any;

  beforeAll(async () => {
    await mongoose.connection.collection("tasks").deleteMany({});
    createdTask = await addTask(
      {},
      {
        taskName: "Old Task " + unique,
        description: "Old description for update test",
        priority: 2,
        userId,
        isDone: false,
      }
    );
  });

  it("should throw validation error if description is too short", async () => {
    const task = await Task.create({
      taskName: "Initial",
      description: "A valid description",
      userId,
      priority: 1,
    });

    const input = {
      taskId: task._id.toString(),
      description: "short", 
      userId,
    };

    await expect(updateTask({}, input)).rejects.toThrow(/validation/i);
  });



  it("should throw error if task is not found", async () => {
    const fakeId = "66500865c82f1d22e96b1234";

    const input = {
      taskId: fakeId,
      userId,
      taskName: "Updated Name",
    };

    await expect(updateTask({}, input)).rejects.toThrow("Task not found.");
  });

  it("should update taskName and isDone", async () => {
    const unique = Date.now() + Math.floor(Math.random() * 1000);
    const updated = await updateTask(
      {},
      {
        taskId: createdTask._id,
        userId,
        taskName: "Updated Task " + unique,
        isDone: true,
      }
    );

    expect(updated.taskName).toBe("Updated Task " + unique);
    expect(updated.isDone).toBe(true);
  });

  it("should throw unauthorized if userId doesn't match", async () => {
    await expect(
      updateTask(
        {},
        {
          taskId: createdTask._id,
          userId: "wrong-user",
          taskName: "Should Not Work",
        }
      )
    ).rejects.toThrow("Unauthorized.");
  });

  it("should throw error if priority is out of range", async () => {
    await expect(
      updateTask(
        {},
        {
          taskId: createdTask._id,
          userId,
          priority: 10,
        }
      )
    ).rejects.toThrow("Priority must be between 1 and 5.");
  });

  it("should not throw if priority is undefined", async () => {
    const result = await updateTask(
      {},
      {
        taskId: createdTask._id,
        userId,
      }
    );
    expect(result).toBeDefined();
  });
});
