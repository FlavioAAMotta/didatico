public class Pessoa implements MinhaInterface{
   public static String nome;
   private String cpf = "2";
   public static int quantidadeDeOlhos = 2;
   
   public void imprimeValor(double valor){
      System.out.println(valor);
   }
   
   public void setQuantidadeDeOlhos(int qtd){
      this.quantidadeDeOlhos = qtd;
   }
   public int getQuantidadeDeOlhos(){
      return quantidadeDeOlhos;
   }
   
   
   public Pessoa(String nome, String cpf){
      this.nome = nome;
      this.cpf = cpf;
   }
   
   public String getCPF(){
      return this.cpf;
   }
   
   @Override
   public boolean equals(Object obj){
      if(obj instanceof Pessoa){
         Pessoa comparacao = (Pessoa) obj;
         return comparacao.getCPF() == this.cpf; 
      }
      return false;
   }
   
   @Override public String toString(){
      return this.nome;
   }
}