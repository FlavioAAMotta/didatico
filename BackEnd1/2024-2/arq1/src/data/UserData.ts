// Onde vou colocar conexão com banco

import { connection } from "../connection";
import { user } from "../types/user";

export class UserData {
    buscarUsuarioPorEmail = async (email: string) => {
        try {
            const [user] = await connection('to_do_list_users').where({ email });
            return user;
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    cadastrarUsuario = async (id: string, email: string, password: string, name: string, nickname: string, role: string) =>{
        try {
            await connection('to_do_list_users').insert({
                id,
                email,
                password,
                name,
                nickname,
                role
            })
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
}