public class AumentaFrase {

  public static void aumentarLetras() throws Exception, NullPointerException {
    String frase = null;
    String novaFrase = null;
    try {
      //novaFrase = frase.toUpperCase();
    } catch (NullPointerException error) {
      //throw new Exception(error);
    }
    System.out.println("Frase antiga: " + frase);
    System.out.println("Frase antiga: " + novaFrase);
    try{
      //frase.toLowerCase();
    }catch(NullPointerException error){
      //throw new NullPointerException();
    }
  }

  public static void main(String args[]) {
    try {
      aumentarLetras();
    } catch (NullPointerException e) {
      System.out.println("Voce teve um erro de nullpointer =)" + e);
    }catch(Exception e){
      System.out.println("Não sei o que aconteceu");
    }finally{
      System.out.println("Finalmente");
    }
  }
}
