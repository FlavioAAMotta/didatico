import axios from "axios"
import { baseURL } from "./baseURL"

type subscriber = {
  id: string,
  name: string,
  email: string
}

type news = {
  title: string,
  content: string
}

const newNews = {
  title: "Homem morde cachorro",
  content: "Homem raivoso morde cachorro tranquilo"
}

const createNews = (news: news) => {
  return axios.put(`${baseURL}/news`, news);
}

const getAllSubscribers = async (): Promise<subscriber[]> => {
  const subscribers = await axios.get(`${baseURL}/subscriber`)
  return subscribers.data as subscriber[];
}

const getSubscribersIds = (subscribers: any) => {
  return subscribers.map((subscriber: any) => {
    return subscriber.id
  })
}

const notifyAllSubscribers = async (subscribersIds: string[]): Promise<void> => {
  try {
    // subscribersIds.push("idInexistente");
    console.log(subscribersIds)
    const requests = subscribersIds.map(id => axios
      .post(`${baseURL}/notification`, {
        subscriberId: id,
        message: "Notícia nova criada"
      }))
    console.log(await Promise.all(requests))
    console.log("Notificações enviadas")
  } catch (error) {
    console.log(`Erro`)
  }
}

createNews(newNews)                // criar noticia
  .then(getAllSubscribers)      // buscar assinantes
  .then(getSubscribersIds)      // extrair id's (etapa síncrona)
  .then(notifyAllSubscribers)   // enviar notificacoes

console.log("Olar")