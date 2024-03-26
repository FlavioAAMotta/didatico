public class Matriz {

  public static int[][] matriz1 = {
    { 1, 2, 3, 4 },
    { 5, 6, 7, 8 },
    { 9, 10, 11, 12 },
    { 13, 14, 15, 16 },
  };

  /*************** Metodos Ja Implementados Como Exemplo ***************/
  public static void buscaNumero(int[][] matriz, int num) {
    for (int i = 0; i < matriz.length; i++) {
      for (int j = 0; j < matriz[i].length; j++) {
        if (num == matriz[i][j]) {
          System.out.println("Achou na posicao [" + i + "][" + j + "]!");
        }
      }
    }
  }

  // Metodo para imprimir os elementos da diagonal principal ja funcionando
  public static void imprimirDiagonalPrincipal(int[][] matriz) {
    for (int i = 0; i < matriz.length; i++) {
      for (int j = 0; j < matriz[i].length; j++) {
        if (i == j) {
          System.out.print(matriz[i][j] + " ");
        }
      }
    }
    System.out.println(); // Pule para a proxima linha apos imprimir a diagonal
  }

  /*********************************************************************/

  // Exercicio 1: Impressao de Matriz
  public static void imprimirMatriz(int[][] matriz) {
    // Implemente a logica para imprimir os elementos da matriz aqui
  }

  // Exercicio 2: Soma de Elementos
  public static int somarMatriz(int[][] matriz) {
    // Implemente a logica para calcular a soma dos elementos da matriz aqui
    return 0; // Altere o retorno para o resultado correto
  }

  // Exercicio 3: Maior Valor
  public static int encontrarMaiorValor(int[][] matriz) {
    // Implemente a logica para encontrar o maior valor na matriz aqui
    return 0; // Altere o retorno para o resultado correto
  }

  // Exercicio 4: Transposicao de Matriz
  public static int[][] transporMatriz(int[][] matriz) {
    int[][] transposta;
    int numLinhas = matriz.length;
    int numColunas = matriz[0].length;
    transposta = new int[numColunas][numLinhas];
    //int[][] transposta = new int[matriz[0].length][matriz.length];

    for(int i = 0; i< numLinhas; i++){
        for(int j = 0; j < numColunas; j++){
            transposta[j][i] = matriz[i][j];
        }
    }

    return transposta;
  }

  // Exercicio 5: Multiplicacao de Matrizes
  public static int[][] multiplicarMatrizes(int[][] matriz1, int[][] matriz2) {
    // Implemente a logica para multiplicar as duas matrizes aqui
    return null; // Altere o retorno para o resultado correto
  }

  public static void main(String[] args) {
    buscaNumero(matriz1, 8);
    imprimirDiagonalPrincipal(matriz1);

    // Teste dos exercicios
    imprimirMatriz(matriz1); // Deve imprimir a matriz inteira
    System.out.println(somarMatriz(matriz1)); // Deve imprimir 136
    System.out.println(encontrarMaiorValor(matriz1)); // Deve imprimir 16
    imprimirMatriz(transporMatriz(matriz1)); // Deve imprimir a matriz transposta
    imprimirMatriz(multiplicarMatrizes(matriz1, matriz1)); // Deve imprimir a matriz resultante da multiplicacao
  }
}
