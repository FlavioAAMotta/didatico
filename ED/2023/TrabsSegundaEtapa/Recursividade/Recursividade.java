public class Recursividade {

    public boolean testesFatorial() {
        if (fatorial(0) != 1) {
            System.out.println("Erro no fatorial de 0");
            return false;
        }
        if (fatorial(1) != 1) {
            System.out.println("Erro no fatorial de 1");
            return false;
        }
        if (fatorial(5) != 120) {
            System.out.println("Erro no fatorial de 5");
            return false;
        }
        if (fatorial(10) != 3628800) {
            System.out.println("Erro no fatorial de 10");
            return false;
        }
        return true;
    }

    private int fatorial(int n) {
        if (n == 0) {
            return 1;
        }
        return n * fatorial(n - 1);
    }

    public boolean testesFibonacci() {
        if (fibonacci(0) != 0) {
            System.out.println("Erro no fibonacci de 0");
            return false;
        }
        if (fibonacci(1) != 1) {
            System.out.println("Erro no fibonacci de 1");
            return false;
        }
        if (fibonacci(5) != 5) {
            System.out.println("Erro no fibonacci de 5");
            return false;
        }
        if (fibonacci(10) != 55) {
            System.out.println("Erro no fibonacci de 10");
            return false;
        }
        return true;
    }

    private int fibonacci(int n) {
        if (n == 0 || n == 1) {
            return 1;
        }
        return fibonacci(n - 1) + fibonacci(n - 2);
    }

    public boolean testesMultiplicacao() {
        if (multiplicacao(0, 0) != 0) {
            System.out.println("Erro na multiplicacao de 0 por 0");
            return false;
        }
        if (multiplicacao(0, 1) != 0) {
            System.out.println("Erro na multiplicacao de 0 por 1");
            return false;
        }
        if (multiplicacao(1, 0) != 0) {
            System.out.println("Erro na multiplicacao de 1 por 0");
            return false;
        }
        if (multiplicacao(1, 1) != 1) {
            System.out.println("Erro na multiplicacao de 1 por 1");
            return false;
        }
        if (multiplicacao(5, 5) != 25) {
            System.out.println("Erro na multiplicacao de 5 por 5");
            return false;
        }
        if (multiplicacao(10, 10) != 100) {
            System.out.println("Erro na multiplicacao de 10 por 10");
            return false;
        }
        return true;
    }

    private int multiplicacao(int a, int b) {
        if (b == 0) {
            return 0;
        }
        return a + multiplicacao(a, b - 1);
    }
}
