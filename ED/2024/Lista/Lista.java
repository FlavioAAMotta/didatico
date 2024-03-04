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
}