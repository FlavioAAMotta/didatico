import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;

public class FileManager {

  public static void adicionarLinhaAoArquivo(
    String nomeDoArquivo,
    String linha
  ) {
    try (
      FileWriter fw = new FileWriter(nomeDoArquivo, true);
      BufferedWriter bw = new BufferedWriter(fw)
    ) {
      bw.write(linha);
      bw.newLine();

      System.out.println("Linha adicionada ao arquivo.");
    } catch (IOException e) {
      System.out.println("Erro ao escrever no arquivo: " + e.getMessage());
    }
  }
}
