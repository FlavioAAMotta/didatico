public class Principal {
    public static void main(String[] args) {
        Lista lista = new Lista();
         // Adiciona elementos ao início da lista.
         lista.adicionarInicio(30); // Lista: 30 -> null
         lista.adicionarInicio(20); // Lista: 20 -> 30 -> null
         lista.adicionarInicio(10); // Lista: 10 -> 20 -> 30 -> null

         // Imprime a lista após a adição de três elementos.
         lista.imprimirLista(); // Saída esperada: 10 -> 20 -> 30 -> null
 
         // Insere o elemento 25 após o elemento 20.
         lista.inserirApos(20, 25); // Lista: 10 -> 20 -> 25 -> 30 -> null

         // Espera-se que após a inserção, a lista seja impressa novamente mostrando o elemento 25 inserido após o 20.
         lista.imprimirLista(); // Saída esperada: 10 -> 20 -> 25 -> 30 -> null
 
         // O método buscarIndice(25) seria chamado aqui para encontrar o índice do valor 25 na lista.
         // Como o método está comentado, não há saída, mas o esperado seria retornar o índice de 25, que é 2, considerando o início da lista como índice 0.
 
         // Remove o elemento que está imediatamente após o 25, que neste caso seria o 30.
         //lista.removerApos(25); // Lista após remoção: 10 -> 20 -> 25 -> null

         // Espera-se que após a remoção, a lista seja impressa novamente para mostrar o estado final da lista sem o elemento 30.
         lista.imprimirLista(); // Saída esperada: 10 -> 20 -> 25 -> null
     }
}
