import express from 'express'
import cors from 'cors'
import { Request, Response } from 'express'

const app = express()

app.use(express.json())
app.use(cors())

app.get("/", (req:Request, res:Response) =>{
    let dadoDeConsulta = req.query.dado;
    res.status(404)
    // res.send("Olar")
})

app.listen(3003, () => {
    console.log("Servidor rodando http://localhost:3003")
})