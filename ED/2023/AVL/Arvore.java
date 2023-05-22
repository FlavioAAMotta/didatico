public class Arvore {
    private No raiz;

    public Arvore() {
        this.raiz = null;
    }

    public No getRaiz() {
        return raiz;
    }

    public int altura() {
        return altura(this.raiz);
    }

    private int altura(No no) {
        if (no == null) {
            return -1;
        } else {
            return 1 + Math.max(altura(no.getEsq()), altura(no.getDir()));
        }
    }

    public void inserir(int elemento) {
        No novo = new No(elemento);
        if (raiz == null) {
            raiz = novo;
        } else {
            inserirComFatorDeBalanceamento(raiz, novo);
        }
    }

    private void inserirComFatorDeBalanceamento(No atual, No novo){
        if (novo.getElemento() < atual.getElemento()) {
            if (atual.getEsq() == null) {
                atual.setEsq(novo);
            } else {
                inserirComFatorDeBalanceamento(atual.getEsq(), novo);
            }
        } else {
            if (atual.getDir() == null) {
                atual.setDir(novo);
            } else {
                inserirComFatorDeBalanceamento(atual.getDir(), novo);
            }
        }
        atual.setFatorBalanceamento(altura(atual.getDir()) - altura(atual.getEsq()));
    }
}
