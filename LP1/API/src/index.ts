import express, { Request, Response } from "express"
import { AddressInfo } from "net";
import cors from "cors";
import dotenv from "dotenv";
import { playlists } from "./playlists";
import connection from "./connection";
import { generateId } from "./idGenerator";

dotenv.config();

const app = express();
app.use(cors())
app.use(express.json());


const getLuckyNumber = async (req: Request, res: Response) => {
  const luckyNumber = req.params.number
  res.send(`Seu número da sorte é: ${luckyNumber}`)
}
app.get("/lucky/test", (req: Request, res: Response) => {
  res.send("Hello World!");
});
<<<<<<< HEAD
 
=======
app.get("/lucky/:number", getLuckyNumber)









>>>>>>> 899ae8d357e18442143b625e02f88efe8fbf428c

const getAllPlaylists = async (req: Request, res: Response) => {
  try {
    const result = await playlists;
    res.send(result);
  } catch (error: any) {
    res.send(error.message);
  }
};

app.get("/playlists", getAllPlaylists);

const addPlaylist = async (req: Request, res: Response) => {
  try {
    const nome = req.body.nome
    const dono = req.body.owner
    if (!dono) {
      throw new Error("Usuario nao informado")
    }
    const playlist = { id: 20, name: nome, owner: dono, tracks: [] }
    playlists.push(playlist)
    res.end()
  }
  catch (error: any) {
    res.status(401).send(error.message)
  }
}
app.post("/playlists", addPlaylist)

const addTrack = async (req: Request, res: Response) => {
  try {
    const owner = req.params.user
    if (!owner) {
      throw new Error("Usuario nao informado")
    }
    const { playlistId, playlistName, trackName, artist, album, duration, url } = req.body
    if (!playlistId || !playlistName || !trackName || !artist || !album || !duration || !url) {
      throw new Error("Parametros faltando")
    }
    const track = { id: 22, name: trackName, artist, album, duration, url }

    const playlist = playlists.filter((playlist) => {
      return playlist.id === playlistId
    }
    )

    if (!playlist) {
      throw new Error("Playlist inexistente")
    }

    const newPlaylist: any = playlists.filter((addedPlaylist) => {
      return addedPlaylist.owner === owner && addedPlaylist.name === playlistName
    })
    newPlaylist.tracks.push(track)
    res.status(201).send()
  } catch (error: any) {

    if (error.message === "Playlist inexistente") {
      res.status(404).send(error.message);
    } else if (error.message === "Usuario nao informado") {
      res.status(401).send(error.message);
    } else if (error.message === "Parametros faltando") {
      res.status(400).send(error.message);
    } else {
      res.status(500).send("Erro inesperado")
    }
  }
}

app.post("/track/:user", addTrack)

const getAllPlaylistsFromUser = async (req: Request, res: Response) => {
  try {
    const nome = req.body.name;
    const result = playlists.filter((playlist) => { return playlist.owner === nome })
    res.send(result)
  } catch (error) {

  }
}

app.get("/user", getAllPlaylistsFromUser);

app.post("/recipes", async (req: Request, res: Response) => {
  try {
    const { title, igredients } = req.body;
    const id = generateId()

    connection("receitas").insert(
      {
        id,
        title,
        igredients
      }
    )
  } catch (error) {
    console.error(`Failure initializing server.`);
  }
})


app.get("/recipes", async (req: Request, res: Response) => {
  try {
    const title = req.query.title;
    const order = req.query.order as string || "desc";
    let limit = req.query.limit || 10;
    let offset = req.query.offset || 0;

    limit = Number(limit)
    offset = Number(offset)

    if (!title) {
      throw new Error("Título não informado")
    }
    const receitas = await connection('recipes')
      .where({ title })
      .orderBy(order)
      .limit(limit)
      .offset(offset)

    res.send(receitas)
  } catch (error) {

  }
})
const server = app.listen(process.env.PORT || 3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server running at http://localhost:${address.port}`);
  } else {
    console.error(`Failure initializing server.`);
  }
});