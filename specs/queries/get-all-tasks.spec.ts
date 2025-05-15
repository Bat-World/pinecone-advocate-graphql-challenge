import mongoose from "mongoose";
import dotenv from "dotenv";
import Task from "@/models/Task";
import getAllTasks from "@/graphql/resolvers/queries/get-all-tasks";

dotenv.config({ path: ".env" });
jest.setTimeout(20000);

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URL!);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Get All Tasks Query", () => {
  const userId = "user-all-test";
  const unique = Date.now();

  beforeAll(async () => {
    await Task.create([
      {
        taskName: "Task 1 " + unique,
        description: "Description 1",
        priority: 1,
        tags: ["tag1"],
        isDone: false,
        userId,
      },
      {
        taskName: "Task 2 " + unique,
        description: "Description 2",
        priority: 2,
        tags: ["tag2"],
        isDone: true,
        userId,
      },
    ]);
  });

  it("should return all tasks for the user", async () => {
    const tasks = await getAllTasks({}, { userId });

    expect(Array.isArray(tasks)).toBe(true);
    expect(tasks.length).toBeGreaterThanOrEqual(2);
    tasks.forEach((task) => {
      expect(task.userId).toBe(userId);
    });
  });
});
