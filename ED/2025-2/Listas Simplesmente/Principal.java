public class Principal{
   public static void main(String[] args){
      String nome = "Flávio";
      //tipo variavel = valor;
      Lista alunos = new Lista();
     alunos.imprimirLista();
      alunos.adicionarComeco(nome);
     alunos.adicionarComeco("Pedro");
     alunos.adicionarComeco("Maria");
     alunos.imprimirLista();
     //Maria -> Pedro -> Flávio
   }
}