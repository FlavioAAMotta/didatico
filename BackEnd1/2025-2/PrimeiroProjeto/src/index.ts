import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const pokemons = [
    {nome: "Pikachumbo", tipo:"Elétrico"},
    {nome: "Charmano", tipo:"Fogo"},
    {nome: "Bulbassalto", tipo:"Planta"},
    {nome: "Ratatatatatata", tipo:"Normal"},
    {nome: "Alakasamba", tipo:"Psiquíco"},
]

app.get("/pokemons", (req, res) =>{
    res.status(200).json(pokemons);
})

app.listen(3000, ()=>{
    console.log("Servidor Executando")
})