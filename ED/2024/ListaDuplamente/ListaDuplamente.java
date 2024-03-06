public class ListaDuplamente{
   public int tamanho;
   public NoDuplamente cabeca;
   public NoDuplamente cauda;
   
   public ListaDuplamente(){
      tamanho = 0;
      cabeca = new NoDuplamente(null);
      cauda = new NoDuplamente(null);
      cabeca.proximo = cauda;
      cauda.anterior = cabeca;
   }
   
   public void inserirInicio(Aluno aluno){
      NoDuplamente novo = new NoDuplamente(aluno);
      novo.proximo = cabeca.proximo;
      novo.anterior = cabeca;
      
      cabeca.proximo.anterior = novo;
      cabeca.proximo = novo;
      tamanho++;
   }
}