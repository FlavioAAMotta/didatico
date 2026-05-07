import { Request, Response } from 'express'
import { AlunoBusiness } from '../business/AlunoBusiness';


export class AlunoController {
    alunoBusiness = new AlunoBusiness()
    create = async (req: Request, res: Response) => {
        const { nome, email } = req.body;
        const aluno = this.alunoBusiness.create(nome, email);
        res.send(aluno);
    }
}
