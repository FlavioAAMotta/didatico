public class SolucaoExercicios {

    public static void main(String[] args){
        int[][] matriz1 = {
        {1,2},
        {3,4}
        };

        int[][] matriz2 = {
        {5,6},
        {7,8}
        };

        int[][] identidade = {
        {1,0,0},
        {0,1,0},
        {0,0,1}
        };

        // Matriz 1
        // 1 2
        // 3 4
        
        // Matriz 1 transposta
        // 1 3
        // 2 4

        // Matriz 2
        // 5 6
        // 7 8
        
        // Matriz resultado da soma
        // 6  8
        // 10 12

        imprimirSomaDeMatrizes(matriz1, matriz2); // Resultado: 6 8 10 12
        transporMatriz(matriz1); // Resultado: 1 3 2 4
        imprimirMaiorElemento(matriz1); // Resultado: Maior elemento: 4, Linha: 1, Coluna: 1
        verificarMatrizIdentidade(matriz1); // Resultado: false
        verificarMatrizIdentidade(identidade); // Resultado: true
     }

    // Subturma A
    
    public static void imprimirMatriz(int[][] matriz){
      for(int i = 0; i < matriz.length; i++){
         for(int j = 0; j < matriz[i].length; j++){
            System.out.print(matriz[i][j]);
         }
         System.out.println();
      }
    }
    
    // Exercício 1: Soma de Matrizes
    // Dadas duas matrizes de inteiros de mesmo tamanho, crie um programa em Java que calcule a soma dessas duas matrizes e imprima o resultado.
    public static void imprimirSomaDeMatrizes(int[][] matriz1, int[][] matriz2) {
        int numeroLinhas = matriz1.length;
        int numeroColunas = matriz1[0].length;
        int[][] matrizSoma = new int[numeroLinhas][numeroColunas];

        for (int i = 0; i < numeroLinhas; i++) {
            for (int j = 0; j < numeroColunas; j++) {
                matrizSoma[i][j] = matriz1[i][j] + matriz2[i][j];
            }
        }

        imprimirMatriz(matrizSoma);
    }

    // Exercício 2: Transposição de Matriz
    // Escreva um programa em Java que leia uma matriz de inteiros e gere sua matriz transposta (a matriz gerada pela troca de linhas por colunas).
    public static int[][] transporMatriz(int[][] matriz) {
        int numeroLinhas = matriz.length;
        int numeroColunas = matriz[0].length;
        int[][] matrizTransposta = new int[numeroColunas][numeroLinhas];

        for (int i = 0; i < numeroLinhas; i++) {
            for (int j = 0; j < numeroColunas; j++) {
                matrizTransposta[j][i] = matriz[i][j];
            }
        }

        return matrizTransposta;
    }

    // Exercício 3: Maior Elemento da Matriz
    // Crie um programa em Java que encontre e imprima o maior elemento de uma matriz de inteiros e suas coordenadas (linha e coluna) na matriz.
    public static void imprimirMaiorElemento(int[][] matriz) {
        int maior = matriz[0][0];
        int linha = 0;
        int coluna = 0;

        for (int i = 0; i < matriz.length; i++) {
            for (int j = 0; j < matriz[i].length; j++) {
                if (matriz[i][j] > maior) {
                    maior = matriz[i][j];
                    linha = i;
                    coluna = j;
                }
            }
        }

        System.out.println("Maior elemento: " + maior);
        System.out.println("Linha: " + linha);
        System.out.println("Coluna: " + coluna);
    }


    // Exercício 4: Verificação de Matriz Identidade
    // Escreva um programa em Java que verifique se uma matriz quadrada (mesmo número de linhas e colunas) é uma matriz identidade. Uma matriz identidade é
    // aquela em que todos os elementos da diagonal principal são 1 e os demais elementos são 0.
    public static boolean verificarMatrizIdentidade(int[][] matriz) {
        for (int i = 0; i < matriz.length; i++) {
            for (int j = 0; j < matriz[i].length; j++) {
                if (i == j && matriz[i][j] != 1) {
                    return false;
                } else if (i != j && matriz[i][j] != 0) {
                    return false;
                }
            }
        }
        return true;
    }

    // Subturma B

    // Exercício 1: Diagonal Principal de uma Matriz
    // Desenvolva um programa em Java que leia uma matriz quadrada de inteiros e
    // imprima os elementos da diagonal principal.
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

    // Exercício 2: Verificação de Matriz Simétrica
    // Escreva um programa em Java que determine se uma matriz quadrada é simétrica.
    // Uma matriz é simétrica se `matriz[i][j]` é igual a `matriz[j][i]` para todos
    // `i` e `j`.
    public static boolean verificarSimetria(int[][] matriz) {
        for (int i = 0; i < matriz.length; i++) {
            for (int j = 0; j < matriz[i].length; j++) {
                if (matriz[i][j] != matriz[j][i]) {
                    return false;
                }
            }
        }
        return true;
    }

    // Exercício 3: Soma das Linhas e Colunas
    // Crie um programa em Java que, dada uma matriz de inteiros, calcule e imprima
    // a soma dos elementos de cada linha e de cada coluna.
    public static void calcularSomaLinhasColunas(int[][] matriz) {
        int[] somaLinhas = new int[matriz.length];
        int[] somaColunas = new int[matriz[0].length];

        for (int i = 0; i < matriz.length; i++) {
            for (int j = 0; j < matriz[i].length; j++) {
                somaLinhas[i] += matriz[i][j];
                somaColunas[j] += matriz[i][j];
            }
        }

        for (int i = 0; i < matriz.length; i++) {
            System.out.println("Soma da linha " + i + ": " + somaLinhas[i]);
        }

        for (int i = 0; i < matriz[0].length; i++) {
            System.out.println("Soma da coluna " + i + ": " + somaColunas[i]);
        }
    }

    // Exercício 4: Matriz de Rotação
    // Implemente um programa em Java que rotacione uma matriz quadrada de inteiros
    // em 90 graus no sentido horário.
    public static int[][] rotacionarMatriz(int[][] matriz) {
        int n = matriz.length;
        int[][] matrizRotacionada = new int[n][n];

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                matrizRotacionada[j][n - 1 - i] = matriz[i][j];
            }
        }

        return matrizRotacionada;
    }
}
