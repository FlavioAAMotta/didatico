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
         System.out.println("Lista Vazia");
      }else{
         No atual = cabeca;
         while(atual != null){
            System.out.println(atual.nome);
            atual = atual.proximo;
         }
      }
   }
}