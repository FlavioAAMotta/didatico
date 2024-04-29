public class No{
   private No esquerda;
   private No direita;
   private int valor;
   
   public No(int valor){
     this.valor = valor;
   }

   public int getValor(){
       return this.valor;
   }
   public No getDireita(){
       return this.direita;
   }
   public No getEsquerda(){
       return this.esquerda;
   }

   public void setValor(int valor){
       this.valor = valor;
   }
   public void setDireita(No direita){
       this.direita = direita;
   }
   public void setEsquerda(No esquerda){
       this.esquerda = esquerda;
   }
}