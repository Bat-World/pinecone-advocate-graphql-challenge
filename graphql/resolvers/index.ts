import { sayHello } from "./mutations/say-hello";
import { helloQuery } from "./queries/hello-query";

import { addTask } from "./mutations/add-task";
import { updateTask } from "./mutations/update-task";

import { getAllTasks } from "./queries/get-all-tasks";
import { getFinishedTasks } from "./queries/get-finished-tasks";

export const resolvers = {
  Query: {
    helloQuery,
    getAllTasks,
    getFinishedTasksLists: getFinishedTasks, 
  },
  Mutation: {
    sayHello,
    addTask,
    updateTask,
  },
};

