
import { AlunoData } from "../data/AlunoData";

export class AlunoBusiness {
    alunoData = new AlunoData()
    create = async (nome: string, email: string) => {
        if (!email || !nome) {
            return "Erro";
        }
        
        const aluno = await this.alunoData.getAlunoByEmail(email);
        
        if(aluno){
            console.log('existe')
            return {message: "Email já cadastrado no banco"}
        }

        const id = Math.random() *10000;
        console.log(id);
        this.alunoData.criarAluno(id, nome, email);

        return {id, nome, email}
    }
}
