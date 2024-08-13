import { Request, Response } from "express"
import {selectUserByEmail} from "../data/selectUserByEmail"
import { generateToken } from "../services/authenticator"
import { compare } from "../services/hashManager"
import { user } from '../types/user'

export const login = async (
   req: Request,
   res: Response
): Promise<void> => {
   try {
      const { email, password } = req.body

      if (!email || !password) {
         throw new Error("'email' e 'senha' são obrigatórios")
      }

      const user: user = await selectUserByEmail(email)

      if (!user) {
         throw new Error("Usuário não encontrado ou senha incorreta")
      }

      const passwordIsCorrect: boolean = await compare(password, user.password)

      if (!passwordIsCorrect) {
         throw new Error("Usuário não encontrado ou senha incorreta")
      }

      const token: string = generateToken({
         id: user.id,
         role: user.role
      })

      res.send({
         message: "Usuário logado!",
         token
      })

   } catch (error) {
      res.status(400).send(error.message)
   }
}