import axios from "axios"
import { baseURL } from "./baseURL"

// use o método then para imprimir no terminal a resposta da requisição.

axios.get(`${baseURL}/subscriber`)
    .then(res => console.log(res.data))

console.log("Fazendo algo");
// tail pokemons.txt | grep "pikachu"