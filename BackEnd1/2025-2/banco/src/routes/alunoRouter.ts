import express from 'express'
import { AlunoController } from '../controller/AlunoController';

export const alunoRouter = express.Router();

const alunoController = new AlunoController();

alunoRouter.post('/', alunoController.create);
// alunoRouter.get('/', alunoController.getAll);
