public class No {
    String valor;
    No anterior;
    No proximo;

    public No(String valor) {
        this.valor = valor;
        this.anterior = null;
        this.proximo = null;
    }
}