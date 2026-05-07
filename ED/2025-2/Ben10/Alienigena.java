public class Alienigena{
   private String nome;
   private Alienigena proximo;
   
   public Alienigena(String nome){
      this.nome = nome;
   }
   
   public String getNome(){
      return this.nome;
   }
   
   public Alienigena getProximo(){
      return this.proximo;
   }
   
   public void setProximo(Alienigena proximo){
      this.proximo = proximo;
   }
}