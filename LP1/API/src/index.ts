import express, { Request, Response } from "express"
import { AddressInfo } from "net";
import cors from "cors";
import dotenv from "dotenv";
import { playlists } from "./playlists";

dotenv.config();

const app = express();
app.use(cors())
app.use(express.json());

app.get("/test", (req, res) => {
  res.send("Hello World!");
});


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
  const nome = req.body.nome
  const dono = req.body.owner
  const playlist = { id: 20, name: nome, owner: dono, tracks: [] }
  playlists.push(playlist)
  res.end()
}
app.post("/playlists", addPlaylist)

const addTrack = async (req: Request, res: Response) => {
  const owner = req.params.user
  const { playlistName, trackName, artist, album, duration, url } = req.body
  const track = { id: 20, name: trackName, artist, album, duration, url }

  const playlist: any = playlists.filter((addedPlaylist) => {
    return addedPlaylist.owner === owner && addedPlaylist.name === playlistName
  })
  playlist.tracks.push(track)
  res.status(201).send()
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

const server = app.listen(process.env.PORT || 3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server running at http://localhost:${address.port}`);
  } else {
    console.error(`Failure initializing server.`);
  }
});
