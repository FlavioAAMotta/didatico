public class No{
   public int valor;
   public No proximo;
   
   public No(){
      valor = 0;
      proximo = null;
   }

   public No(int valor){
      this.valor = valor;
      this.proximo = null;
   }
}