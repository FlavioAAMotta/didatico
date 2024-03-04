public class Main{

   public static int somarNumeros(int num1, int num2){
      int soma = num1 + num2;
      return soma;
   }

   public static void main(String[] args){
      int numero = 7;
      int outroNumero = 8;
      System.out.println(somarNumeros(outroNumero, numero));
   }
}