"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const getAllSubscribers = () => __awaiter(void 0, void 0, void 0, function* () {
    const subscribers = yield axios_1.default.get(`${baseURL_1.baseURL}/subscriber`);
    return subscribers.data;
});
const getSubscribersIds = (subscribers) => {
    return subscribers.map((subscriber) => {
        return subscriber.id;
    });
};
const notifyAllSubscribers = (subscribersIds) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // subscribersIds.push("idInexistente");
        console.log(subscribersIds);
        const requests = subscribersIds.map(id => axios_1.default
            .post(`${baseURL_1.baseURL}/notification`, {
            subscriberId: id,
            message: "Notícia nova criada"
        }));
        console.log(yield Promise.all(requests));
        console.log("Notificações enviadas");
    }
    catch (error) {
        console.log(`Erro`);
    }
});
createNews(newNews) // criar noticia
    .then(getAllSubscribers) // buscar assinantes
    .then(getSubscribersIds) // extrair id's (etapa síncrona)
    .then(notifyAllSubscribers); // enviar notificacoes
console.log("Olar");
