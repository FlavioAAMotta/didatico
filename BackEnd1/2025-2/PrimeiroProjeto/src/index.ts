import express, { Request, Response } from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

interface Pokemon {
    id: number,
    nome: string,
    tipo: string,
    hp: number
}

let pokemons: Pokemon[] = [
    { id: 1, nome: "Pikachumbo", tipo: "Elétrico", hp:500 },
    { id: 2, nome: "Charmano", tipo: "Fogo", hp:50 },
    { id: 3, nome: "Bulbassalto", tipo: "Planta", hp:250 },
    { id: 4, nome: "Ratatatatatata", tipo: "Normal", hp:100 },
    { id: 5, nome: "Alakasamba", tipo: "Psiquíco", hp:1500 },
]

app.delete("/pokemons/:id", (req: Request, res: Response)=>{
    const id = Number(req.params);
    pokemons = pokemons.filter((pokemon)=>{
        return pokemon.id !== id;
    });
    res.status(200).send("Pokemon deletado com sucesso!")
})

app.patch("/pokemons/:id", (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const atualizacoes = req.body;

    let pokemon = pokemons.find(pkmn=> pkmn.id === id);

    if(!pokemon){
        res.status(404).send("Pokemon Não encontrado!");
    }
    pokemon = {...pokemon, ...atualizacoes};

    pokemons = pokemons.map((pkmn) => (pkmn.id === id ? pokemon : pkmn)) as Pokemon[];

    res.json(pokemon);
})

app.get("/pokemons", (req: Request, res: Response) => {
    res.status(200).json(pokemons);
})
//localhost:3000/pokemons/search?type=agua&name=star
app.get("/pokemons/search", (req: Request, res: Response) => {
    const {name, type} = req.query;
    console.log("Query parameters:", req.query);

    let pokemonsRetornados = pokemons;
    if(name){
        pokemonsRetornados = pokemons.filter((pokemon) => 
            pokemon.nome.toLowerCase().includes(name.toString().toLowerCase())
        );
    }else if(type){
        pokemonsRetornados = pokemons.filter((pokemon) => 
            pokemon.tipo.toLowerCase().includes(type.toString().toLowerCase())
        );
    }
    console.log("Pokémons encontrados:", pokemonsRetornados);
    res.status(200).json(pokemonsRetornados);
})

app.get("/pokemons/:id", (req: Request, res: Response) => {
    console.log("Entrou aqui");
    const id = Number(req.params.id);
    let pokemon;
    for (let i = 0; i < pokemons.length; i++) {
        if (pokemons[i]!.id === id) {
            pokemon = pokemons[i];
        }
    }
    res.status(200).json(pokemon);
})





app.post("/pokemons", (req: Request, res: Response) => {
    // body -> id, nome e tipo
    const {id, nome, tipo, hp} = req.body;
    let pokemonNovo:Pokemon ={
        id: id,
        nome: nome,
        tipo: tipo,
        hp: hp
    }
    pokemons.push(pokemonNovo);
    res.status(201).send("Pokemon criado");
})

app.listen(3000, () => {
    console.log("Servidor Executando")
})