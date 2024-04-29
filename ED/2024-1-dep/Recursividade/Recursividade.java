public class Recursividade{
   public static int somar(int a, int b){
      if(b == 1){
         return a;
      }
      int somaAnterior = somar(a,b-1);
      return somaAnterior + a;
   }
   public static void main(String[] args){
      System.out.println(somar(10,3));
   }
}