import { Request, Response } from "express";
import connection from "../connection";
import { user } from "../types";
import { generateId } from "../services/IdGenerator";
import { Authenticator } from "../services/Authenticator";
import { hash } from "../services/HashManager";

export default async function createUser(
   req: Request,
   res: Response
): Promise<void> {
   try {

      const { name, nickname, email, password, role } = req.body

      if (!name || !nickname || !email || !password) {
         res.statusCode = 422
         throw new Error("Preencha os campos 'name','nickname', 'password' e 'email'")
      }

      const [user] = await connection('to_do_list_users')
         .where({ email })
      console.log(role)

      if (user) {
         res.statusCode = 409
         throw new Error('Email já cadastrado')
      }

      const id: string = generateId();
      const cypherPassword = await hash(password);
      const newUser: user = { id, name, nickname, email, password: cypherPassword, role }

      await connection('to_do_list_users')
         .insert(newUser)

      const authenticator = new Authenticator();
      const token = authenticator.generateToken({ id, role })

      res.status(201).send(token)

   } catch (e: any) {
      res.send(e.sqlMessage || e.message);
   }
}