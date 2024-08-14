"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const baseURL_1 = require("./baseURL");
const newNews = {
    title: "Homem morde cachorro",
    content: "Homem raivoso morde cachorro tranquilo"
};
const createNews = (news) => {
    return axios_1.default.put(`${baseURL_1.baseURL}/news`, news);
};
const getAllSubscribers = () => {
    return axios_1.default.get(`${baseURL_1.baseURL}/subscriber`)
        .then(res => res.data);
};
const getSubscribersIds = (subscribers) => {
    return subscribers.map((subscriber) => {
        return subscriber.id;
    });
};
const notifyAllSubscribers = (subscribersIds) => {
    subscribersIds.push("idInexistente");
    for (const id of subscribersIds) {
        const user = {
            subscriberId: id,
            message: "Notícia nova criada"
        };
        axios_1.default.post(`${baseURL_1.baseURL}/notification`, user)
            .then(() => console.log(`Notificação enviada para a ${id}`))
            .catch(() => console.log(`Erro no ${id}`));
    }
};
// [
//   '1',
//   '1698783560083',
//   '1698783574005',
//   '1698783593654',
//   '1698784196604',
//   '1698784236624',
//   'idInexistente'
// ]
createNews(newNews) // criar noticia
    .then(getAllSubscribers) // buscar assinantes
    .then(getSubscribersIds) // extrair id's (etapa síncrona)
    .then(notifyAllSubscribers); // enviar notificacoes
console.log("Olar");
