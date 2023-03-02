public class Produto{
   public String nome;
   public String descricao;
   public double preco;
   public int quantidade;
   
   public Produto(){}
   
   public void adicionarQuantidade(int quantidade){
      this.quantidade += quantidade;
      // this.quantidade = th
   }
   
   public void removerQuantidade(int quantidade){
      this.quantidade -= quantidade;
   }
   
   @Override
   public String toString(){
      return this.nome;
   }
   
   @Override
   public boolean equals(Object obj){
      if(obj instanceof Produto){
         Produto compara = (Produto) obj;
         if(this.nome == compara.nome){
            return true;
         }
      }
      return false;
   }
}