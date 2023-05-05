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

  // Método recursivo para inserir um nó em uma árvore binária de pesquisa
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

  // Método iterativo para inserir um nó em uma árvore binária de pesquisa
  public void inserirIterativo(int valor) {
    No novoNo = new No(valor);
    if (this.raiz == null) {
        this.raiz = novoNo;
    } else {
        No atual = this.raiz;
        No anterior;
        while (true) {
            anterior = atual;
            if (valor <= atual.getValor()) {
                atual = atual.getEsquerda();
                if (atual == null) {
                    anterior.setEsquerda(novoNo);
                    return;
                }
            } else {
                atual = atual.getDireita();
                if (atual == null) {
                    anterior.setDireita(novoNo);
                    return;
                }
            }
        }
    }
}
}
