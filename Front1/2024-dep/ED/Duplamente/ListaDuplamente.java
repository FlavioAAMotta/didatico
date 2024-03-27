public class ListaDuplamente{
   public int tamanho;
   public No cabeca;
   public No cauda;
   
   public ListaDuplamente(){
      tamanho = 0;
      cabeca.proximo = cauda;
      cauda.anterior = cabeca;
   }
   
   public inserirInicio(String nome){
      No novo = new No();
      novo.nome = nome;
      No anterior = cabeca;
      No proximo = cabeca.proximo;
      
      //novo.proximo
      novo.proximo = proximo;
      //novo.anterior
      novo.anterior = anterior;
      //de quem novo será proximo
      anterior.proximo = novo;
      //de quem novo será anterior
      proximo.anterior = novo;
      
      tamanho++;
      
   }
}