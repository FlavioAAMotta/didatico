public class Pilha{
   private String[] elementos;
   private static int TAMANHO_LIMITE = 1000;
   private int topo;
   
   public Pilha(){
      elementos = new String[TAMANHO_LIMITE];
      topo = -1;
   }
   
   //Empilhar    (Push)
   //Recebe um elemento (String)
   //Verifica se a pilha está cheia
   //Adiciona na posição ++topo
   public void empilhar(String novoElemento){
      if(topo-1 == TAMANHO_LIMITE){
         System.out.println("PILHA CHEIA");
      }else{
         elementos[++topo] = novoElemento;
      }
   }
   
   //Desempilhar (Pop)
   //Verifica se a pilha está vazia
   //Armazena em variável o valor do elemento
   //Remove o elemento topo--
   //Retorna o valor do elemento
   public String desempilhar(){
      if(topo == -1){
         System.out.println("PILHA VAZIA!");
         return null;
      }else{
         return elementos[topo--];
      }
   }
   
   public String espiar(){
      return elementos[topo];
   }
}