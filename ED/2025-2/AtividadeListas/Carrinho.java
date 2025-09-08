public class Carrinho{
   private NoProduto cabeca;
   private NoProduto cauda;

   public void adicionarProduto(String nome, int quantidade){
      NoProduto atual = cabeca;
      boolean encontrado = false;
      while(atual != null){
         if(atual.getNome() == nome){
            encontrado = true;
            int quantidadeAtual = atual.getQuantidade();
            atual.setQuantidade(quantidadeAtual + quantidade);
         }
         atual = atual.getProximo();
      }
      if(!encontrado){
         atual = cauda;
         NoProduto novo = new NoProduto(nome, quantidade);
         atual.setProximo(novo);
         novo.setAnterior(atual);
         cauda = atual.getProximo();
      }
   }
}