class Principal{
    public static void main(String[] args){
        Arvore arvore = new Arvore();
        arvore.inserir(5);
        arvore.inserir(0);
        arvore.inserir(2);
        arvore.inserir(8);
        arvore.inserir(6);
        System.out.println(arvore.calcularAltura());
    }
}