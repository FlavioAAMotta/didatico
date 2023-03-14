public class Vetores{

    // Método que recebe um vetor e retorna a soma dos elementos
    public static int somatorioVetor(int[] vetor){
        int soma = 0;
        for(int i = 0; i < vetor.length; i++){
            soma += vetor[i];
        }
        return soma;
    }

    public static void main(String[] args){
        // Declaração e inicialização de uma matriz
        int[][] matriz = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
        // Declaração de uma matriz de strings sem inicialização:
        String[][] matrizString;
        // Declaração e com definição de tamanho de uma matriz de double:
        double[][] matrizDouble = new double[3][3];

        // Acessando um elemento da matriz:
        System.out.println(matriz[0][0]); // 1
        // Alterando um elemento da matriz:
        matriz[0][0] = 10;
        // For para percorrer a matriz de inteiros e imprimir seus valores:
        for(int i = 0; i < matriz.length; i++){
            for(int j = 0; j < matriz[i].length; j++){
                System.out.print(matriz[i][j] + " ");
            }
            System.out.println();
        }
        // Procurando um elemento na matriz:
        int procurado = 3;
        for(int i = 0; i < vetorInt.length; i++){
            if(vetorInt[i] == procurado){
                System.out.println("Elemento encontrado na posição " + i);
            }
        }



        System.out.println("Tamanho do vetor de inteiros: " + vetorInt.length);
        System.out.println("Tamanho do vetor de strings: " + vetorString.length);
        System.out.println("Tamanho do vetor de double: " + vetorDouble.length);

    }
}