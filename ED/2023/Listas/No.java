public class No{
   private String nome;
   private No proximo;

   public String getNome(){
      return nome;
   }
   public No getProximo(){
      return proximo;
   }
   
   public void setNome(String nome){
      this.nome = nome;
   }
   
   public void setProximo(No proximo){
      this.proximo = proximo;
   }
   
}