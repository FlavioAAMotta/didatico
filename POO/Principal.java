public class Principal{
   public static void main(String[] args){
      System.out.println(Calculadora.somar(1,2));
      System.out.println(Pessoa.nome);
      
      
      
      
      
      
      
      Pessoa novoUsuario = new Pessoa("Joao", "000.111.222-33");
      novoUsuario.setQuantidadeDeOlhos(1);
      System.out.println("Nova quantidade " + novoUsuario.getQuantidadeDeOlhos());
      Pessoa outroUsuario = new Pessoa("Pedro", "000.111.222-33");
      
      boolean usuariosIguais = novoUsuario == outroUsuario;
      System.out.println(usuariosIguais);
      System.out.println(novoUsuario);
      System.out.println(outroUsuario);
      System.out.println(novoUsuario.getCPF() == outroUsuario.getCPF());
      System.out.println(novoUsuario.equals(outroUsuario));
   }
}