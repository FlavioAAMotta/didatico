public class Arvore {
    private No raiz;

    public Arvore() {
        this.raiz = null;
    }

    public void imprimirCaminho(int indice) {
        imprimirCaminho(this.raiz, indice);
    }

    private void imprimirCaminho(No raiz, int indice) {
        if (raiz != null) {
            System.out.println(raiz.getLocal());
            if (indice < raiz.getIndice()) {
                imprimirCaminho(raiz.getEsquerda(), indice);
            } else {
                imprimirCaminho(raiz.getDireita(), indice);
            }

        }
    }

    public void inserir(String local, int indice) {
        inserir(this.raiz, new No(local, indice));
    }

    private void inserir(No raiz, No novo) {
        if (this.raiz == null) {
            this.raiz = novo;
        } else {
            if (novo.getIndice() < raiz.getIndice()) {
                if (raiz.getEsquerda() == null) {
                    raiz.setEsquerda(novo);
                } else {
                    inserir(raiz.getEsquerda(), novo);
                }
            } else {
                if (raiz.getDireita() == null) {
                    raiz.setDireita(novo);
                } else {
                    inserir(raiz.getDireita(), novo);
                }
            }
        }
    }
}
