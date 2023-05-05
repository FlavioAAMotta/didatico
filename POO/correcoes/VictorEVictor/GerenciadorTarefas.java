import java.util.Scanner;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Scanner;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.util.List;
import java.io.File;
import java.io.FileReader;
import java.io.FileNotFoundException;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;

public class GerenciadorTarefas {
  private List<Tarefa> tarefasPendentes;
  private List<Tarefa> tarefasConcluidas;
  private final String PENDENTES_FILE = "tarefasPendentes.txt";
  private final String CONCLUIDAS_FILE = "tarefasConcluidas.txt";
  private ArrayList<Tarefa> listaTarefas = new ArrayList<Tarefa>();

  public GerenciadorTarefas() {
    this.tarefasPendentes = new ArrayList<>();
    this.tarefasConcluidas = new ArrayList<>();
  }

  // ------ Pronto !!
  public void adicionarTarefa(Tarefa t) {
    try {
      FileWriter fw = new FileWriter("tarefasPendentes.txt", true);
      BufferedWriter bw = new BufferedWriter(fw);
      bw.write(t.toString());
      bw.newLine();
      bw.close();
      fw.close();
    } catch (IOException e) {
      System.out.println("Erro ao salvar tarefa no arquivo de texto.");
    }
    tarefasPendentes.add(t);
  }

  // ----- Pronto !!
  public static boolean concluirTarefa(String origem, String destino, String tituloProcurado) throws IOException {
    boolean tarefaEncontrada = false;
    String tarefaConcluida = null;
    BufferedReader reader = new BufferedReader(new FileReader(origem));
    List<String> tarefasConcluidas = new ArrayList<>();

    try {
      // Ler a linha desejada e escrever no arquivo de destino
      String linhaDesejada = null;
      int contadorLinha = 0;
      while ((linhaDesejada = reader.readLine()) != null) {
        contadorLinha++;
        if (linhaDesejada.startsWith(tituloProcurado)) {
          linhaDesejada = linhaDesejada.replace("Pendente", "Concluída");
          tarefasConcluidas.add(linhaDesejada); // Adiciona a tarefa concluída na lista
          tarefaEncontrada = true;
          tarefaConcluida = linhaDesejada;
          break;
        }
      }

      // Escrever as tarefas concluídas no arquivo de tarefas concluídas.
      BufferedWriter writerConcluidas = new BufferedWriter(new FileWriter("tarefasConcluidas.txt", true));
      for (String tarefa : tarefasConcluidas) {
        writerConcluidas.write(tarefa);
        writerConcluidas.newLine();
      }
      writerConcluidas.close();

      if (tarefaEncontrada) {
        removerLinha(origem, tituloProcurado);
      }
    } catch (IOException e) {
      e.printStackTrace();
    } finally {
      reader.close();
    }

    // Retornar true se a tarefa foi encontrada e movida com sucesso, false caso
    // contrário.
    return tarefaEncontrada;
  }

  // ----- Pronto !!
  public static void removerLinha(String origem, String linhaRemover) throws IOException {
    File arquivoTemporario = new File("temporario.txt");
    BufferedReader reader = new BufferedReader(new FileReader(origem));
    BufferedWriter writer = new BufferedWriter(new FileWriter(arquivoTemporario));

    try {
      String linha;
      while ((linha = reader.readLine()) != null) {
        // Verificar se a linha contém o que estamos procurando.
        if (!linha.startsWith(linhaRemover)) {
          // A linha não é a linha que deve ser removida, copiá-la para o arquivo
          // temporário.
          if (linha != null) {
            writer.write(linha);
            writer.newLine();
          }
        }
      }
    } catch (IOException e) {
      e.printStackTrace();
    } finally {
      reader.close();
      writer.close();
    }

    // Reescrever o arquivo original com as linhas restantes do arquivo temporário.
    Files.move(arquivoTemporario.toPath(), new File(origem).toPath(), StandardCopyOption.REPLACE_EXISTING);
  }

  // ------ Pronto !!
  public void exibirTarefasPendentes() {
    try {
      File arquivo = new File("tarefasPendentes.txt");
      Scanner scanner = new Scanner(arquivo);
      while (scanner.hasNextLine()) {
        String linha = scanner.nextLine();
        System.out.println(linha);
      }
      scanner.close();
    } catch (FileNotFoundException e) {
      System.out.println("Arquivo não encontrado.");
    }
  }

  // ----- falta fazer
  public void exibirTarefasConcluidas() {
    try {
      File arquivo = new File("tarefasConcluidas.txt");
      Scanner scanner = new Scanner(arquivo);
      while (scanner.hasNextLine()) {
        String linha = scanner.nextLine();
        System.out.println(linha);
      }
      scanner.close();
    } catch (FileNotFoundException e) {
      System.out.println("Arquivo não encontrado.");
    }
  }

}
