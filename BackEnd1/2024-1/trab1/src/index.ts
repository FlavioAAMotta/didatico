import express from 'express'
import cors from 'cors'
import { Request, Response } from 'express'
import { users } from "./data"

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req: Request, res: Response) => {
    res.send("Olá Mundo");
})

function getUserById(id: string) {
    for (let i = 0; i < users.length; i++) {
        if (users[i].id === id) {
            return users[i];
        }
    }
    return null;
}

app.post('/users/:userId/playlists/:playlistId/tracks', (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const playlistId = req.params.playlistId;
        const { trackName, duration } = req.body;
        if (!trackName || !duration) {
            res.status(400);
            throw new Error("Campos vazios");
        }
        if (isNaN(duration) || duration <= 0) {
            res.status(422);
            throw new Error("Unprocessable Entity, invalid duration");
        }
        const user = getUserById(userId)
        if (!user) {
            res.status(404);
            throw new Error("Usuario não encontrado");
        }
        res.send(user)
    } catch (error: any) {
        res.send(error.message)
    }
});

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})