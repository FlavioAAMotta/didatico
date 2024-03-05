public class Principal{
   public static void main(String[] args){
     ListaDuplamente alunos = new ListaDuplamente();
     Aluno novoAluno = new Aluno();
     novoAluno.nome = "Joao";
     novoAluno.matricula = "123";
     alunos.inserirInicio(novoAluno);
     novoAluno.nome = "Pedro";
     novoAluno.matricula = "124";
     alunos.inserirInicio(novoAluno);
     
   }
}