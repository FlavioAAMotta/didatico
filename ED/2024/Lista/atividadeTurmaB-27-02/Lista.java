public class Lista {
    public int tamanho;
    public No cabeca;
    public No cauda;
    
    public Lista(){
        this.tamanho = 0;
        this.cabeca = new No();
        this.cauda = new No();
    }

    public void adicionarInicio(int valor){
        No novo = new No();
        novo.valor = valor;
        
        if(tamanho == 0){
            novo.proximo = cauda;
        }else{
            novo.proximo = cabeca.proximo;
        }
        cabeca.proximo = novo;
        
        tamanho++;
    }

    public void imprimirLista(){
        if(tamanho == 0){
            System.out.println("Lista Vazia");
        }else{
            No atual = cabeca.proximo;
            while(atual != cauda){
                System.out.print(atual.valor + " -> ");
                atual = atual.proximo;
            }
            System.out.println("null");
        }
    }

    // Exercício 1: Método inserirApós com erro de lógica
    public void inserirApos(int dado, int novoDado) {
        No atual = cabeca;
        while (atual != null && atual.proximo.valor != dado) {
            atual = atual.proximo;
        }
        if (atual != null) {
            No novoNodo = new No(novoDado);
            novoNodo.proximo = atual.proximo;
            atual.proximo = novoNodo;
            if (atual == cauda) {
                cauda = novoNodo;
            }
        } else {
            System.out.println("Dado " + dado + " não encontrado.");
        }
    }

    // Exercício 2: Método buscar indice do valor com linhas faltantes
    // public int buscarIndice(int valor) {
    //     No atual = cabeca;
    //     // Trecho faltante
    //     while (atual != null && atual.valor != valor) {
    //         // Trecho faltante
    //         // Trecho faltante
    //     }
    //     if (atual != null) {
    //         // Trecho faltante
    //     } else {
    //         return -1; // Significa que não encontrou
    //     }
    // }

    // Exercício 3: Método remover incompleto
    // public void remover(int dado) {
    //     No atual = cabeca;
    //     while (atual != null && atual.proximo.valor != dado) {
    //         atual = atual.proximo;
    //     }
    //     if (atual != null) { // Então encontrou o valor
    //         // Trecho faltante
    //         if (atual.proximo == null) {
    //             // Trecho faltante
    //         }
    //     } else {
    //         System.out.println("Dado " + dado + " não encontrado.");
    //     }
    // }
}
