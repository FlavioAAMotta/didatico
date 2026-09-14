public class ListaEncadeada{
   private int tamanho;
   private No cabeca;
   
   public ListaEncadeada(){
      tamanho = 0;
      cabeca = null;
   }
   
   public boolean ehVazia(){
      return tamanho == 0;
   }
   
   public void inserirInicio(int valor){
      No novo = new No(valor);
      novo.setProximo(cabeca);
      cabeca = novo;
      tamanho++;
   }
   
   public void inserirFim(int valor){
      No novo = new No(valor);
      No atual = cabeca;
      for(int i = 1; i< tamanho; i++){
         atual = atual.getProximo();
      }
      atual.setProximo(novo);
      
      tamanho++;
   }
   
   //Busco um valor e retorno seu índice (0-based) da lista. Se não existir, retorno -1
   public int buscar(int valor){
      No atual = cabeca;
      int contador = 0;
      while(atual != null){
         if(atual.getValor() == valor){
            return contador;
         }else{
            contador++;
         }
         atual = atual.getProximo();
      }
      return -1;
   }
   
   public void remover(int valor){
      if(ehVazia()){
         System.out.println("Vazia");
      }else if(tamanho == 1){
         if(cabeca.getValor() == valor){
            cabeca = null;   
         }else{
            System.out.println("Valor inexistente");
         }
      }else{
         No anterior = cabeca;
         No atual = cabeca.getProximo();
         while(atual != null){
            if(atual.getValor() == valor){   
               anterior.setProximo(atual.getProximo());
            }else{
               atual = atual.getProximo();
               anterior = anterior.getProximo();
            }
         }
      }
   }
}