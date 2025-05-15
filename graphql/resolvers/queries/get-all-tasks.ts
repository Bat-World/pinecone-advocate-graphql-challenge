import Task from "@/models/Task";
import exp from "constants";

const getAllTasks = async (_: any, { userId }: any) => {
    return await Task.find({ userId }); // safer and makes more sense
}


export default getAllTasks;