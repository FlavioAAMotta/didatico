
public class No {
    private int elemento;
    private No esq;
    private No dir;
    private int fatorBalanceamento;

    public No(int elemento) {
        this.elemento = elemento;
        this.esq = null;
        this.dir = null;
        this.fatorBalanceamento = 0;
    }

    public int getElemento() {
        return elemento;
    }

    public No getEsq() {
        return esq;
    }

    public No getDir() {
        return dir;
    }

    public void setElemento(int elemento) {
        this.elemento = elemento;
    }

    public void setEsq(No esq) {
        this.esq = esq;
    }

    public void setDir(No dir) {
        this.dir = dir;
    }

    public int getFatorBalanceamento() {
        return fatorBalanceamento;
    }   

    public void setFatorBalanceamento(int fatorBalanceamento) {
        this.fatorBalanceamento = fatorBalanceamento;
    }

    @Override
    public String toString() {
        return "No{" +
                "elemento=" + elemento +
                ", esq=" + esq +
                ", dir=" + dir +
                ", fatorBalanceamento=" + fatorBalanceamento +
                '}';
    }
}
