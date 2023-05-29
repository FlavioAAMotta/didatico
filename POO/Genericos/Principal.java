import java.util.*;

public class SomaNumeros {
    public double soma(List<? extends Number> numeros) {
        double soma = 0.0;
        for (Number numero : numeros) {
            soma += numero.doubleValue();
        }
        return soma;
    }
}

public class Main {
    public static void main(String[] args) {
        SomaNumeros somaNumeros = new SomaNumeros();
        List<Integer> inteiros = Arrays.asList(1, 2, 3, 4, 5);
        System.out.println(somaNumeros.soma(inteiros));  // retorna 15.0
        List<Double> doubles = Arrays.asList(1.5, 2.5, 3.5);
        System.out.println(somaNumeros.soma(doubles));  // retorna 7.5
    }
}




public class FuncoesNumericas<T extends Number> {
    private T numero1;
    private T numero2;
    public FuncoesNumericas(T numero1, T numero2) {
        this.numero1 = numero1;
        this.numero2 = numero2;
    }
    public double multiplicar() {
        return numero1.doubleValue() * numero2.doubleValue();
    }
}

public class Main {
    public static void main(String[] args) {
        FuncoesNumericas<Integer> funcoesNumericasInt = new FuncoesNumericas<>(5, 10);
        System.out.println(funcoesNumericasInt.multiplicar());

        FuncoesNumericas<Double> funcoesNumericasDouble = new FuncoesNumericas<>(5.5, 10.2);
        System.out.println(funcoesNumericasDouble.multiplicar());
    }
}


public class Principal {

  public static <T, V> void print(T printavel, int numero, V outraCoisa) {
    System.out.println(printavel);
    System.out.println(numero);
    System.out.println(outraCoisa);
  }

  public static void printList(List<?> myList) {
    System.out.println();
  }

  public static void main(String[] args) {
    List<Integer> myList = new ArrayList<>();
    myList.add(1);
    printList(myList);
    // Legume legume = new Legume("Inhame");
    // print("Grito", 5, legume);
    // print(10);
    // print(legume);
    // Printer<Integer> impressor = new Printer<>(5);
    // Printer<String> impressor2 = new Printer<>("Texto");
    // Printer<Legume> impressor3 = new Printer<>(new Legume("Abobrinha"));
    // impressor.print();
    // impressor2.print();
    // impressor3.print();

    // ArrayList<Object> alimentos = new ArrayList<>();
    // alimentos.add(new Legume("Abobrinha"));

    // Legume legume = (Legume) alimentos.get(0);
  }
}
