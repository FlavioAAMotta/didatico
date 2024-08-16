public class Lista{
   public No inicio;
   public int tamanho;
   
   public Lista(){
      tamanho = 0;
      inicio = new No();
   }

   public void inserirNoInicio(String nome){
      No novo = new No(nome);
      novo.proximo = inicio.proximo;
      inicio.proximo = novo;
   }
}