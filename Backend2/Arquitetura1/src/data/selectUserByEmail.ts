import { connection } from "../connection"
import { user } from "../types/user"

export const selectUserByEmail = async (
   email: string
): Promise<user> => {
   try {
      const result = await connection("to_do_list_users")
         .select("*")
         .where({ email })

      return {
         id: result[0].id,
         name: result[0].name,
         nickname: result[0].nickname,
         email: result[0].email,
         password: result[0].password,
         role: result[0].role
      }

   } catch (error) {
      throw new Error(error.slqMessage || error.message)
   }
}