public class Lista{
   public No cabeca;
   public No cauda;
   public int tamanho;
   
   public Lista(){
      cabeca = new No();
      cauda = new No();
      tamanho = 0;
   }
   
   public void adicionarComeco(String nome){
      No novo = new No(nome);
      
      if(tamanho == 0){
         novo.proximo = cauda;
         cabeca.proximo = novo;
      }else{
         novo.proximo = cabeca.proximo;
         cabeca.proximo = novo;
      }
      tamanho++;
   }
   
   public void imprimirLista(){
      if(tamanho == 0){
         System.out.println("Lista Vazia");
      }else{
         No atual = cabeca.proximo;
         while(atual != cauda){
            System.out.print(atual.nome + "-> ");
            atual = atual.proximo;
         }
         System.out.println("");
      }      
   }
   
   public void adicionarUltimoElemento(String nome){
      No novo = new No(nome);
      No atual = cabeca;
      while(atual.proximo != cauda){
         atual = atual.proximo;   
      }
      novo.proximo = cauda;
      atual.proximo = novo;
      tamanho++;
   }
   
   public void removerPrimeiroElemento(){
      if(tamanho == 0){
         System.out.println("Lista vazia");
      }else{
         //Primeiro elemento é o cabeca.proximo
         cabeca.proximo = cabeca.proximo.proximo;
      }
      tamanho--;
   }
}