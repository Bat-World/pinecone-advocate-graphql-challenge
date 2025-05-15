// specs/queries/get-finished-tasks.spec.ts
import { createTestClient, stopTestClient } from "../utils/createTestClient";
import { gql } from "graphql-tag";
import { Task } from "@/graphql/schemas/task.schema";

const GET_FINISHED_TASKS = gql`
  query GetFinishedTasks {
    getFinishedTasks {
      taskName
      status
    }
  }
`;

describe("getFinishedTasks query", () => {
  let client: any;

  beforeAll(async () => {
    client = await createTestClient();
    await Task.deleteMany({});
    await Task.create([
      { taskName: "Finished 1", status: "finished" },
      { taskName: "Active Task", status: "active" },
      { taskName: "Finished 2", status: "finished" },
    ]);
  }, 10000);

  afterAll(async () => {
    await Task.deleteMany({});
    await stopTestClient();
  });

  it("should return only finished tasks", async () => {
    const res = await client.executeOperation({ query: GET_FINISHED_TASKS });

    expect(res.errors).toBeUndefined();
    expect(res.data?.getFinishedTasks?.length).toBe(2);
    expect(res.data?.getFinishedTasks).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ taskName: "Finished 1", status: "finished" }),
        expect.objectContaining({ taskName: "Finished 2", status: "finished" }),
      ])
    );
  });
});