public class Main{
   public static void main(String[] args){
      ListaEncadeada notas = new ListaEncadeada();
      notas.inserirInicio(3);
      notas.inserirInicio(13);
      notas.inserirInicio(32);
      notas.inserirFim(8);
      System.out.println(notas.buscar(13));
      System.out.println(notas.buscar(1));
   }
}