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
   
   //1. Implemente uma função para calcular a altura da árvore.
   public int calcularAltura(){
      return calcularAltura(raiz);
   }
   
   private int calcularAltura(No raiz){
      if(raiz == null){
         return 0;
      }
      int alturaEsquerda = calcularAltura(raiz.getEsquerda());
      int alturaDireita = calcularAltura(raiz.getDireita());
      return Math.max(alturaEsquerda, alturaDireita) + 1;
   }
   //2. Implemente uma função para calcular a quantidade de nós na árvore.
   public int calcularNos(){
      if(raiz == null){
         return 0;
      }
      return calcularNos(raiz);
   }
   
   private int calcularNos(No raiz){
      if(ehFolha(raiz)){
         return 1;
      }
      int nosEsquerda = calcularNos(raiz.getEsquerda());
      int nosDireita = calcularNos(raiz.getDireita());
      return nosEsquerda + nosDireita + 1;
   }
   
   private boolean ehFolha(No raiz){
      if(raiz.getEsquerda() == null && raiz.getDireita() == null){
         return true;
      }else{
         return false;
      }
   }
   
   //3. Implemente uma função para buscar o menor valor da árvore
   public int buscarMenorValor(){
      if(raiz == null){
         throw new Error();
      }else{
         buscarMenorValor(raiz);
      }
   }
   
   private int buscarMenorValor(No raiz){
      if(raiz.getEsquerda() == null){
         return raiz.getId();
      }
      return buscarMenorValor(raiz.esquerda);      
   }
   
}