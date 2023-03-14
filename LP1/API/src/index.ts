import express from "express";
import { Request, Response } from "express";
import { AddressInfo } from "net";
import cors from "cors";
import dotenv from "dotenv";
import {playlists} from "./playlists";

dotenv.config();

const app = express();

app.get("/test", (req, res) => {
  res.send("Hello World!");
});
 

const getAllPlaylists = async (req: Request, res: Response) => {
  try {
    const result = await playlists;
    res.send(result);
  } catch (error:any) {
    res.send(error.message);
  }
};

app.get("/playlists", getAllPlaylists);

const server = app.listen(process.env.PORT || 3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server running at http://localhost:${address.port}`);
  } else {
    console.error(`Failure initializing server.`);
  }
});
