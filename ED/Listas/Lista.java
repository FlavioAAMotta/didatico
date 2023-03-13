public class Lista{
   private No cabeca;
   private No cauda;
   private int tamanho;
   
   public void printTamanho(){
      System.out.println("Tamanho: " + tamanho);
   }
   
   public Lista(){
      this.cabeca = new No();
      this.cauda = new No();
      cabeca.setProximo(cauda);
      this.tamanho = 0;
   }
   
   public void addFirst(String elemento){
      No novo = new No();
      novo.setNome(elemento);
      novo.setProximo(cabeca.getProximo());
      cabeca.setProximo(novo);
      tamanho += 1;
   }
   
   public void print(){
      if(tamanho != 0){
         for(No atual = cabeca.getProximo(); atual != cauda; atual = atual.getProximo()){
            System.out.println(atual.getNome());
         }
      }
   }
   
   public void addLast(String elemento){
      if(tamanho == 0){
         addFirst(elemento);
      }else{
         No novo = new No();
         novo.setNome(elemento);
         for(No atual = cabeca.getProximo(); atual != cauda; atual = atual.getProximo()){
            if(atual.getProximo() == cauda){
               atual.setProximo(novo);
               novo.setProximo(cauda);
               tamanho++;
               atual.setProximo(atual.getProximo());
            }
         }   
      }
   }
   
   public void removeFirst(){
      if(tamanho == 0){
         System.out.println("Luiz G...");
      }
      else{
         No primeiro = cabeca.getProximo();
         cabeca.setProximo(primeiro.getProximo());
         tamanho--;
      }
   }
}