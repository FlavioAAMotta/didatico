public class Produto{
   public String nome;
   public String descricao;
   public double preco;
   public int quantidade;
   
   public void adicionarQuantidade(int quantidade){
      this.quantidade += quantidade;
      // this.quantidade = this.quantidade + quantidade
   }
   
   public void removerQuantidade(int quantidade){
      this.quantidade -= quantidade;
   }
}