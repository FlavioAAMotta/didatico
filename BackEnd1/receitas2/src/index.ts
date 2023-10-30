import 'dotenv/config';
import express, { Request, Response } from "express";
import cors from "cors";

import { AddressInfo } from "net";
import connection from "./connection";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/recipes", async (req: Request, res: Response) => {
  try {
    const title = req.query.title || "%";
    const sort = req.query.sort || "title";
    const order = req.query.order || "ASC";
    const offset = req.query.offset || 0;
    const limit = req.query.limit || 10;

    if (sort != "title" && sort != "createdAt") {
      res.status(403); // Fingindo que é esse status
      throw new Error("Wrong sort value")
    }
    if (order != "ASC" && order != "DESC") {
      res.status(403);
      throw new Error("Wrong order value")
    }

    const recipes = await connection("recipes").where(
      "title",
      "like",
      `%${title}%`
    ).orderBy(sort, order).limit(Number(limit)).offset(Number(offset));
    if (recipes.length == 0) {
      res.status(404);
      throw new Error("Recipe not found");
    }
    res.send(recipes);
  } catch (e: any) {
    res.send(e.sqlMessage || e.message);
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
