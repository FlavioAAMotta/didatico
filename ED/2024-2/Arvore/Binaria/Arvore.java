public class Arvore{
    private No raiz;

    public Arvore(){

    }

    public void adicionar(int valor){
        No novo = new No(valor);
        if(raiz == null){
            raiz = novo;
        }else{
            adicionar(novo, raiz);
        }
    }

    private void adicionar(No novo, No atual){
        if(novo.getVal() <= atual.getVal()){//ir para esquerda
            if(atual.getEsq() != null){
                adicionar(novo, atual.getEsq());
            }else{
                atual.setEsq(novo);
            }
        }else{ //Ir para direita
            if(atual.getDir() != null){
                adicionar(novo, atual.getDir());
            }else{
                atual.setDir(novo);
            }
        }
    }
    public boolean verificarValor(int valor){
        return verificarValor(valor, raiz);
    }
    private boolean verificarValor(int valor, No atual){

    }
}