import { UserRepository } from "../business/userBusiness";
import { connection } from "../connection";
import { user } from "../types/user";

export class UserData implements UserRepository {
  constructor() {}

  signup = async (user: user) => {
    try {
      const result = await connection.insert(user).into("to_do_list_users");
      return result;
    } catch (error: any) {
      throw new Error(error.sqlMessage);
    }
  };

  login = async (email: string, password: string) => {
    try {
      const result = await connection
        .select("to_do_list_users")
        .where({ email, password });
      return result;
    } catch (error: any) {
      throw new Error(error.sqlMessage);
    }
  };
}
