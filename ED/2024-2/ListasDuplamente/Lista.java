public class Lista{
    public No primeiro;
    public No ultimo;
    public int tamanho;

    public Lista(){
        this.primeiro = null;
        this.ultimo = null;
        this.tamanho = 0;
    }

    public void adicionar(int valor){
        No novo = new No(valor);
        if(this.primeiro == null){
            this.primeiro = novo;
            this.ultimo = novo;
        } else {
            this.ultimo.proximo = novo;
            novo.anterior = this.ultimo;
            this.ultimo = novo;
        }
        this.tamanho++;
    }


    public void adicionarNoIndice(int valor, int indice){
        if(this.tamanho == indice){
            this.adicionar(valor);
            return;
        }else if(this.tamanho < indice || indice < 0){
            System.out.println("Indice invalido");
            return;
        }else if(indice == 0){
            No novo = new No(valor);
            novo.proximo = this.primeiro;
            this.primeiro.anterior = novo;
            this.primeiro = novo;
            this.tamanho++;
        }else{
            int contador = 0;
            No novo = new No(valor);
            No atual = this.primeiro;
            while(contador < indice){
                atual = atual.proximo;
                contador++;
            }
            novo.proximo = atual;
            novo.anterior = atual.anterior;
            atual.anterior.proximo = novo;
            atual.anterior = novo;
            this.tamanho++;
        }
    }
}