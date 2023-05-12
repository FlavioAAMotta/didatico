public class Main{
    public static void main(String[] args){
        Arvore arvore1 = new Arvore();
        arvore1.inserir(4);
        arvore1.inserir(2);
        arvore1.inserir(6);
        arvore1.inserir(1);
        arvore1.inserir(3);
        arvore1.inserir(5);
        System.out.println(arvore1.ehEstritamenteBinaria());
        arvore1.inserir(7);
        
        System.out.println(arvore1.buscar(1).getValor());
        System.out.println(arvore1.buscar(7).getValor());
        System.out.println(arvore1.buscar(4).getValor());
        System.out.println(arvore1.buscar(9));
        
        System.out.println(arvore1.ehEstritamenteBinaria());
    }
}