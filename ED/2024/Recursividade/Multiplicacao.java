public class Multiplicacao{

   //b+b+b+b+b a vezes
   public static int multiplicacao(int a, int b){
      //Encontrar o caso trivial
      if(a == 1){
         return b;
      }
      //Reduzir meu problema
      return multiplicacao(a-1,b) + b;
   }

   public static void main(String[] args){
      System.out.println(multiplicacao(4,3));
   }
}