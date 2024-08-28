public class Lista{
    public No inicio;
    public No fim;
    public int tamanho;

    public Lista(){
        tamanho = 0;
        inicio = null;
        fim = null;
    }

    public void addFirst(int valor){
        No novo = new No(valor);
        if(tamanho == 0){
            inicio = novo;
            fim = novo;
        }else{
        }
    }
}