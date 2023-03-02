public class Lista{
   private No cabeca;
   private No cauda;
   private int tamanho;
   
   public Lista(){
      this.cabeca = new No();
      this.cauda = new No();
      cabeca.setProximo(cauda);
      this.tamanho = 0;
   }
   
   public void addFirst(String elemento){
      No novo = new No();
      novo.setNome(elemento);
      novo.setProximo(cabeca.getProximo());
      cabeca.setProximo(novo);
      tamanho += 1;
   }
}