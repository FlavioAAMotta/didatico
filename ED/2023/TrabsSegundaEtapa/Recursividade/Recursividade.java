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

    // Faça uma função recursiva que calcula a divisão usando subtrações sucessivas
    public boolean testesDivisao() {
        if (divisao(0, 1) != 0) {
            System.out.println("Erro na divisao de 0 por 1");
            return false;
        }
        if (divisao(1, 1) != 1) {
            System.out.println("Erro na divisao de 1 por 1");
            return false;
        }
        if (divisao(5, 5) != 1) {
            System.out.println("Erro na divisao de 5 por 5");
            return false;
        }
        if (divisao(10, 10) != 1) {
            System.out.println("Erro na divisao de 10 por 10");
            return false;
        }
        if (divisao(10, 5) != 2) {
            System.out.println("Erro na divisao de 10 por 5");
            return false;
        }
        if (divisao(10, 3) != 3) {
            System.out.println("Erro na divisao de 10 por 3");
            return false;
        }
        return true;
    }

    int divisao(int a, int b) {
        if(b == 0) {
            return 0;
        }
        if (a < b) {
            return 0;
        }
        return 1 + divisao(a - b, b);
    }

    // Faça uma função recursiva que calcula o resto de uma divisão usando
    // subtrações sucessivas
    public boolean testesResto() {
        if (resto(0, 1) != 0) {
            System.out.println("Erro no resto de 0 por 1");
            return false;
        }
        if (resto(1, 1) != 0) {
            System.out.println("Erro no resto de 1 por 1");
            return false;
        }
        if (resto(5, 5) != 0) {
            System.out.println("Erro no resto de 5 por 5");
            return false;
        }
        if (resto(10, 10) != 0) {
            System.out.println("Erro no resto de 10 por 10");
            return false;
        }
        if (resto(10, 5) != 0) {
            System.out.println("Erro no resto de 10 por 5");
            return false;
        }
        if (resto(10, 3) != 1) {
            System.out.println("Erro no resto de 10 por 3");
            return false;
        }
        return true;
    }

    private int resto(int a, int b) {
        if(b == 0) {
            return 0;
        }
        if (a < b) {
            return a;
        }
        return resto(a - b, b);
    }

    // Faça uma função recursiva que calcula a quantidade de caracteres em uma
    // string
    public boolean testesTamanho() {
        if (tamanho("") != 0) {
            System.out.println("Erro no tamanho de ''");
            return false;
        }
        if (tamanho("a") != 1) {
            System.out.println("Erro no tamanho de 'a'");
            return false;
        }
        if (tamanho("ab") != 2) {
            System.out.println("Erro no tamanho de 'ab'");
            return false;
        }
        if (tamanho("abc") != 3) {
            System.out.println("Erro no tamanho de 'abc'");
            return false;
        }
        if (tamanho("3211") != 4) {
            System.out.println("Erro no tamanho de 'abcd'");
            return false;
        }
        return true;
    }

    private int tamanho(String palavra) {
        if (palavra.equals("")) {
            return 0;
        }
        return 1 + tamanho(palavra.substring(1));
    }

}
