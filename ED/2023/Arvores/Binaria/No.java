public class No{
    private No esquerda;
    private No direita;
    private int valor;

    public No(int valor){
        this.valor = valor;
        this.esquerda = null;
        this.direita = null;
    }

    public int getValor(){
        return this.valor;
    }

    public void setValor(int valor){
        this.valor = valor;
    }

    public void setEsquerda(No esquerda){
        this.esquerda = esquerda;
    }
    public No getEsquerda(){
        return this.esquerda;
    }

    public void setDireita(No direita){
        this.direita = direita;
    }
    public No getDireita(){
        return this.direita;
    }

    
}