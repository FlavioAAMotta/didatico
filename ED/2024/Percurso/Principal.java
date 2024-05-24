public class Principal {
    public static void main(String[] args) {
        Arvore arvore = new Arvore();
        arvore.inserir("Cidade de Pallet", 11);
        arvore.inserir("Rota 1", 5);
        arvore.inserir("Cidade de Viridian", 16);
        arvore.inserir("Rota 2", 8);
        arvore.inserir("Floresta de Viridian", 3);
        arvore.inserir("Cidade de Pewter", 14);
        arvore.inserir("Rota 3", 19);
        arvore.inserir("Montanha de Pewter", 12);
        arvore.inserir("Cidade de Cerulean", 7);
        arvore.inserir("Rota 4", 10);
        arvore.inserir("Caverna de Cerulean", 15);
        arvore.inserir("Cidade de Vermilion", 2);
        arvore.inserir("Rota 5", 6);
        arvore.inserir("Cidade de Lavender", 9);
        arvore.inserir("Rota 6", 13);
        arvore.inserir("Cidade de Celadon", 18);
        arvore.inserir("Rota 7", 1);
        arvore.inserir("Cidade de Fuchsia", 4);
        arvore.inserir("Rota 8", 17);
        arvore.inserir("Cidade de Saffron", 20);
        arvore.inserir("Rota 9", 21);
        arvore.inserir("Cidade de Cinnabar", 22);

        arvore.imprimirCaminho(9);
   }
}
