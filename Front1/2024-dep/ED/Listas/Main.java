public class Main{
   public static void main(String[] args){
      ListaSimplesmente lista = new ListaSimplesmente();
      lista.inserirInicio("João");
      lista.inserirInicio("Davi");
      lista.inserirInicio("Pedro");
      System.out.println("Elemento removido: " + lista.removerInicio());
   }
}