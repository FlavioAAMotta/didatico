import { Request, Response } from "express";
import connection from "../connection";
import { user } from "../types";
import { generateId } from "../services/IdGenerator";
import { Authenticator } from "../services/Authenticator";

export default async function login(
   req: Request,
   res: Response
): Promise<void> {
   try {

      const { email, password } = req.body

      if (!email || !password) {
         res.statusCode = 422
         throw new Error("Preencha os campos 'password' e 'email'")
      }

      const [user] = await connection('to_do_list_users')
         .where({ email })

      if (!user) {
         res.statusCode = 404
         throw new Error('Usuario inexistente')
      }

      if(password !== user.password){
        res.statusCode = 400;
        throw new Error('Senha incorreta')
      }

      const authenticator = new Authenticator();
      const token = authenticator.generateToken({ id: user.id })

      res.status(201).send(token)

   } catch (e: any) {
      res.send(e.sqlMessage || e.message);
   }
}