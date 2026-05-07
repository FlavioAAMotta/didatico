public class Lista{
   public No cabeca;
   
   public void adicionarComeco(String novoNome){
      No novoNo = new No();
      novoNo.nome = novoNome;
      if(cabeca == null){
         cabeca = novoNo;
      }else{
         novoNo.proximo = cabeca;
         cabeca = novoNo;
      }
   }
   
   public void imprimirLista(){
      if(cabeca == null){
      }else{
         No atual = cabeca;
         while(atual != null){
            System.out.print(atual.nome + " ");
            atual = atual.proximo;
         }
      }
      System.out.println();
   }
   
   public boolean buscarElemento(String nomeBuscado){
      No atual = cabeca;
      while(atual != null){
         if(atual.nome == nomeBuscado){
            return true;
         }
         atual = atual.proximo;
      }
      return false;
   }
   
   public int buscarIndiceDoElemento(String nomeBuscado){
      int contador = 0;
      No atual = cabeca;
      while(atual != null){
         if(atual.nome == nomeBuscado){
            return contador;
         }
         contador++;
         atual = atual.proximo;
      }
      return -1;
   }
   
   public void adicionarNoFinal(String novoNome){
      No novoNo = new No();
      novoNo.nome = novoNome;
      if(cabeca == null){
         cabeca = novoNo;
      }
      else{
         No atual = cabeca;
         while(atual.proximo != null){
            atual = atual.proximo;
         }
         //Tenho a certeza que estou no ultimo no
         atual.proximo = novoNo;
      }
   }
   
   public void removerInicio(){
      if(cabeca == null){
      }else{
         cabeca = cabeca.proximo;
      }
   }
   
   public void removerFim(){
      if(cabeca == null){
      }else{
         No atual = cabeca;
         while(atual.proximo.proximo != null){
            atual = atual.proximo;
         }
         atual.proximo = atual.proximo.proximo;
      }
   }
}