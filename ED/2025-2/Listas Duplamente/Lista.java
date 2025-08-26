public class Lista{
   private No cabeca;
   private No cauda;
   private int tamanho;
   
   public void adicionarNoFim(int novoNumero){
      No novoNo = new No();
      novoNo.numero = novoNumero;
      if(tamanho == 0){
         cabeca = novoNo;
         cauda = novoNo;
         tamanho++;
      }else{
         No atual = cauda;
         atual.proximo = novoNo;
         novoNo.anterior = cauda;
         cauda = novoNo;
         tamanho++;
      }
   }
   
   //Adicionar no inicio
   //Imprimir lista invertida
   //Adicionar no indice (recebe um indice e adiciona nele, ex: 
   // 4 -> 6 -> 8 adicionarNoIndice(5,2) -> adicione o numero 5 no indice 2
   // resultado 4 -> 6 -> 5 -> 8
}