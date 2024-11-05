import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";

import { AddressInfo } from "net";
import { connection } from "./connection";
import { generateId } from "./middlewares/idGenerator";
import { user, userRole } from "./types/user";
import { generateToken, payload } from "./middlewares/authenticator";
import { compare, hash } from "./middlewares/hashManager";

const app = express();

app.use(express.json());
app.use(cors());

app.post('/users', async (req: Request, res: Response) => {
  try {
    const { name, nickname, email, password, role } = req.body;
    if (!name || !nickname || !password || !role || !email) {
      res.status(422);
      throw new Error("Favor enviar todos campos");
    }

    if (role != userRole.ADMIN && role != userRole.USER) {
      res.status(422);
      throw new Error("Campo role não corresponde aos cargos");
    }


    const user = await connection('to_do_list_users').where({ email })

    if (user.length > 0) {
      res.status(409);
      throw new Error("Email já cadastrado em nossa base");
    }
    const newId = generateId();
    const cypherPassword = await hash(password);

    const newUser: user = {
      id: newId,
      name,
      nickname,
      email,
      password: cypherPassword,
      role
    }

    await connection('to_do_list_users').insert(newUser)

    res.send(newId);
  } catch (error: any) {
    res.send(error.sqlMessage || error.message);
  }
})

app.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const [user] = await connection('to_do_list_users').where({ email });

    if (!user) {
      res.status(404);
      throw new Error("Usuario inexistente");
    }
    
    const auth = await compare(password, user.password);
    
    if(!auth){
      res.status(401);
      throw new Error("Credenciais inválidas");
    }

    const payload: payload = {
      id: user.id,
      role: user.role
    }

    const token = await generateToken(payload)

    res.send(token)
  } catch (error: any) {
    res.send(error.sqlMessage || error.message);
  }
})

const server = app.listen(process.env.PORT || 3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost:${address.port}`);
  } else {
    console.error(`Failure upon starting server.`);
  }
});