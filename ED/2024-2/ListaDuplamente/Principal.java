public class Principal{
    public static void main(String[] args){
        Lista notasPrimeiro = new Lista();
        Lista notasSegundo = new Lista();
        Lista notasTerceiro = new Lista();

        notasPrimeiro.addFirst(8);
        notasPrimeiro.addFirst(7);
        notasPrimeiro.addFirst(6);
        notasPrimeiro.addFirst(7);

        notasSegundo.addFirst(4);
        notasSegundo.addFirst(5);
        notasSegundo.addFirst(9);
        notasSegundo.addFirst(1);

        notasTerceiro.addFirst(10);
        notasTerceiro.addFirst(8);

        //notasPrimeiro = 7; notasSegundo = 4,75; notasTerceiro = 9
    }
}