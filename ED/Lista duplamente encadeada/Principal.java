public class Principal{
   public static void main(String[] args){
      ListaDuplamente notas = new ListaDuplamente();
      notas.addFirst(3);
      notas.addFirst(6);
      notas.addLast(7);
      NoDuplo teste = notas.getAt(3);
      
   }
}