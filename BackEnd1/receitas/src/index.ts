import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";

import { AddressInfo } from "net";
import connection from "./connection";

const app = express();

app.use(express.json());
app.use(cors());

// excample recipes?title=queijo&sort=title&order=DESC&limit=5&offset=0
app.get("/recipes", async (req: Request, res: Response) => {
  try {
    const title = req.query.title || "%";
    const sort = req.query.sort || "title";
    const order = req.query.order || "ASC";
    const limit = req.query.limit || "5";
    const offset = req.query.offset || "0";

    if (typeof title !== "string") {
      throw new Error("Invalid title");
    }

    if(sort !== "title" && sort !== "created_at"){
      throw new Error("Invalid sort");
    }

    if(order !== "ASC" && order !== "DESC"){
      throw new Error("Invalid order");
    }

    if(isNaN(Number(limit))){
      throw new Error("Invalid limit");
    }

    if(isNaN(Number(offset))){
      throw new Error("Invalid offset");
    }

    const receitas = await connection("recipes").where(
      "title",
      "like",
      `%${title}%`
    ).orderBy(sort, order)
    .limit(Number(limit))
    .offset(Number(offset));
    // const receitas = await connection("recipes").where({title})

    if (!receitas.length) {
      res.statusCode = 404;
      throw new Error("Recipe not found");
    }
    res.send(receitas);
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
