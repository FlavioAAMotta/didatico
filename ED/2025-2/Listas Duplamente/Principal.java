public class Principal{
   public static void main(String[] args){
      Lista numeros = new Lista();
      long tempoInicio = System.nanoTime();
      for(int i = 0; i < 100000000; i++){
         numeros.adicionarNoFim(i);
     }
     long tempoFim = System.nanoTime();
     System.out.println("Tempo total: "+ ((tempoFim - tempoInicio)));
   }
}