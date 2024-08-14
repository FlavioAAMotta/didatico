import express from "express";
import cors from "cors";

import { AddressInfo } from "net";
import { users } from "./data";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello from Express");
});

app.get("/users", (req, res) => {
  res.send(users);
});

app.get("/users/:userId", (req, res) => {
  // const user = users.find((user) => user.id === req.params.userId);
  const userId = req.params.userId;
  for(let i = 0; i < users.length; i++){
    if(users[i].id === userId){
      res.status(200).send(users[i]);
    }
  }
  res.status(404).send("Id inexistente")
});

app.post("/users/:userId/playlists", (req, res) => {
  try {
    const userIndex = users.findIndex((u) => u.id === req.params.userId);
    if (userIndex === -1) {
      res.statusCode = 404;
      throw new Error("User not found");
    }
    if (!req.body.name) {
      res.statusCode = 422;
      throw new Error("Missing name");
    }
    const newPlaylist = {
      id: Date.now().toString(),
      name: req.body.name,
      tracks: [],
    };
    users[userIndex].playlists.push(newPlaylist);
    res.status(201).send("Playlist created successfully");
  } catch (error: any) {
    res.send(error.message);
  }
});

app.put("/users/:userId/playlists/:playlistId", (req, res) => {
    try {
        const userIndex = users.findIndex((u) => u.id === req.params.userId);
        if (userIndex === -1) {
            res.statusCode = 404;
            throw new Error("User not found");
        }
        const playlistIndex = users[userIndex].playlists.findIndex((p) => p.id === req.params.playlistId);
        if (playlistIndex === -1) {
            res.statusCode = 404;
            throw new Error("Playlist not found");
        }
        if (!req.body.name) {
            res.statusCode = 400;
            throw new Error("Missing name");
        }
        users[userIndex].playlists[playlistIndex].name = req.body.name;
        res.status(200).send("Playlist updated successfully");
    } catch (error: any) {
        res.send(error.message);
    }
});

app.delete("/users/:userId/playlists/:playlistId", (req, res) => {
    try {
        const userIndex = users.findIndex((u) => u.id === req.params.userId);
        if (userIndex === -1) {
            res.statusCode = 404;
            throw new Error("User not found");
        }
        const playlistIndex = users[userIndex].playlists.findIndex((p) => p.id === req.params.playlistId);
        if (playlistIndex === -1) {
            res.statusCode = 404;
            throw new Error("Playlist not found");
        }
        users[userIndex].playlists.splice(playlistIndex, 1);
        res.status(200).send("Playlist deleted successfully");
    } catch (error: any) {
        res.send(error.message);
    }
});

const server = app.listen(process.env.PORT || 3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost:${address.port}`);
  } else {
    console.error(`Failure upon starting server.`);
  }
});
