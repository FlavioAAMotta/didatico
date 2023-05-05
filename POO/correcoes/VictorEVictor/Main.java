import java.util.Scanner;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Scanner;
import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.util.List;
import java.io.File;
import java.io.FileReader;

public class Main {
  public static void main(String[] args) {
    String origem = "tarefasPendentes.txt";
    String destino = "tarefasConcluidas.txt";
    Scanner scanner = new Scanner(System.in);
    ArrayList<Tarefa> listaTarefas = new ArrayList<Tarefa>();
    GerenciadorTarefas gerenciador = new GerenciadorTarefas();
    LocalDate dataCriacao;

    while (true) {
      System.out.println("==========Sistema de Gerenciamento de Tarefas==========");
      System.out.println("Escolha uma opcao:");
      System.out.println("1. Criar nova tarefa");
      System.out.println("2. Concluir tarefa");
      System.out.println("3. Exibir tarefas pendentes");
      System.out.println("4. Exibir tarefas concluidas");
      System.out.println("5. Sair");
      System.out.println("=======================================================");

      int opcao = scanner.nextInt();
      scanner.nextLine();

      switch (opcao) {
        // Criar nova tarefa
        case 1:
          System.out.println("Digite o titulo da nova tarefa:");
          String titulo = scanner.nextLine();
          System.out.println("Digite a descricao da nova tarefa:");
          String descricao = scanner.nextLine();

          dataCriacao = LocalDate.now();

          Tarefa novaTarefa = new Tarefa(titulo, descricao, dataCriacao, false);
          gerenciador.adicionarTarefa(novaTarefa);
          System.out.println("Tarefa adicionada com sucesso.");
          break;

        // Concluir Tarefa
        case 2:
          System.out.println("Selecione a tarefa que deseja concluir:");
          gerenciador.exibirTarefasPendentes();
          System.out.println("Digite o título da tarefa que deseja concluir:");
          String tituloProcurado = scanner.nextLine();

          try {
            // Chamar o método concluirTarefa para concluir a tarefa.
            boolean tarefaConcluidaComSucesso = GerenciadorTarefas.concluirTarefa(origem, destino, tituloProcurado);

            if (tarefaConcluidaComSucesso) {
              // Exibir a mensagem de conclusão da tarefa.
              System.out.println("Tarefa concluída com sucesso: " + tituloProcurado);
            } else {
              // Exibir a mensagem de erro.
              System.out.println("Tarefa não encontrada ou ocorreu um erro ao concluí-la.");
            }
          } catch (IOException e) {
            // Exibir a mensagem de erro.
            System.out.println("Ocorreu um erro ao concluir a tarefa: " + e.getMessage());
          }
          break;

        // Exibir tarefas pendentes
        case 3:
          System.out.println("Tarefas pendentes:");
          gerenciador.exibirTarefasPendentes();
          break;

        // Exibir tarefas concluidas
        case 4:
          System.out.println("Tarefas concluídas:");
          gerenciador.exibirTarefasConcluidas();
          break;

        // Sair
        case 5:
          System.out.println("Saindo...");
          scanner.close();
          System.exit(0);

        default:
          System.out.println("Opção inválida.");
      }
      System.out.println();
    }
  }
}
