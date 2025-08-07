public class Vetor{

   public static void imprimirVetor(int[] vetor){
      for(int i = 0; i < vetor.length; i++){
         System.out.print(vetor[i] + ",");
      }
   }
   
   public static boolean verificarOcorrencia(int[] vetor, int nota){
      for(int i = 0; i < vetor.length; i++){
         if(vetor[i] == nota){
            return true;
         }
         return false; //1
      }
      return false; //2
   }

   public static void main(String[] args){
      int[] notas = {9,7,8,4,9};
      int[] notas2 = {8,14,9};
      imprimirVetor(notas);
      System.out.println("");
      imprimirVetor(notas2);
      
      verificarOcorrencia(notas, 4);
   }
}