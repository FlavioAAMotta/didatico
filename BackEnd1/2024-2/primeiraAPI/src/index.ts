import express from 'express'
import cors from 'cors'
import { Request, Response } from 'express'

const app = express()

app.use(express.json())
app.use(cors())

app.put('/users/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, email } = req.body;
    const usuarioAtualizado = atualizarUsuario(id, { name, email });
    res.send(`Usuário com ID ${id} atualizado com sucesso`);
});


app.delete('/users/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    removerUsuario(id);
    res.send(`Usuário com ID ${id} removido com sucesso`);
});

  
app.listen(3003, () => {
    console.log("Server is running in http://localhost:3003");
});

