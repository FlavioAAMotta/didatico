import java.util.Random;

public class Arvore {

  private No raiz;
  // operacoes possiveis: +, -, *, /
  private static char[] operacoes = new char[] { '+', '-', '*', '/' };
  private static char[] operandos = new char[] { '1', 'X' };
  private double valorDeX;
  private int tamanho;
  private int minNivel = 3;
  private Random random = new Random();

  public Arvore() {
    this.raiz = null;
    this.tamanho = 0;
  }

  public Arvore(int maxNivel) {
    this.raiz = new No();
    this.tamanho = 1;
    gerarArvore(raiz, maxNivel, minNivel, 1);
  }

  public void setValorDeX(double valorDeX) {
    this.valorDeX = valorDeX;
  }

  public int getTamanho() {
    return tamanho;
  }

  public Arvore getSubArvore(int indice) {
    int[] indiceAtual = { indice }; // Usamos um array para manter a referência ao índice durante a recursão
    return getSubArvore(raiz, indiceAtual);
  }

  private int calcularTamanho(No no) {
    if (no == null) {
      return 0;
    }
    return 1 + calcularTamanho(no.esq) + calcularTamanho(no.dir);
  }

  private Arvore getSubArvore(No no, int[] indiceAtual) {
    if (no == null) {
      return null;
    }
    if (indiceAtual[0] == 0) {
      Arvore subArvore = new Arvore();
      subArvore.raiz = no;
      subArvore.tamanho = calcularTamanho(no); // Calcule o tamanho da subárvore
      return subArvore;
    }
    indiceAtual[0]--;
    Arvore subArvore = getSubArvore(no.esq, indiceAtual);
    if (subArvore != null) {
      return subArvore;
    }
    return getSubArvore(no.dir, indiceAtual);
  }

  public Arvore trocarSubArvore(int indice, Arvore subArvore) {
    if (subArvore == null) {
      return null;
    }
    return trocarSubArvore(raiz, indice, subArvore);
  }

  private Arvore trocarSubArvore(No no, int indice, Arvore subArvore) {
    if (no == null) {
      return null;
    }
    if (indice == 0) {
      Arvore arvore = new Arvore(1);
      arvore.raiz = subArvore.raiz;
      arvore.tamanho = subArvore.tamanho;
      return arvore;
    }
    Arvore novaArvore = trocarSubArvore(no.esq, indice - 1, subArvore);
    if (novaArvore != null) {
      no.esq = novaArvore.raiz;
      return null;
    }
    novaArvore = trocarSubArvore(no.dir, indice - 1, subArvore);
    if (novaArvore != null) {
      no.dir = novaArvore.raiz;
      return null;
    }
    return null;
  }

  private void gerarArvore(
    No noAtual,
    int maxNivel,
    int minNivel,
    int nivelAtual
  ) {
    // Verifica se ainda estamos abaixo do nível mínimo garantido de nós
    if (nivelAtual < minNivel) {
      criarFilhos(noAtual, maxNivel, minNivel, nivelAtual);
    } else {
      // Calcula a probabilidade de adicionar filhos com base no nível atual
      int niveisRestantes = maxNivel - nivelAtual;
      double probabilidadeDeFilhos = 1.0 / Math.pow(1.1, niveisRestantes);
      double valorAleatorio = random.nextDouble();

      // Decide se adiciona filhos ou define o operando atual como uma folha
      if (valorAleatorio <= probabilidadeDeFilhos && nivelAtual < maxNivel) {
        criarFilhos(noAtual, maxNivel, minNivel, nivelAtual);
      } else {
        noAtual.op = operandos[random.nextInt(operandos.length)];
      }
    }
  }

  private void criarFilhos(
    No noAtual,
    int maxNivel,
    int minNivel,
    int nivelAtual
  ) {
    // Cria os nós filhos esquerdo e direito
    noAtual.esq = new No();
    noAtual.dir = new No();
    tamanho += 2; // Atualiza o tamanho da árvore ao adicionar dois nós

    gerarArvore(noAtual.esq, maxNivel, minNivel, nivelAtual + 1);
    gerarArvore(noAtual.dir, maxNivel, minNivel, nivelAtual + 1);

    noAtual.op = operacoes[random.nextInt(operacoes.length)];
  }

  public String toString() {
    return toString(raiz);
  }

  private String toString(No no) {
    if (no == null) {
      return "";
    }
    if (no.esq == null && no.dir == null) {
      return "" + no.op;
    }
    return "(" + toString(no.esq) + no.op + toString(no.dir) + ")";
  }

  public double calcular() {
    return calcular(raiz);
  }

  private double calcular(No no) {
   if (no == null) {
       return 0;
   }
   
   if (no.esq == null && no.dir == null) {
       if (no.op == 'X') {
           return valorDeX;
       }
       if (Character.isDigit(no.op)) {
           return no.op - '0';
       }
       return 0;
   }

   double esquerda = calcular(no.esq);
   double direita = calcular(no.dir);

   switch (no.op) {
       case '+':
           return esquerda + direita;
       case '-':
           return esquerda - direita;
       case '*':
           return esquerda * direita;
       case '/':
           if (direita == 0) {
               direita = 1;
           }
           return esquerda / direita;
       default:
           return 0;
   }
}


  public Arvore mutar(double probabilidade) {
    return mutar(raiz, probabilidade);
  }

  private Arvore mutar(No no, double probabilidade) {
    if (no == null) {
      return null;
    }
    if (random.nextDouble() < probabilidade) {
      gerarArvore(no, 2, 1, 1);
    } else {
      mutar(no.esq, probabilidade);
      mutar(no.dir, probabilidade);
    }
    return this;
  }
}
