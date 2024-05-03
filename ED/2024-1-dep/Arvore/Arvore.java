public class Arvore{
   private No raiz;

   public void inserir(int valor){
    if(raiz == null){
        this.raiz = new No(valor);
    }else{
        inserir(valor, raiz);
    }
   }

   private void inserir(int valor, No raiz){
    if(valor < raiz.getValor()){
        if(raiz.getEsquerda() == null){
            raiz.setEsquerda(new No(valor));
        }else{
            inserir(valor, raiz.getEsquerda());
        }
    }
    if(valor >= raiz.getValor()){
        if(raiz.getDireita() == null){
            raiz.setDireita(new No(valor));
        }else{
            inserir(valor, raiz.getDireita());
        }
    }
   }
}