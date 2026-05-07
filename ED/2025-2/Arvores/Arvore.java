public class Arvore{
   private No raiz;
   
   public void inserir(int id){
      if(this.raiz == null){
         this.raiz = new No(id);
      }else{
         inserir(id, raiz);
      }
   }
   
   private void inserir(int id, No raiz){
      //Primeiro verifico se é maior ou menor
      if(id == raiz.getId()){
         return;
      }
      if(id < raiz.getId()){
         //vou para a esquerda
         //Depois verifico se pro caminho definido existe filho
         if(raiz.getEsquerda() == null){
            //Se não existir, adiciono o filho
            No novo = new No(id);
            raiz.setEsquerda(novo);
         }else{
            //Se existir filho a esquerda
            inserir(id, raiz.getEsquerda());
         }
      }else{
         //vou para a direita
         //Depois verifico se pro caminho definido existe filho
         if(raiz.getDireita() == null){
            //Se não existir, adiciono o filho
            No novo = new No(id);
            raiz.setDireita(novo);
         }else{
            //Se existir filho a direita
            inserir(id, raiz.getDireita());
         }
      }
   }
   
   public void travessiaEmOrdem(){
      if(this.raiz == null){
         System.out.println("Árvore vazia");
      }else{
         travessiaEmOrdem(raiz);
      }
   }
   
   private void travessiaEmOrdem(No raiz){
      if(raiz == null){
         return;
      }
      System.out.println(raiz.getId());
      travessiaEmOrdem(raiz.getEsquerda());
      travessiaEmOrdem(raiz.getDireita());
   }
}