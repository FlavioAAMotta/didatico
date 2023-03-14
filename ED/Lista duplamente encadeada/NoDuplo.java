public class NoDuplo{
   private double valor;
   private NoDuplo anterior;
   private NoDuplo proximo;
   
   public void setValor(double valor){
      this.valor = valor;
   }
   
   public double getValor(){
      return this.valor;
   }
   
   public NoDuplo getAnterior(){
      return this.anterior;
   }
   
   public NoDuplo getProximo(){
      return this.proximo;
   }
   
   public void setAnterior(NoDuplo anterior){
      this.anterior = anterior;
   }
   
   public void setProximo(NoDuplo proximo){
      this.proximo = proximo;
   }
   
}