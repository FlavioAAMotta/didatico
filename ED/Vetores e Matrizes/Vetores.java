import java.util.*;

public class Vetores{
   
   public static void buscarNota(int[] notas){
      Scanner numeroDigitado = new Scanner(System.in);
      System.out.print("Digite uma nota a ser buscada: ");
      int numeroBuscado = numeroDigitado.nextInt();
      
      for(int nota : notas){
         if(nota == numeroBuscado){
            System.out.println("Numero encontrado");
         }
      }
   }
   
   public static void main(String[] args){
      int[] notas = new int[5];
      notas[0] = 7;
      notas[1] = 8;
      notas[2] = 5;
      System.out.println(notas[7]);
      Scanner numeroDigitado = new Scanner(System.in);
      System.out.println("Digite um valor");
      notas[3] = numeroDigitado.nextInt();
      for(int i = 0; i < notas.length; i++){
         System.out.println(notas[i]);
      }
      
      boolean continua = true;
      while(continua){ // while(continua == true)
         buscarNota(notas);
         System.out.print("Deseja continuar? \n 0 - sair \n 1 - continuar");
         int opcao = numeroDigitado.nextInt();
         if(opcao == 0){
            continua = false;
         }
      }
   }
}