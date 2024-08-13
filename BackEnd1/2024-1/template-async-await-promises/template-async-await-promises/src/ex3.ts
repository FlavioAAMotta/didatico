import axios from "axios"
import { baseURL } from "./baseURL"

type subscriber = {
  id: string,
  name: string,
  email: string
}

type news={
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

const getAllSubscribers = () => {
  return axios.get(`${baseURL}/subscriber`)
    .then(res => res.data)
}

const getSubscribersIds = (subscribers: subscriber[]) => {
  return subscribers.map((subscriber: subscriber) => {
    return subscriber.id
  })
}

const notifyAllSubscribers = (subscribersIds: string[]) => {
  subscribersIds.push("idInexistente");
  for (const id of subscribersIds) {
    const user = {
      subscriberId: id,
      message: "Notícia nova criada"
    }

    axios.post(`${baseURL}/notification`, user)
      .then(() => console.log(`Notificação enviada para a ${id}`))
      .catch(() => console.log(`Erro no ${id}`))
  }
}
// [
//   '1',
//   '1698783560083',
//   '1698783574005',
//   '1698783593654',
//   '1698784196604',
//   '1698784236624',
//   'idInexistente'
// ]
createNews(newNews)                // criar noticia
  .then(getAllSubscribers)      // buscar assinantes
  .then(getSubscribersIds)      // extrair id's (etapa síncrona)
  .then(notifyAllSubscribers)   // enviar notificacoes

console.log("Olar")