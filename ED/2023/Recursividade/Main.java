public class Main{
   public static void main(String[] args){
      long start = System.currentTimeMillis();
      System.out.println(Recursivos.fibonacci(55));
      long end = System.currentTimeMillis();
      System.out.println(end - start);
   }
}