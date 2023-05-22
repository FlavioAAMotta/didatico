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
    atual.setFator(altura(atual.getDireita()) - altura(atual.getEsquerda()));
  }

  public No buscar(int valor) {
    if (raiz == null) {
      return null;
    } else {
      return buscar(raiz, valor);
    }
  }

  private No buscar(No atual, int valor) {
    if (atual.getValor() == valor) {
      return atual;
    } else if (valor < atual.getValor()) {
      return buscar(atual.getEsquerda(), valor);
    } else {
      return buscar(atual.getDireita(), valor);
    }
  }

  // Método iterativo para inserir um nó em uma árvore binária de pesquisa
  public void inserirIterativo(int valor) {
    No novoNo = new No(valor);
    if (this.raiz == null) {
      this.raiz = novoNo;
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

  //Método recursivo para buscar um nó
  public No buscar(int valor) {
    if (raiz == null) {
      return null;
    } else {
      return buscar(raiz, valor);
    }
  }

  private No buscar(No atual, int valor) {
    if (atual.getValor() == valor) {
      return atual;
    } else {
      if (valor < atual.getValor()) {
        if (atual.getEsquerda() != null) {
          return buscar(atual.getEsquerda(), valor);
        } else {
          return null;
        }
      } else {
        if (atual.getDireita() != null) {
          return buscar(atual.getDireita(), valor);
        } else {
          return null;
        }
      }
    }
  }

  public boolean ehEstritamenteBinaria() {
    if (raiz == null) {
      return true;
    } else {
      return ehEstritamenteBinaria(raiz);
    }
  }

  private boolean ehEstritamenteBinaria(No atual) {
    if (atual.getDireita() != null && atual.getEsquerda() != null) {
      return (
        ehEstritamenteBinaria(atual.getEsquerda()) &&
        ehEstritamenteBinaria(atual.getDireita())
      );
    } else if (atual.getEsquerda() == null && atual.getDireita() == null) {
      return true;
    } else {
      return false;
    }
  }

  private int altura() {
    if (raiz == null) {
      return -1;
    } else {
      altura(raiz);
    }
  }

  public int altura(No atual) {
    if (atual == null) {
      return -1;
    } else {
      return (
        Math.max(altura(atual.getEsquerda()), altura(atual.getDireita())) + 1
      );
    }
  }
}
