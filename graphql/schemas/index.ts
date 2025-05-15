import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Task {
    _id: ID!
    taskName: String!
    description: String
    status: String
  }

 type Query {
  helloQuery: String
  getAllTasks: [Task]
  getFinishedTasks: [Task]
}


  type Mutation {
    sayHello(name: String!): String
    addTask(taskName: String!, description: String, status: String): Task
    updateTask(taskName: String!, description: String, status: String): Task
  }
`;
