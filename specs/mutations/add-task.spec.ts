import { addTask } from "@/graphql/resolvers/mutations/add-task";

describe("addTask resolver", () => {
  it("should insert a task and return it", async () => {
    const mockInsertOne = jest.fn().mockResolvedValue({ insertedId: "abc123" });
    const mockDb = {
      collection: jest.fn().mockReturnValue({ insertOne: mockInsertOne }),
    };

    const args = {
      input: {
        title: "Test task",
        description: "A test description",
      },
    };

    const result = await addTask({}, args, { db: mockDb });

    expect(mockDb.collection).toHaveBeenCalledWith("tasks");
    expect(mockInsertOne).toHaveBeenCalledWith({
      title: "Test task",
      description: "A test description",
      completed: false,
    });
    expect(result).toEqual({
      id: "abc123",
      title: "Test task",
      description: "A test description",
      completed: false,
    });
  });
});
