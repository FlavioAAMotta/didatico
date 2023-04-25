public class Pessoa{
   private String nome;
   private int idade;
   private double peso;
   private double altura;
   private double imc;
   
   //getters e setters
   public int getIdade(){
      return this.idade;
   }
   
   public void setIdade(int idade){
      this.idade = idade;
   }
   
   public void setPeso(double peso){
      this.peso = peso;
      atualizaIMC();
   }
   
   public void setAltura(double altura){
      this.altura = altura;
      atualizaIMC();
   }
   
   public void imprimeAltura(){
      System.out.println("Altura: " + altura);
   }
   
   public void imprimeIMC(){
      System.out.println("IMC e igual a:" + this.imc);
   }
   
   private void atualizaIMC(){
      if(altura != 0){
         double imc = peso / ( altura * altura);
         this.imc = imc;
      }
   }
   
}