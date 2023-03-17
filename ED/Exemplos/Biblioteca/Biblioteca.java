import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class Biblioteca {

  public void cadastrarUsuario(Usuario novo) {
    try {
      //Validar dados do usuario
      if (
        novo.getNome() == "" ||
        novo.getIdade() < 0 ||
        novo.getEndereco() == "" ||
        novo.getId().equals("")
      ) {
        System.out.println("Dados faltantes");
        throw new Error("Dados faltantes");
      }
      //Verificar se usuario existe
      boolean usuarioExistente = verificarUsuarioExistente(novo.getNome());
      if(usuarioExistente){
         throw new Error("Usuario Existente");
      }
      
      //Adicionar linha ao arquivo Usuarios.usu
      String novaLinha = String.format("%s;%d;%s;%s", novo.getNome(), novo.getIdade(), novo.getEndereco(), novo.getId());
      FileManager.adicionarLinhaAoArquivo("Usuarios.usu", novaLinha);

      //Exibir mensagem de usuario cadastrado com sucesso
    } catch (Exception e) {
      System.out.println(e.getMessage());
    }
  }

  private boolean verificarUsuarioExistente(String nomeUsuario) {
    try {
      FileReader fr = new FileReader("Usuarios.usu");
      BufferedReader br = new BufferedReader(fr);
      String linha;

      while ((linha = br.readLine()) != null) {
        System.out.println(linha);
        String[] dadosDaLinha = linha.split(";");
        String usuario = dadosDaLinha[0];
        if (nomeUsuario.equals(usuario)) {
          return true;
        }
      }
    } catch (Exception e) {
      System.out.println("Erro ao ler arquivo");
    }
    return false;
  }

  public void cadastrarLivro() {
    System.out.println("Metodo não implementado");
  }

  public void emprestarLivro() {
    System.out.println("Metodo não implementado");
  }

  public void receberLivro() {
    System.out.println("Metodo não implementado");
  }

  public void listarDisponiveis() {
    System.out.println("Metodo não implementado");
  }

  public void listarEmprestimosDeUsuario() {
    System.out.println("Metodo não implementado");
  }
}
