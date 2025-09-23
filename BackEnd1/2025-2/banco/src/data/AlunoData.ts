import { connection } from "./connection";

export class AlunoData {

    getAlunoByEmail = async (email:string)=>{
        console.log("Buscando aluno por email");
        // await connection.raw(`SELECT * from alunos where email=${email}`);
        const user = await connection('alunos').where({email});
        return user;
    }

    criarAluno = async (id: number, nome: string, email: string) => {
        console.log("Criando aluno no BD");
        await connection('alunos').insert({ id, nome, email });
        return;
    }
}