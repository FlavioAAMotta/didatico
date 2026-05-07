public class Matriz{

   public static void imprimirMatriz(int[][] m){
      System.out.println("Tamanho da matriz(?): " + m.length);
      for(int i=0; i<m.length; i++){
         System.out.println("Tamanho da linha " + i + " (?): " + m[i].length);
         for(int j=0; j<m[i].length; j++){
            System.out.print(m[i][j] + " ");
         }
         System.out.println("");
      }
   }

   public static void main(String[] args){
      int[][] matriz1 = {{2,4,3},{3,2}};
      imprimirMatriz(matriz1);
   }
}