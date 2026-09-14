public class ListaSimplesmente{
   public No cabeca;
   public int tamanho;
   
   public ListaSimplesmente(){
      this.cabeca = new No();
   }
   
   public void inserirNoInicio(int numero){
      No novoNo = new No();
      novoNo.valor = numero;
      novoNo.proximo = cabeca.proximo;
      cabeca.proximo = novoNo;
      
      tamanho++;
   }
}