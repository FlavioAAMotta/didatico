import java.util.Random;

public class Tempos {

    public static void fLinear(int[] vetor) {
        int operacoes = 0;
        for (int i = 0; i < vetor.length; i++){
            operacoes++;
        }
        System.out.println("Número de operações (linear): " + operacoes);
    }

    public static void fQuadratica(int[] vetor) {
        int operacoes = 0;
        for (int i = 0; i < vetor.length; i++) {
            for (int j = 0; j < vetor.length; j++){
                operacoes++;
            }
        }
        System.out.println("Número de operações (quadrática): " + operacoes);
    }

    public static void fCubica(int[] vetor) {
        int operacoes = 0;
        for (int i = 0; i < vetor.length; i++) {
            for (int j = 0; j < vetor.length; j++) {
                for (int k = 0; k < vetor.length; k++) {
                    operacoes++;
                }
            }
        }
        System.out.println("Número de operações (cúbica): " + operacoes);
    }

    public static void fLogaritmica(int[] vetor) {
        int operacoes = 0;
        for (int i = 1; i < vetor.length; i = i * 2) {
            operacoes++;
        }
        System.out.println("Número de operações (logarítmica): " + operacoes);
    }

    public static void fLinearLogaritmica(int[] vetor) {
        int operacoes = 0;
        for (int i = 0; i < vetor.length; i++) {
            for (int j = 1; j < vetor.length; j = j * 2) {
                operacoes++;
            }
        }
        System.out.println("Número de operações (linear logarítmica): " + operacoes);
    }

    public static void fExponencial(int[] vetor) {
        int operacoes = 0;
        for (int i = 0; i < Math.pow(2, vetor.length); i++) {
            operacoes++;
        }
        System.out.println("Número de operações (exponencial): " + operacoes);
    }

    public static void fFatorial(int[] vetor) {
        int operacoes = 0;
        for (int i = 0; i < fatorial(vetor.length); i++) {
            operacoes++;
        }
        System.out.println("Número de operações (fatorial): " + operacoes);
    }

    public static int fatorial(int n) {
        if (n == 0) {
            return 1;
        }
        return n * fatorial(n - 1);
    }

    public static int[] generateVector(int size) {
        Random rand = new Random();
        int[] vetor = new int[size];
        for (int i = 0; i < size; i++) {
            vetor[i] = rand.nextInt(size);
        }
        return vetor;
    }

    public static void main(String[] args) {
        int[] sizes = {5,10,20,25,30}; // Tamanhos diferentes para testar

        for (int size : sizes) {
            int[] vetor = generateVector(size);
            System.out.println("Tamanho do vetor: " + size);

            long tempoInicial = System.currentTimeMillis();
            fLinear(vetor);
            long tempoFinal = System.currentTimeMillis();
            System.out.println("Tempo de execução linear: " + (tempoFinal - tempoInicial) + "ms");

            tempoInicial = System.currentTimeMillis();
            fQuadratica(vetor);
            tempoFinal = System.currentTimeMillis();
            System.out.println("Tempo de execução quadrática: " + (tempoFinal - tempoInicial) + "ms");

            tempoInicial = System.currentTimeMillis();
            fCubica(vetor);
            tempoFinal = System.currentTimeMillis();
            System.out.println("Tempo de execução cúbica: " + (tempoFinal - tempoInicial) + "ms");

            tempoInicial = System.currentTimeMillis();
            fLogaritmica(vetor);
            tempoFinal = System.currentTimeMillis();
            System.out.println("Tempo de execução logarítmica: " + (tempoFinal - tempoInicial) + "ms");

            tempoInicial = System.currentTimeMillis();
            fLinearLogaritmica(vetor);
            tempoFinal = System.currentTimeMillis();
            System.out.println("Tempo de execução linear logarítmica: " + (tempoFinal - tempoInicial) + "ms");

            tempoInicial = System.currentTimeMillis();
            fExponencial(vetor);
            tempoFinal = System.currentTimeMillis();
            System.out.println("Tempo de execução exponencial: " + (tempoFinal - tempoInicial) + "ms");

            //tempoInicial = System.currentTimeMillis();
            //fFatorial(vetor);
            //tempoFinal = System.currentTimeMillis();
            //System.out.println("Tempo de execução fatorial: " + (tempoFinal - tempoInicial) + "ms");
        }
    }
}
