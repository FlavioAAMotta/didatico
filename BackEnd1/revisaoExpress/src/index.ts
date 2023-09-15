import express from 'express'
import cors from 'cors'
import { Request, Response } from 'express'

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req: Request, res: Response) => {
    console.log("0");
    res.send("Olá")
})

app.get('/test/hello', (req: Request, res: Response) => {
    res.send(`Olá, mundo!`)
})

app.get('/test/:number', (req: Request, res: Response) => {
    res.send(
        `Seu número da sorte é ${Number(req.params.number) + 3}!
    `)
})



app.listen(3003, () => {
    console.log("Server is running in http://localhost:3003");
});
