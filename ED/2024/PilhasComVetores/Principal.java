public class Principal{
   public static void main(String[] args){
      Pilha pilha = new Pilha();
      pilha.empilhar("elemento 1");
      pilha.empilhar("elemento 2");
      pilha.empilhar("elemento 3");
      
      pilha.desempilhar();
      pilha.empilhar(pilha.desempilhar());
      String elemento = pilha.desempilhar();
      
      System.out.println(pilha.espiar());
      System.out.println(elemento);
      
   }
}