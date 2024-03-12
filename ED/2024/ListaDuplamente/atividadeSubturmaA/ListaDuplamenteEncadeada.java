public class ListaDuplamenteEncadeada {
    No cabeca;
    No cauda;

    public ListaDuplamenteEncadeada() {
        this.cabeca = new No(null); // Cabeça fictícia
        this.cauda = new No(null); // Cauda fictícia
        cabeca.proximo = cauda;
        cauda.anterior = cabeca;
    }

    public void inserirNoFinal(String valor) {
        No novoNo = new No(valor);
        No anterior = cauda.anterior;
        
        novoNo.proximo = cauda;
        novoNo.anterior = anterior;
        cauda.anterior = novoNo;
        anterior.proximo = novoNo;
    }

    public String removerDoFinal() {
        if(cabeca.proximo == cauda){
            System.out.println("Lista vazia");
            return "-1";
        }
        No anterior = cauda.anterior.anterior;
        No noRemovido = cauda.anterior;

        anterior.proximo = cauda;
        cauda.anterior = anterior;

        return noRemovido.valor;
    }

    public String toString() {
        StringBuilder sb = new StringBuilder();
        No atual = cabeca.proximo;
        while (atual != cauda) {
            sb.append(atual.valor);
            atual = atual.proximo;
        }
        return sb.toString();
    }

    public boolean isEmpty() {
        return cabeca.proximo == cauda;
    }
}
