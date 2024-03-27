public class ListaSimplesmente{
   public No cabeca;
   public No cauda;
   public int tamanho;
   
   public ListaSimplesmente(){
      tamanho = 0;
      cabeca = new No();
      cauda = new No();
      cabeca.proximo = cauda;
   }
   
   public void inserirInicio(String nome){
      No novo = new No();
      novo.nome = nome;
      
      novo.proximo = cabeca.proximo;
      cabeca.proximo = novo;
      tamanho++;
   }
   
   public String removerInicio(){
      if(tamanho == 0){
         System.out.println("Lista vazia");
         return "Erro";
      }else{
         String elementoRemovido = cabeca.proximo.nome;
         cabeca.proximo = cabeca.proximo.proximo;
         tamanho--;
         return elementoRemovido;
      }
   }
   
}