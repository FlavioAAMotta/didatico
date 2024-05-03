public class Arvore{
    private No raiz;

    public Arvore(){
        //this.raiz = new No();
    }
    
    public void inserir(int valor){
      if(raiz == null){
         raiz = new No(valor);
         raiz.setBalanceamento(0);
      }else{
         No novo = new No(valor);
         inserir(novo,raiz);
      }
    }
    
    private void inserir(No novo, No raiz){
     if(novo.getValor() < raiz.getValor()){
         if(raiz.getEsquerda() == null){
             novo.setBalanceamento(0);
             raiz.setEsquerda(novo);
             raiz.setBalanceamento(calculaBalanceamento(raiz));
         }else{
             inserir(novo, raiz.getEsquerda());
             raiz.setBalanceamento(calculaBalanceamento(raiz));
         }
     }else{
         if(raiz.getDireita() == null){
             novo.setBalanceamento(0);
             raiz.setDireita(novo);
             raiz.setBalanceamento(calculaBalanceamento(raiz));
         }else{
             inserir(novo, raiz.getDireita());
             raiz.setBalanceamento(calculaBalanceamento(raiz));
         }
      }
    }
    
    
    private int calculaBalanceamento(No raiz){
      if(raiz.getEsquerda() == null && raiz.getDireita() == null){
         return 0;
      }else{
         int alturaEsquerda = calcularAltura(raiz.getEsquerda());
         int alturaDireita = calcularAltura(raiz.getDireita());
         return alturaDireita - alturaEsquerda;
      }
    }
    
    public int contarNos(){
      return contarNos(this.raiz);
    }
    
    public int calcularAltura(){
      return calcularAltura(raiz);
    }
    
    private int calcularAltura(No raiz){
      if(raiz == null){
         return 0;
      }else{
         return Math.max(calcularAltura(raiz.getEsquerda()), calcularAltura(raiz.getDireita())) + 1;
      }
    }
    
    private int contarNos(No raiz){
      if(raiz.getEsquerda() == null && raiz.getDireita() == null){
         return 1;
      }
      if(raiz.getEsquerda() == null){
          return contarNos(raiz.getDireita()) + 1;
      }
      if(raiz.getDireita() == null){
          return contarNos(raiz.getEsquerda()) + 1;
      }else{
         return contarNos(raiz.getEsquerda()) + contarNos(raiz.getDireita())+1;
      }
    }
    
    private int contarNos2(No raiz){
      int tamanhoEsquerda = 0;
      int tamanhoDireita = 0;
      if(raiz.getEsquerda() == null){
         tamanhoEsquerda = 0;
      }else{
         tamanhoEsquerda = contarNos2(raiz.getEsquerda());
      }
      if(raiz.getDireita() == null){
         tamanhoDireita = 0;
      }else{
         tamanhoDireita = contarNos2(raiz.getDireita());
      }
      return tamanhoEsquerda + tamanhoDireita + 1;
    }
}