import { Request, Response } from "express";
import { insertUser } from "../data/insertUser";
import { generateToken } from "../services/authenticator";
import { hash } from "../services/hashManager";
import { generateId } from "../services/idGenerator";
import { user } from "../types/user";
import { selectUserByEmail } from "../data/selectUserByEmail";

export const signup = async (
   req: Request,
   res: Response
) => {
   try {
      const { name, nickname, email, password, role } = req.body

      if (
         !name ||
         !nickname ||
         !email ||
         !password ||
         !role
      ) {
         throw new Error('Preencha os campos "name","nickname", "email" e "password"')
      }

      const user: user = await selectUserByEmail(email)

      if (user) {
         throw new Error("Usuário já existente")
      }

      const id: string = generateId()

      const cypherPassword = await hash(password);

      await insertUser({
         id,
         name,
         nickname,
         email,
         password: cypherPassword,
         role
      })

      const token: string = generateToken({
         id,
         role: role
      })

      res
         .status(201)
         .send({
            message: "Usuário criado!",
            token
         })

   } catch (error) {
      res.status(400).send(error.message)
   }
}