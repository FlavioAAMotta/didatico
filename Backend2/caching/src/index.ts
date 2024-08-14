import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";
import axios from "axios";
import NodeCache from "node-cache";
import { AddressInfo } from "net";

const app = express();
const URL_API = "https://mqjnto3qw2.execute-api.us-east-1.amazonaws.com/default";
const myCache = new NodeCache({ stdTTL: 600, checkperiod: 60 });  // Tokens geralmente têm vida curta, ajuste conforme necessário.

app.use(express.json());
app.use(cors());

app.get("/playlist/:id", async (req: Request, res: Response) => {
  try {
    const playlistId = req.params.id;
    const token = await getTokenCached();
    const response = await axios.get(`${URL_API}/playlist/${playlistId}`, {
      headers: {
        Authorization: token,
      },
    });
    const songs = response.data.songs;
    const songsPromises = songs.map(async (songId: string) => {
      return await getSongByIdCached(songId, token);
    });
    response.data.songs = await Promise.all(songsPromises);
    res.send(response.data);
  } catch (e: any) {
    res.send(e.sqlMessage || e.message);
  }
});

// Endpoint para obter uma música por ID com caching de token e dados da música
app.get("/:id", async (req: Request, res: Response) => {
  try {
    const songId = req.params.id;
    const token = await getTokenCached();
    const song = await getSongByIdCached(songId, token);
    res.send(song);
  } catch (e: any) {
    res.send(e.sqlMessage || e.message);
  }
});

// Função para obter um token e armazená-lo em cache
async function getTokenCached(): Promise<string> {
  const tokenKey = 'api_token';
  let token = myCache.get(tokenKey);

  if (!token) {
    const response = await axios.post(`${URL_API}/user/login`, {
      email: "test@test.com",
      password: "test",
    });
    token = response.data.token;
    myCache.set(tokenKey, token, 300);  // Cache o token por 5 minutos ou conforme a validade do token
  }

  return token as string;
}

// Função modificada para buscar música usando o token armazenado em cache
async function getSongByIdCached(id: string, token: string) {
  const songKey = `song_${id}`;
  let song = myCache.get(songKey);

  if (!song) {
    const response = await axios.get(`${URL_API}/song/${id}`, {
      headers: {
        Authorization: token,
      },
    });
    song = response.data;
    myCache.set(songKey, song, 3600);  // Cache a música por 1 hora
  }

  return song;
}

const server = app.listen(process.env.PORT || 3003, () => {
  const address = server.address() as AddressInfo;
  console.log(`Server is running in http://localhost:${address.port}`);
});
