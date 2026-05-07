public class No{
   private No esquerda;
   private No direita;
   private int id;
   
   public No(int id){
      this.id = id;
   }
   
   public void setEsquerda(No esquerda){
      this.esquerda = esquerda;
   }
   public void setDireita(No direita){
      this.direita = direita;
   }
   public void setId(int id){
      this.id = id;
   }
   public No getEsquerda(){
      return this.esquerda;
   }
   public No getDireita(){
      return this.direita;
   }
   public int getId(){
      return this.id;
   }
}