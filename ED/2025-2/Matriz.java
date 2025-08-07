public class Matriz{
   //Imprimir matriz
   //Procurar ocorrencia
   //Multiplicar matrizes
   
   public static void main(String[] args){
      int[][] matriz1 = {{2,4},{3,2}};
      int[][] matriz2 = {{2,4},{3,2}};
      int[][] matriz3 = {{2,4,6},{1,3,2}};
      
      System.out.println("Deve imprimir true:" + procurarOcorrencia(3,matriz1));
   }
}