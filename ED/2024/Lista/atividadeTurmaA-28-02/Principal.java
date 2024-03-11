public class Principal {
    public static void main(String[] args) {
        Lista lista = new Lista();
        // Adiciona elementos ao início da lista.
        lista.adicionarInicio(30); // Lista: 30 -> null
        lista.adicionarInicio(20); // Lista: 20 -> 30 -> null
        lista.adicionarInicio(10); // Lista: 10 -> 20 -> 30 -> null

        // Imprime a lista após a adição de três elementos.
        lista.imprimirLista(); // Saída esperada: 10 -> 20 -> 30 -> null

        lista.adicionarFim(40); // Lista: 10 -> 20 -> 30 -> 40 -> null
        
        lista.imprimirLista(); // Saída esperada: 10 -> 20 -> 30 -> null
    }
}
