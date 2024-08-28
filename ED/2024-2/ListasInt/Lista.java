public class Lista{
    public int tamanho;
    public No inicio;

    public Lista(){
        tamanho = 0;
        inicio = null;
    }

    public void addFirst(int valor){
        No novo = new No(valor);
        if(tamanho == 0){
            inicio = novo;
            tamanho++;
        }else{
            novo.proximo = inicio;
            inicio = novo;
            tamanho++;
        }
    }

    public double media(){
        double media = 0;
        No atual = inicio;
        while(atual != null){
            media += atual.nota;
            atual = atual.proximo;
        }
        return media /tamanho;
    }
}