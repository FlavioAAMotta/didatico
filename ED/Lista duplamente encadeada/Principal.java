public class Principal{
   public static void main(String[] args){
      ListaDuplamente notas = new ListaDuplamente();
      notas.addFirst(9);
      notas.addFirst(7);
      notas.addLast(5);
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