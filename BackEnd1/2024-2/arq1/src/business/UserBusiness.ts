// Onde aplico minhas regras de negócio

import { compare } from "bcryptjs";
import { UserData } from "../data/UserData";
import { generateToken, payload } from "../middlewares/authenticator";
import { generateId } from "../middlewares/idGenerator";
import { userRole } from "../types/user";

export class UserBusiness {
    userData = new UserData()
    login = async (email: string, password: string) => {
        try {

            if (!email || !password) {
                throw new Error("Campos faltantes")
            }

            const user = this.userData.buscarUsuarioPorEmail(email) as any;
            if (!user) {
                throw new Error("Usuario inexistente");
            }

            const auth = await compare(password, user.password);

            if (!auth) {
                throw new Error("Credenciais inválidas");
            }

            const payload: payload = {
                id: user.id,
                role: user.role
            }

            const token = await generateToken(payload)

            return token

        } catch (error: any) {
            throw new Error(error)
        }
    }

    signup = async (email: string, password: string, name: string, nickname: string, role: string) => {
        try {
            if(!email || !password || !name){
                throw new Error("Campos Faltantes")
            }
            const user = await this.userData.buscarUsuarioPorEmail(email) as any;
            if (user) {
                throw new Error("Usuario já cadastrado");
            }

            const id = generateId()

            await this.userData.cadastrarUsuario(id, email, password, name, nickname, role);
            const payload: payload = {
                id: id,
                role: role as userRole
            }

            const token = await generateToken(payload)

            return token
        } catch (error: any) {
            throw new Error(error)
        }
    }
}