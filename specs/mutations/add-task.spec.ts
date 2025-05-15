// specs/mutations/add-task.spec.ts
import { addTask } from "@/graphql/resolvers/mutations/add-task";
import { Task } from "@/graphql/schemas/task.schema";

jest.mock("@/graphql/schemas/task.schema");

describe("addTask resolver", () => {
  const mockInput = {
    taskName: "Test Task",
    description: "Test description",
    status: "active"
  };

  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should create a new task and return it", async () => {
    const mockCreatedTask = {
      _id: "mock-id",
      ...mockInput
    };

    (Task.create as jest.Mock).mockResolvedValue(mockCreatedTask);

    const result = await addTask(null, mockInput);

    expect(Task.create).toHaveBeenCalledWith(mockInput);
    expect(result).toEqual(mockCreatedTask);
  });

  it("should throw an error if creation fails", async () => {
    (Task.create as jest.Mock).mockRejectedValue(new Error("Database error"));

    await expect(addTask(null, mockInput)).rejects.toThrow("Failed to create task");
    expect(Task.create).toHaveBeenCalledWith(mockInput);
  });
});