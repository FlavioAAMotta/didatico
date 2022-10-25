import { generateToken } from "../services/authenticator";
import { hash } from "../services/hashManager";
import { generateId } from "../services/idGenerator";
import { user, USER_ROLES } from "../types/user";

export interface UserRepository {
  signup(user:user): Promise<void>;
  login(email: string, password: string): Promise<string>;
}

export class UserBusiness {
  constructor(private userData: UserRepository) {}

  signup = async (
    name: string,
    nickname: string,
    email: string,
    password: string,
    role: USER_ROLES
  ) => {
    try {
      if (!name || !nickname || !email || !password || !role) {
        throw new Error(
          'Preencha os campos "name","nickname", "email" e "password"'
        );
      }
      let id = generateId();
      const cypherPassword = await hash(password);

      let newUser: user = {
        id,
        name,
        nickname,
        email,
        password: cypherPassword,
        role: USER_ROLES.NORMAL,
      };

      const result = await this.userData.signup(newUser);
      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  };

  login = async (email: string, password: string) => {
    try {
      if (!email || !password) {
        throw new Error("Campos não preenchidos");
      }
      const cypherPassword = await hash(password);
      const user = await this.userData.login(email, cypherPassword);
      const token = generateToken(user.id)
      return token
    } catch (error: any) {
      throw new Error(error);
    }
  };
}
