import { app } from "./app";
import { alunoRouter } from "./routes/alunoRouter";

app.use('/alunos', alunoRouter)