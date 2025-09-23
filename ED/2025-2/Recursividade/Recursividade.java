public class Recursividade{
   
   public static int fatorial(int n){
      if(n == 0){
         return 1;
      }else{
         return n * fatorial(n-1);
      }
   }
   
   //Método recursivo é composto por 3 passos
   //1- Caso base/trivial
   //2- Chamada recursiva
   //3- Diminuir o problema na chamada recursiva
   public static int multiplicacao(int a, int b){
      if(a == 0 || b == 0){
         return 0;
      }else if(a == 1){
         return b;
      }
      return multiplicacao(a-1,b) + b;
   }
   
   public static void main(String[] args){
      System.out.println(fatorial(4));
      System.out.println(multiplicacao(4,3));
   }
}