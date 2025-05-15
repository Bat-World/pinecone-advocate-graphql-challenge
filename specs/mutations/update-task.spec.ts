// specs/mutations/update-task.spec.ts
import { updateTask } from "@/graphql/resolvers/mutations/update-task";
import { Task } from "@/graphql/schemas/task.schema";

jest.mock("@/graphql/schemas/task.schema");

describe("updateTask resolver", () => {
  const mockInput = {
    taskName: "Test Task",
    description: "Updated description",
    status: "finished"
  };

  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should update and return the task if found", async () => {
    const mockUpdatedTask = {
      _id: "123",
      ...mockInput
    };

    (Task.findOneAndUpdate as jest.Mock).mockResolvedValue(mockUpdatedTask);

    const result = await updateTask(null, mockInput);
    expect(result).toEqual(mockUpdatedTask);
    expect(Task.findOneAndUpdate).toHaveBeenCalledWith(
      { taskName: mockInput.taskName },
      {
        description: mockInput.description,
        status: mockInput.status,
      },
      { new: true }
    );
  });

  it("should throw an error if task is not found", async () => {
    (Task.findOneAndUpdate as jest.Mock).mockResolvedValue(null);

    await expect(updateTask(null, mockInput)).rejects.toThrow("Failed to update task");
  });

  it("should throw an error if database fails", async () => {
    (Task.findOneAndUpdate as jest.Mock).mockRejectedValue(new Error("Database error"));

    await expect(updateTask(null, mockInput)).rejects.toThrow("Failed to update task");
  });
});