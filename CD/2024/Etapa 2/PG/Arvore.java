import java.util.Arrays;

class Arvore{
    No raiz;

    public Arvore(No raiz){
        this.raiz = raiz;
    }

    public int calcular(){
        return calcular(raiz);
    }

    private int calcular(No no){
        if(no == null){
            return 0;
        }
        if(no.op.equals("+")){
            return calcular(no.esq) + calcular(no.dir);
        }
        if(no.op.equals("-")){
            return calcular(no.esq) - calcular(no.dir);
        }
        if(no.op.equals("*")){
            return calcular(no.esq) * calcular(no.dir);
        }
        if(no.op.equals("/")){
            return calcular(no.esq) / calcular(no.dir);
        }
        return Integer.parseInt(no.op);
    }

    public void construir(String expressao){
        String[] tokens = expressao.split(" ");
        raiz = construir(tokens);
    }

    private No construir(String[] tokens){
        if(tokens.length == 1){
            return new No(tokens[0]);
        }
        No no = new No(tokens[1]);
        no.esq = construir(Arrays.copyOfRange(tokens, 0, 1));
        no.dir = construir(Arrays.copyOfRange(tokens, 2, tokens.length));
        return no;
    }

    public String toString(){
        return toString(raiz);
    }

    private String toString(No no){
        if(no == null){
            return "";
        }
        if(no.esq == null && no.dir == null){
            return no.op;
        }
        return "(" + toString(no.esq) + no.op + toString(no.dir) + ")";
    }

    public void gerarArvore(int tamanho){
        raiz = gerarArvore(tamanho, 0);
    }

    private No gerarArvore(int tamanho, int nivel){
        if(nivel == tamanho){
            return new No("" + (int)(Math.random() * 10));
        }
        char op = (char)(Math.random() * 4 + 42);
        if(op == ','){
            op = '/';
        }
        System.out.println(op);
        No no = new No(op + "");
        no.esq = gerarArvore(tamanho, nivel + 1);
        no.dir = gerarArvore(tamanho, nivel + 1);
        return no;
    }

    public static void main(String[] args){
        Arvore arvore = new Arvore(null);
        arvore.gerarArvore(3);
        System.out.println(arvore);
        System.out.println(arvore.calcular());
    }
}