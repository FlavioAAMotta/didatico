public class Principal{
    public static void main(String[] args) {
        Lista lista = new Lista();
        lista.adicionar(1);
        lista.adicionar(2);
        lista.adicionar(3);
        lista.adicionar(4);
        lista.adicionarNoIndice(5, 5);
        lista.adicionarNoIndice(1, 0);
        lista.adicionarNoIndice(3, 3);
    }
}