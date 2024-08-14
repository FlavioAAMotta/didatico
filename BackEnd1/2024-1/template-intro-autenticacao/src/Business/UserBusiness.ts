import { hash } from "bcryptjs";
import { User } from "../model/User";
import { generateId } from "../services/IdGenerator";

export class UserBusiness {
    const UserData = new UserData();
    const createUser = (user: User): Promise<void>{
        try {
            if (!user.name || !user.nickname || !user.email || !user.password) {
                throw new Error("Preencha os campos 'name','nickname', 'password' e 'email'")
            }

            const usuarioExistente = UserData.findByEmail(user.email);

            if (user) {
                throw new Error('Email já cadastrado')
            }

            const id: string = generateId();
            const cypherPassword = await hash(password);
            const newUser: User = { id, name, nickname, email, password: cypherPassword, role }
            const authenticator = new Authenticator();
            const token = authenticator.generateToken({ id, role })
        } catch () {

        }
    }
}