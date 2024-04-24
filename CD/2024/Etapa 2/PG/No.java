class No{
    public String op;
    public No esq;
    public No dir;

    public No(String op, No esq, No dir){
        this.op = op;
        this.esq = esq;
        this.dir = dir;
    }

    public No(String op){
        this.op = op;
    }

    
}