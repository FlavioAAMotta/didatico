
import java.util.Random;

public class Arvore {
   private No raiz;
   // operacoes possiveis: +, -, *, /
   private static char[] operacoes = new char[] { '+', '-', '*', '/' };
   private static char[] operandos = new char[] { '1', 'X' };
   private double valorDeX;
   private int tamanho;
   private static final long seed = 42;
   private Random random = new Random(seed);

   public Arvore() {
      this.raiz = null;
      this.tamanho = 0;
   }

   public Arvore(int maxNivel) {
      this.raiz = new No();
      this.tamanho = 1;
      gerarArvore(raiz, maxNivel, 1);
   }

   public void setValorDeX(double valorDeX) {
      this.valorDeX = valorDeX;
   }

   public int getTamanho() {
      return tamanho;
   }

   public Arvore getSubArvore(int indice) {
      int[] indiceAtual = {indice}; // Usamos um array para manter a referência ao índice durante a recursão
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
      if(subArvore == null){
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

   private void gerarArvore(No raiz, int maxNivel, int nivelAtual) {
      int diferenca = maxNivel - nivelAtual;
      double probFilhos = 1.0 / Math.pow(1.1, diferenca);
      if (random.nextDouble() > probFilhos || nivelAtual == maxNivel) {
         raiz.op = operandos[(int) (random.nextInt(operandos.length))];
      } else {
         raiz.esq = new No();
         raiz.dir = new No();
         tamanho += 2;
         gerarArvore(raiz.esq, maxNivel, nivelAtual + 1);
         gerarArvore(raiz.dir, maxNivel, nivelAtual + 1);
         raiz.op = operacoes[(int) (random.nextInt(operacoes.length))];
      }
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
      if (no.op == '+') {
         return calcular(no.esq) + calcular(no.dir);
      }
      if (no.op == '-') {
         return calcular(no.esq) - calcular(no.dir);
      }
      if (no.op == '*') {
         return calcular(no.esq) * calcular(no.dir);
      }
      if (no.op == '/') {
         double divisor = calcular(no.dir);
         if (divisor == 0) {
            divisor = 1;
         }
         return calcular(no.esq) / divisor;
      }
      if (no.op == 'X') {
         return valorDeX;
      }
      return Integer.parseInt("" + no.op);
   }

   public Arvore mutar(double probabilidade) {
      return mutar(raiz, probabilidade);
   }

   private Arvore mutar(No no, double probabilidade) {
      if (no == null) {
         return null;
      }
      if (random.nextDouble() < probabilidade) {
         gerarArvore(no, 1, 1);
      } else {
         mutar(no.esq, probabilidade);
         mutar(no.dir, probabilidade);
      }
      return this;
   }
}