public class Principal{
   public static void main(String[] args){
      Circulo c1 = new Circulo(5);
      Retangulo r1 = new Retangulo(3,2);
      
      System.out.println(c1.calcularArea());
      System.out.println(r1.calcularArea());
   }
}