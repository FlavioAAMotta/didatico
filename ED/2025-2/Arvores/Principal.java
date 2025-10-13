public class Principal{

   public static void main(String[] args){
      Arvore usuarios = new Arvore();
      usuarios.inserir(4);
      usuarios.inserir(9);
      usuarios.inserir(2);
      usuarios.inserir(7);
      usuarios.inserir(3);
      usuarios.inserir(1);
      usuarios.inserir(10);
      usuarios.inserir(8);
      usuarios.inserir(4);
      usuarios.inserir(9);
      usuarios.inserir(2);
      usuarios.inserir(7);
      usuarios.inserir(3);
      usuarios.inserir(1);
      usuarios.inserir(10);
      usuarios.inserir(8);
      System.out.println("Altura: " + usuarios.calcularAltura());
      usuarios.calcularNos();
   }
   
}