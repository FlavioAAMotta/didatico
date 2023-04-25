import java.util.UUID;

public class Usuario {

  private String nome;
  private int idade;
  private String endereco;
  private UUID id;

  public Usuario(String nome, int idade, String endereco) {
    this.nome = nome;
    this.idade = idade;
    this.endereco = endereco;
    this.id = UUID.randomUUID();
  }

  public String getNome() {
    return nome;
  }

  public int getIdade() {
    return idade;
  }

  public String getEndereco() {
    return endereco;
  }

  public UUID getId() {
    return id;
  }
}
