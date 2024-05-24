public class No{
    private String local;
    private int indice;
    private No esquerda;
    private No direita;

    public No(String local, int indice){
        this.local = local;
        this.indice = indice;
        this.esquerda = null;
        this.direita = null;
    }

    public String getLocal(){
        return this.local;
    }

    public No getEsquerda(){
        return this.esquerda;
    }

    public No getDireita(){
        return this.direita;
    }

    public int getIndice(){
        return this.indice;
    }

    public void setEsquerda(No esquerda){
        this.esquerda = esquerda;
    }

    public void setDireita(No direita){
        this.direita = direita;
    }
}