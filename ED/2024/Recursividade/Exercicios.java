public class Exercicios{

   /*
      Exercício 1
      Faça uma função recursiva que calcula 
      a divisão usando subtrações sucessivas
      15%3
      15 - 3 -> +1
      12 - 3 -> +1
      9  - 3 -> +1
      6  - 3 -> +1
      3  - 3 -> +1
      0 
   */
   public static int divisao(int divisor, int dividendo){
      //preciso encontrar o caso trivial
      if(divisor < dividendo){
         return 0;
      }
      //Preciso retornar a chamada da propria funcao diminuindo o problema
      return divisao(divisor-dividendo, dividendo) + 1;
   }

   /*
   Exercicio 2
   Faça uma função recursiva que calcula o resto 
   de uma divisão usando subtrações sucessivas
   10 % 3 = 1
      10 - 3
      7  - 3
      4  - 3
      1
   15 % 3 = 0
      15 - 3
      12 - 3
      9  - 3
      6  - 3
      3  - 3
      0
   */
   public static int mod(int dividendo, int divisor){
      //Caso trivial
      if(dividendo < divisor){
         return dividendo;
      }
      //dividendo -= divisor; Poderia fazer assim
      return mod(dividendo-divisor,divisor);
      //Retornar uma chamada recursiva com uma diminuição do tamanho do problema
   }
   
   /*
      Exercício 4
      Faça uma função recursiva que calcula a quantidade de caracteres em uma string
      teste +1
      este  +1
      ste   +1
      te    +1
      e     +1
      ""    trivial
   */
   public static int calcularTamanhoString(String palavra){
      //Preciso encontrar o caso trivial
      if(palavra == ""){
         return 0;
      }
      //Preciso retornar a chamada da propria funcao diminuindo o tamanho do problema
      return calcularTamanhoString(palavra.substring(1))+1;
   }

   public static void main(String[] args){
      System.out.println(mod(10,3));
      System.out.println(mod(15,3));
      System.out.println(mod(47,13));
      System.out.println(divisao(15,3));
      System.out.println(divisao(4,11));
      String teste = "teste";
      System.out.println(calcularTamanhoString(teste));
   }
}