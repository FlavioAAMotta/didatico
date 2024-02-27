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



      const [user] = await connection('to_do_list_users')
         .where({ email })
      console.log(role)

      

      
      await connection('to_do_list_users')
         .insert(newUser)

      

      res.status(201).send(token)

   } catch (e: any) {
      res.send(e.sqlMessage || e.message);
   }
}