// specs/queries/get-all-tasks.spec.ts
import { createTestClient, stopTestClient } from "../utils/createTestClient";
import { gql } from "graphql-tag";
import { Task } from "@/graphql/schemas/task.schema";

const GET_ALL_TASKS = gql`
  query GetAllTasks {
    getAllTasks {
      taskName
      status
    }
  }
`;

describe("getAllTasks query", () => {
  let client: any;

  beforeAll(async () => {
    client = await createTestClient();
    await Task.deleteMany({});
    await Task.create([
      { taskName: "Task One", status: "active" },
      { taskName: "Task Two", status: "finished" },
    ]);
  });

  afterAll(async () => {
    await Task.deleteMany({});
    await stopTestClient();
  });

  it("should return all tasks", async () => {
    const res = await client.executeOperation({ query: GET_ALL_TASKS });

    expect(res.errors).toBeUndefined();
    expect(res.data?.getAllTasks?.length).toBe(2);
    expect(res.data?.getAllTasks).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ taskName: "Task One", status: "active" }),
        expect.objectContaining({ taskName: "Task Two", status: "finished" }),
      ])
    );
  });
});