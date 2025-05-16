import Task from "@/models/Task";


const getAllTasks = async (_: any, { userId }: any) => {
    return await Task.find({ userId }); 
}


export default getAllTasks;