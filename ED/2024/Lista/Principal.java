public class Principal{
   public static void main(String[] args){
      int numero = 1;
      Lista alunos = new Lista();
      Lista professores = new Lista();
      alunos.adicionarComeco("Joao");
      alunos.adicionarComeco("Micael");
      alunos.adicionarComeco("Pedro");
      alunos.adicionarComeco("Marco");
      alunos.adicionarUltimoElemento("Lucas");
      alunos.imprimirLista();
   }
}