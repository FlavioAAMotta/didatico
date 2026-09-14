public class No{
   private int valor;
   private No proximo;
   
   public No(int valor){
      this.valor = valor;
   }
   
   public void setValor(int valor){
      this.valor = valor;
   }
   
   public void setProximo(No proximo){
      this.proximo = proximo;
   }
   
   public int getValor(){
      return this.valor;
   }
   
   public No getProximo(){
      return this.proximo;
   }
   
}