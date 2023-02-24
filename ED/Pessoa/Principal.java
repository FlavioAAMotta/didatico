public class Principal{
   public static void main(String[] args){
      Pessoa flavio = new Pessoa();
      flavio.setPeso(80);
      flavio.setAltura(1.8);
      flavio.imprimeIMC(); 
      flavio.setPeso(120);
      flavio.imprimeIMC();  
   }
}