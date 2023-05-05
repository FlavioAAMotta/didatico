public class Arvore {

  private No raiz;

  public Arvore() {
    this.raiz = null;
  }

  public void setRaiz(No raiz) {
    this.raiz = raiz;
  }

  public No getRaiz() {
    return this.raiz;
  }

  public void inserir(int valor) {
    No novo = new No(valor);
    if (raiz == null) {
      this.raiz = novo;
    } else {
      inserir(raiz, novo);
    }
  }

  private void inserir(No atual, No novo) {
    if (novo.getValor() < atual.getValor()) {
      if (atual.getEsquerda() == null) {
        atual.setEsquerda(novo);
      } else {
        inserir(atual.getEsquerda(), novo);
      }
    } else {
      if (atual.getDireita() == null) {
        atual.setDireita(novo);
      } else {
        inserir(atual.getDireita(), novo);
      }
    }
  }
}
