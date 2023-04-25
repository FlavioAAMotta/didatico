public class Principal{
   public static void main(String[] args){
   
      Produto primeiroProduto = new Produto();
      Produto segundoProduto = new Produto();
      Produto terceiroProduto = new Produto();
      
      primeiroProduto.nome = "Biscoito";
      segundoProduto.nome = "Biscoito";
      System.out.println(primeiroProduto == segundoProduto);
      
      if(primeiroProduto == segundoProduto){
         System.out.println("Iguais");
      }
      
      
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
   }
}