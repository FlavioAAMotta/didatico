public class Recursivos{
   // Preciso definir o caso trivial]
   // Preciso reduzir o problema para um subconjunto dele mesmo na chamada recursiva
   public static int fatorial(int n){
      if(n == 0){
         return 1;
      }else{
         return n * fatorial(n-1);         
      }
   }
   
   public static int mult(int a, int b){
      if(a == 0){
         return 0;
      }else if(a==1){
         return b;
      }else{
         return b + mult(a-1,b);
      }
   }
   
   //f(1) e f(2) = (1)
   //f(n) = f(n-1) + f(n-2)
   public static int fibonacci(int n){
      if( n == 1 || n == 2){
         return 1;
      }
      else{
         return fibonacci(n-1) + fibonacci(n-2);
      }
   }
}