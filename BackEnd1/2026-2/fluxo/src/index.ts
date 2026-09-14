import express from "express";
import cors from "cors";
// import usuariosRoutes from "./routes/usuarios.routes";

// Este arquivo ja esta completo. Voce nao precisa (e nao deve)
// alterar nada aqui para fazer o exercicio: seu trabalho e
// implementar os handlers em src/routes/usuarios.routes.ts.

const app = express();

// Converte o body das requisicoes recebidas para o formato JSON,
// disponibilizando-o em req.body dentro dos handlers.
app.use(express.json());

// Libera o acesso da API a partir de paginas hospedadas em outra
// origem (ex: o front rodando localmente em outra porta).
app.use(cors());

// Registra todas as rotas de /users definidas no arquivo de rotas.
// app.use(usuariosRoutes);

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`);
});