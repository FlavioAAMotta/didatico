public class Matriz{

   public static void buscaNumero(int[][] matriz, int num){
      //System.out.println(matriz.length);
      //System.out.println(matriz[0].length);
      for(int i = 0; i < matriz.length; i++){
         for(int j = 0; j < matriz[i].length; j++){
            if(num == matriz[i][j]){
               System.out.println("Achou!");
            }
         }
      }
   }

   public static void main(String[] args){
      int[][] matriz = {{1,2},{4,5},{7,8}};
      buscaNumero(matriz, 8);
   }

}