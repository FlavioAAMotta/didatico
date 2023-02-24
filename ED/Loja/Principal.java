public class Principal{
   public static void main(String[] args){
      Produto primeiroProduto = new Produto();
      Produto segundoProduto = new Produto();
      Produto terceiroProduto = new Produto();
      
      primeiroProduto.nome = "Biscoito";
      segundoProduto.nome = "Queijo";
      terceiroProduto.nome = "Pão";
      
      primeiroProduto.descricao = "Bis";
      segundoProduto.descricao = "Queijo Minas";
      terceiroProduto.descricao = "Pãozin";
      
      primeiroProduto.preco = 3.5;
      segundoProduto.preco = 15;
      terceiroProduto.preco = 5;
      
      primeiroProduto.quantidade = 30;
      segundoProduto.quantidade = 0;
      terceiroProduto.quantidade = 200;
      
      System.out.println("Deve imprimir 30:" + primeiroProduto.quantidade);
      primeiroProduto.adicionarQuantidade(20);
      System.out.println("Deve imprimir 50:" + primeiroProduto.quantidade);
      terceiroProduto.removerQuantidade(50);
      System.out.println("Deve imprimir 150:" + terceiroProduto.quantidade);
   }
}