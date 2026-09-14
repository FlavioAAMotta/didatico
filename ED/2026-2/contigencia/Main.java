import java.io.BufferedReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

public class Main {

   public static long verificaContingencia() {
    Path caminho = Path.of("entrada3.txt");

    try (BufferedReader leitor = Files.newBufferedReader(caminho)) {
        int quantidade = Integer.parseInt(leitor.readLine());

        String[] produtos = leitor.readLine().split("\\s+");
        String[] saidas = leitor.readLine().split("\\s+");

        long total = 0;
        long menorFolga = Long.MAX_VALUE;

        for (int i = 0; i < quantidade; i++) {
            int estoque = Integer.parseInt(produtos[i]);
            int meta = Integer.parseInt(saidas[i]);

            if (meta > estoque) {
                return -1;
            }

            total += estoque;

            long folga = estoque - meta;

            if (folga < menorFolga) {
                menorFolga = folga;
            }
        }

        return total - menorFolga;

    } catch (IOException e) {
        System.out.println("Erro ao ler o arquivo: " + e.getMessage());
        return -1;
    }
}
   public static void main(String[] args) {
       System.out.println(verificaContingencia());
   }
}