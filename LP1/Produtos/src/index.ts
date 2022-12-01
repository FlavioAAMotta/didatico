import express, { Request, Response } from "express"
import { AddressInfo } from "net";
import cors from "cors";
import dotenv from "dotenv";
import { generateId } from "./idGenerator";
import connection from "./connection";
import { Cliente } from "./model/cliente";
import { HashGenerator } from "./hashManager";
import { Authenticator } from "./authenticator";

dotenv.config();

const hashManager: HashGenerator = new HashGenerator();
const auth: Authenticator = new Authenticator();

const app = express();
app.use(cors())
app.use(express.json());

app.get("/carrinho", (req: Request, res: Response) => {
    const cliente = req.body.cliente
    res.send("O cliente é " + cliente)
})

const login = async (req: Request, res: Response) => {
    try {
        let { email, senha } = req.body
        if (!email || !senha) {
            throw new Error("Campo faltante")
        }
        let cliente: any = await connection("cliente").where({ email })
        console.log(cliente[0])
        let comparaSenha = await hashManager.compareHash(senha, cliente[0].senha)
        console.log(comparaSenha)
        if(!comparaSenha){
            throw new Error("Dados incorretos")
        }
        console.log(cliente[0].id)
        let token = auth.generateToken(cliente[0].id)
        res.send(token)
    } catch (error: any) {
        res.send(error.sqlMessage || error.message)
    }
}

const cadastroUsuario = async (req: Request, res: Response) => {
    try {
        let { nome, email, senha, sobrenome } = req.body
        if (!nome || !email || !senha) {
            throw new Error("Campo faltante")
        }
        const id = generateId()
        const carrinho_id = generateId()
        senha = await hashManager.hash(senha)
        const cliente: Cliente = {
            id,
            email,
            nome,
            sobrenome,
            senha,
            carrinho_id
        }
        const emailCadastrado = await connection("cliente").where({ email })

        if (emailCadastrado[0]) {
            throw new Error("Email já cadastrado na base")
        }
        await connection("carrinho").insert({ id: carrinho_id })
        console.log("Carrinho inserido")
        await connection("cliente").insert(cliente)
        res.status(201).send("Cliente cadastrado com sucesso")
    } catch (error: any) {
        res.send(error.sqlMessage || error.message)
    }
}

app.post("/usuario", cadastroUsuario)
app.post("/login", login)

const server = app.listen(process.env.PORT || 3003, () => {
    if (server) {
        const address = server.address() as AddressInfo;
        console.log(`Server running at http://localhost:${address.port}`);
    } else {
        console.error(`Failure initializing server.`);
    }
});