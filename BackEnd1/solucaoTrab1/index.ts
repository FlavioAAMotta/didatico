import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

import { users } from "./data";

// Método auxiliar para encontrar um usuário pelo ID
function findUserById(userId: string) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].id === userId) {
      return { user: users[i], index: i };
    }
  }
  return null;
}

// Método auxiliar para encontrar uma playlist pelo ID
function findPlaylistById(user, playlistId: string) {
  for (let i = 0; i < user.playlists.length; i++) {
    if (user.playlists[i].id === playlistId) {
      return { playlist: user.playlists[i], index: i };
    }
  }
  return null;
}

// Método auxiliar para verificar se uma faixa já existe na playlist
function trackExistsInPlaylist(playlist, trackName: string) {
  for (let track of playlist.tracks) {
    if (track.trackName === trackName) {
      return true;
    }
  }
  return false;
}

app.post(
  "/users/:userId/playlists/:playlistId/tracks", // userId e playlistId são parâmetros da rota
  (req: Request, res: Response) => {
    try {
      const userId = req.params.userId;
      const playlistId = req.params.playlistId;
      const { trackName, duration } = req.body; // trackName e duration são parâmetros do body

      const userObj = findUserById(userId);
      if (!userObj) {
        res.status(404).send("User not found");
        return;
      }

      const playlistObj = findPlaylistById(userObj.user, playlistId);
      if (!playlistObj) {
        res.status(404).send("Playlist not found");
        return;
      }

      if (!trackName || !duration) {
        res.status(400).send("Bad Request, missing fields");
        return;
      }

      if (isNaN(duration) || duration <= 0) {
        res.status(422).send("Unprocessable Entity, invalid duration");
        return;
      }

      if (trackExistsInPlaylist(playlistObj.playlist, trackName)) {
        res.status(409).send("Conflict, track already exists");
        return;
      }

      const newTrack = {
        id: Date.now().toString(),
        trackName,
        duration,
      };

      playlistObj.playlist.tracks.push(newTrack);
      res.status(201).send("Track added successfully");
    } catch (error: any) {
      res.status(500).send(error.message);
    }
  }
);

app.listen(3003, () => {
  console.log("Server is running in http://localhost:3003");
});
