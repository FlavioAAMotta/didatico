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

    cadastrarUsuario = async (newUser: user) => {
        try {

            await connection('to_do_list_users').insert(newUser)
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }  
}