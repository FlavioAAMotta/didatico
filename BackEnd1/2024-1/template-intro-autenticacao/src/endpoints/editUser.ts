import { Request, Response } from "express";
import connection from "../connection";
import { Authenticator } from "../services/Authenticator";
import { USER_ROLES } from "../types";

export default async function createUser(
   req: Request,
   res: Response
): Promise<void> {
   try {
      const authenticator = new Authenticator();
      const { name, nickname } = req.body;
      const token = req.headers.authorization;

      if (!token) {
         res.statusCode = 401;
         throw new Error("Cade o token?!")
      }

      const tokenData = authenticator.getTokenData(token);
      if(tokenData.role != USER_ROLES.ADMIN){
         res.statusCode = 401;
         res.statusMessage = "Somente admin pode editar usuario"
         throw new Error()
      }
      if (!name && !nickname) {
         res.statusCode = 422
         res.statusMessage = "Informe o(s) novo(s) 'name' ou 'nickname'"
         throw new Error()
      }

      await connection('to_do_list_users')
         .update({ name, nickname })
         .where({ id: tokenData.id })

      res.send('Atualizado com sucesso total!!')

   } catch (e: any) {
      res.send(e.sqlMessage || e.message);
   }
}