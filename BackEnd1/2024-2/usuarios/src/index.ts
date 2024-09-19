import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";

import { AddressInfo } from "net";
import connection from "./connection";
import { usuario } from "./types/usuario";
import { userType } from "./types/userType";

const app = express();

app.use(express.json());
app.use(cors());

// app.post('/user', async (req: Request, res: Response) => {
//     try {
//         const { name, email, age, type } = req.body;

//         if (!name || !email || !age || !type) {
//             res.statusCode = 400;
//             throw new Error("Preencha todos os campos.");
//         }

//         if(type != userType.ADMIN || type != userType.USER){
//             res.statusCode = 400;
//             throw new Error("Tipo de usuario não permitido");
//         }

//         const id = Date.now() + Math.random().toString();

//         // const novoUsuario: usuario = {
//         //     id,
//         //     name,
//         //     email,
//         //     age,
//         //     type
//         // }
//         // const novoUsuario: usuario = {
//         //     id: id,
//         //     name: name,
//         //     email: email,
//         //     age: age,
//         //     type: type
//         // }

//         await connection.raw(`
//             insert into usuarios (id, name, age, email, type)
//             values (
//                 "${id}",
//                 "${name}",
//                 ${age},
//                 "${email}",
//                 "${type}"
//             )
//             `)

//         // await connection('usuarios')
//         //     .insert({
//         //         id,
//         //         name,
//         //         email,
//         //         age,
//         //         type
//         //     });

//         res.status(201).send("Usuário criado com sucesso!");
//     } catch (error: any) {
//         console.log(error);
//         res.send(error.message || error.sqlMessage);
//     }
// });

app.get("/user", async (req: Request, res: Response) => {
    try {
        const usuarios = await connection.raw(`
            SELECT * FROM usuarios;
            `);
        res.send(usuarios[0]);
    } catch (error: any) {
        res.send(error.message || error.sqlMessage);
    }
})

app.post('/user', async (req: Request, res: Response) => {
    try {
        const { name, age, email, type } = req.body;

        if (!name || !age || !email || !type) {
            res.status(422);
            throw new Error("Favor preencher todos os campos");
        }
        
        if(type != userType.ADMIN && type != userType.USER){
            res.status(401);
            throw new Error("Campo de user type inválido");
        }

        const id = Date.now() + Math.random().toString()

        await connection.raw(`
            INSERT into usuarios (id, name, age, email, type)
            values (
                "${id}",
                "${name}",
                ${age},
                "${email}",
                "${type}"
            )
            `)

        res.status(201).send(`Usuário ${id} criado com sucesso`);

    } catch (error: any) {
        if(error.sqlMessage){
            res.status(500);
        }
        res.send(error.message || error.sqlMessage);
    }
})













// app.get("/user", async (req: Request, res: Response) => {
//     try {
//         const usuarios: usuario[] = await connection.raw(`
//             SELECT * from usuarios
//             `)
//         res.send(usuarios[0])
//     } catch (error: any) {
//         res.send(error.message || error.sqlMessage)
//     }
// })


// enum userType {
//     ADMIN = "ADMIN",
//     USER = "USER"
// }
// type usuario = {
//     id: string,
//     name: string,
//     email: string,
//     age: number,
//     type: userType
// }


// app.get("/user", async (req: Request, res: Response) => {
//     try {
//         const usuarios: usuario[] = await connection.raw(`
//         SELECT * FROM usuarios
//         `)
//         res.send(usuarios[0]);
//     } catch (error: any) {
//         res.send(error.message || error.sqlMessage);
//     }
// })

const server = app.listen(process.env.PORT || 3003, () => {
    if (server) {
        const address = server.address() as AddressInfo;
        console.log(`Server is running in http://localhost:${address.port}`);
    } else {
        console.error(`Failure upon starting server.`);
    }
});
