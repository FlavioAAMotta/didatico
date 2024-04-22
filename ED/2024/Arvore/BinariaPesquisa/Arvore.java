public class Arvore{
    private No raiz;

    public Arvore(){
        //this.raiz = new No();
    }
    
    public void inserir(int valor){
      if(raiz == null){
         raiz = new No(valor);
      }else{
         No novo = new No(valor);
         inserir(novo,raiz);
      }
    }
    
    private void inserir(No novo, No raiz){
     if(novo.getValor() < raiz.getValor()){
         if(raiz.getEsquerda() == null){
             raiz.setEsquerda(novo);
         }else{
             inserir(novo, raiz.getEsquerda());
         }
     }else{
         if(raiz.getDireita() == null){
             raiz.setDireita(novo);
         }else{
             inserir(novo, raiz.getDireita());
         }
      }
    }
}