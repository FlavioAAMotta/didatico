public class Main{

   public static void metodoA(){
      metodoB();
   }
   
   public static void metodoB(){
      metodoC();
      metodoD();
   }
   
   public static void metodoC(){
   }
   
   public static void metodoD(){
   }
   
   

   public static void main(String[] args){
      metodoA();
   }
}