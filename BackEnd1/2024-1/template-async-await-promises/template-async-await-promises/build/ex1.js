"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const baseURL_1 = require("./baseURL");
// use o método then para imprimir no terminal a resposta da requisição.
axios_1.default.get(`${baseURL_1.baseURL}/subscriber`)
    .then(res => console.log(res.data));
console.log("Fazendo algo");
// tail pokemons.txt | grep "pikachu"
