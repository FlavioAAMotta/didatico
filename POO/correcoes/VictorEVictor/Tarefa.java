import java.time.LocalDate;

/*
  Criar uma classe usuario   (ok!)
  
  Fazer metodo para criar dois arquivos com o nome     do usuario
  
  Um arquivo que vai salvar o array de pendentes
  e o outro que vai salvar o array de concluidas

  Modificar metodos para encaixar junto com esses      novos arquivos
*/

public class Tarefa {
  private String titulo;
  private String descricao;
  private LocalDate dataCriacao;
  private LocalDate dataConclusao;
  private boolean concluida;

  public Tarefa(String titulo, String descricao, LocalDate dataCriacao, boolean concluida) {
    this.titulo = titulo;
    this.descricao = descricao;
    this.dataCriacao = dataCriacao;
    this.concluida = concluida;
}

  public String getTitulo() {
    return titulo;
  }

  public String getDescricao() {
    return descricao;
  }

  public LocalDate getDataCriacao() {
    return dataCriacao;
  }

  public LocalDate getDataConclusao() {
    return dataConclusao;
  }

  public boolean isConcluida() {
    return concluida;
  }

  public void setConcluida(boolean concluida) {
    this.concluida = concluida;
  }

  @Override
  public String toString() {
    String status = isConcluida() ? "Concluída em " + getDataConclusao() + " Concluida" : "Pendente";
    return getTitulo() + " - " + getDescricao() + " (" + getDataCriacao() + ") - " + status;
  }
}
