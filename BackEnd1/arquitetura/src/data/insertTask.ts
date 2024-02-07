import { connection } from "../connection";
import { task } from "../types/task";

export const insertTask = async (
   task: task
) => {
   await connection('to_do_list_tasks')
      .insert({
         id: task.id,
         title: task.title,
         description: task.description,
         deadline: task.deadline,
         author_id: task.authorId
      })
}