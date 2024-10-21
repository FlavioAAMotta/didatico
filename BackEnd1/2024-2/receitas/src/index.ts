import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";

import { AddressInfo } from "net";
import connection from "./connection";

const app = express();

app.use(express.json());
app.use(cors());

app.get('/recipes', async (req: Request, res: Response)=>{
  try{
    const title = req.query.title || '%';
    const limit = req.query.limit || 3;
    const order = req.query.order as string || "ASC";
    const offset = req.query.offset || 0;
    const sort = req.query.sort as string || 'title';

    if(order != "ASC" && order !="DESC"){
      res.status(402).send("Deve ser decrescente ou crescente")
    }

    if(Number(title.length) < 3 && title!='%'){
      res.status(411).send("Por favor digite um título com mais de 3 caracteres")
    }

    if(isNaN(Number(limit))){
      res.status(422).send("Por favor digite um numero para limit")
    }

    const receitas = await connection('recipes')
      .where('title', 'like', `%${title}%`)
      .limit(Number(limit))
      .orderBy(sort, order)
      .offset(Number(offset))

    res.send(receitas);
  }catch(error:any){
    res.send(error.sqlMessage || error.message);
  }
})

const server = app.listen(process.env.PORT || 3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost:${address.port}`);
  } else {
    console.error(`Failure upon starting server.`);
  }
});




// example recipes?title=queijo&sort=title&order=DESC&limit=5&offset=0
  // app.get("/recipes", async (req: Request, res: Response) => {
  //   try {
  //     const title = req.query.title || "%";
  //     const sort = req.query.sort || "title";
  //     const order = req.query.order || "ASC";
  //     const limit = req.query.limit || "5";
  //     const offset = req.query.offset || "0";
  
  //     if (typeof title !== "string") {
  //       throw new Error("Invalid title");
  //     }
  
  //     if(sort !== "title" && sort !== "created_at"){
  //       throw new Error("Invalid sort");
  //     }
  
  //     if(order !== "ASC" && order !== "DESC"){
  //       throw new Error("Invalid order");
  //     }
  
  //     if(isNaN(Number(limit))){
  //       throw new Error("Invalid limit");
  //     }
  
  //     if(isNaN(Number(offset))){
  //       throw new Error("Invalid offset");
  //     }
  
  //     const receitas = await connection("recipes").where(
  //       "title",
  //       "like",
  //       `%${title}%`
  //     ).orderBy(sort, order)
  //     .limit(Number(limit))
  //     .offset(Number(offset));
  //     // const receitas = await connection("recipes").where({title})
  
  //     if (!receitas.length) {
  //       res.statusCode = 404;
  //       throw new Error("Recipe not found");
  //     }
  //     res.send(receitas);
  //   } catch (e: any) {
  //     res.send(e.sqlMessage || e.message);
  //   }
  // });