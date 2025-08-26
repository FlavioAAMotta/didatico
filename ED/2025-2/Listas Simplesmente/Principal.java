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
     alunos.buscarElemento("Pedro");
     alunos.buscarElemento("Pedr");
     System.out.println(alunos.buscarIndiceDoElemento("Pedro"));
     System.out.println(alunos.buscarIndiceDoElemento("Peo"));
     alunos.adicionarNoFinal("João");
     alunos.removerFim();
     alunos.removerInicio();
     alunos.imprimirLista();
     alunos.removerInicio();
     alunos.imprimirLista();
     alunos.removerInicio();
     alunos.imprimirLista();
     alunos.removerInicio();
     alunos.imprimirLista();
     //Maria -> Pedro -> Flávio
   }
}