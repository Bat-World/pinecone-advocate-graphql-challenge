
import { addTask } from "./mutations/add-task";
import { updateTask } from "./mutations/update-task";
import { getUserDoneTasksLists } from "./queries/get-user-done-tasks";
import getAllTasks from "./queries/get-all-tasks";




export const resolvers = {
  Query: {
  getUserDoneTasksLists,
    getAllTasks
  
    
  },
  Mutation: {

    addTask,
    updateTask,
    
  },
};