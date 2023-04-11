public class Principal{
   public static void main(String[] args){
      ListaDuplamente notas = new ListaDuplamente();
      notas.addFirst(-2);
      notas.addFirst(0);
      notas.addFirst(7);
      notas.addFirst(2);
   // find(2) -> 1
   // find(3) -> -1
   // find(-2)-> 4
      System.out.println(notas.findWithIndex(2));
      System.out.println(notas.findWithIndex(3));
      System.out.println(notas.findWithIndex(-2));
      //NoDuplo teste = notas.getAt(3);
      notas.addAt(2, 10);
      notas.addAt(5, 10);
      notas.removeAt(3);
      System.out.println(notas.getTotal());
      notas.printAll();
      notas.removeFirst();
      notas.printAll();
      notas.removeLast();
      notas.printAll();
   }
}