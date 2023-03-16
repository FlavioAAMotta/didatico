public class Principal{
   public static void main(String[] args){
      Lista listaDeAlunos = new Lista();
      listaDeAlunos.addLast("Joao");
      listaDeAlunos.printTamanho();
      listaDeAlunos.addLast("Pedro");
      listaDeAlunos.printTamanho();
      listaDeAlunos.addLast("Victor");
      listaDeAlunos.printTamanho();
      listaDeAlunos.addLast("Maycon");
      listaDeAlunos.printTamanho();
      System.out.println("----------------------------------");
      listaDeAlunos.removeFirst();
      listaDeAlunos.printTamanho();
      listaDeAlunos.removeFirst();
      listaDeAlunos.printTamanho();
      listaDeAlunos.removeFirst();
      listaDeAlunos.printTamanho();
      listaDeAlunos.removeFirst();
      listaDeAlunos.printTamanho();
      listaDeAlunos.removeFirst();
      listaDeAlunos.print();
   }
}