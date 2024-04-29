import java.io.FileNotFoundException;
import java.util.Scanner;
import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;


public class PG {
    private double[] erros = new double[100];
    public int tamanhoTorneio = 5;
    // Definindo o seed como 42 para garantir que os resultados sejam os mesmos
    private static final long seed = 42;
    private Random random = new Random(seed);

    private double[][] lerDados(String arquivo) {
        List<double[]> linhasList = new ArrayList<>();

        try {
            // Abrir o arquivo com o Scanner
            Scanner scanner = new Scanner(new File(arquivo));

            // Ler todas as linhas e guardar em uma lista temporária para determinar o
            // número de linhas e colunas
            while (scanner.hasNextLine()) {
                String linha = scanner.nextLine();
                String[] valores = linha.split(",");
                double[] dadosLinha = new double[valores.length];
                for (int i = 0; i < valores.length; i++) {
                    dadosLinha[i] = Double.parseDouble(valores[i]);
                }
                linhasList.add(dadosLinha);
            }
            scanner.close();

            // Converter a lista para uma matriz agora que sabemos o número de linhas e
            // colunas
            if (!linhasList.isEmpty()) {
                int numLinhas = linhasList.size();
                int numColunas = linhasList.get(0).length;
                double[][] dados = new double[numLinhas][numColunas];

                for (int i = 0; i < numLinhas; i++) {
                    dados[i] = linhasList.get(i);
                }
                return dados;
            } else {
                System.out.println("O arquivo está vazio.");
                return null;
            }
        } catch (FileNotFoundException e) {
            System.out.println("Arquivo não encontrado: " + arquivo);
            e.printStackTrace();
            return null;
        } catch (NumberFormatException e) {
            System.out.println("Erro na conversão de números.");
            e.printStackTrace();
            return null;
        }
    }

    private double[][] separarDados(double[][] dados, boolean[] usado, int quantidade) {
        double[][] dadosSeparados = new double[quantidade][2];
        for (int i = 0; i < quantidade; i++) {
            int indice = (int) (Math.random() * 10);
            while (usado[indice]) {
                indice = (int) (Math.random() * 10);
            }
            usado[indice] = true;
            dadosSeparados[i][0] = dados[indice][0];
            dadosSeparados[i][1] = dados[indice][1];
        }
        return dadosSeparados;
    }

    private Arvore[] inicializarPopulacao(int tamanho, int maxNivel) {
        Arvore[] populacao = new Arvore[tamanho];
        for (int i = 0; i < tamanho; i++) {
            populacao[i] = new Arvore(maxNivel);
        }
        return populacao;
    }

    private double avaliarPopulacao(Arvore[] populacao, double[][] dados) {
        double melhorErro = Double.MAX_VALUE;
        for (int i = 0; i < populacao.length; i++) {
            double erro = 0;
            for (int j = 0; j < dados.length; j++) {
                populacao[i].setValorDeX(dados[j][0]);
                double resultado = populacao[i].calcular();
                erro += Math.pow(dados[j][1] - resultado, 2);
            }
            erro /= dados.length;
            this.erros[i] = erro;
            if (erro < melhorErro) {
                melhorErro = erro;
            }
        }
        return melhorErro;
    }

    private Arvore[] selecionarPorTorneio(Arvore[] populacao) {
        Arvore[] melhores = new Arvore[10];
        boolean[] selecionados = new boolean[populacao.length];
        for (int i = 0; i < 10; i++) {
            int melhorIndice = -1;
            double melhorErro = Double.MAX_VALUE;
            for (int j = 0; j < this.tamanhoTorneio; j++) {
                int indice;
                do {
                    indice = random.nextInt(populacao.length);
                } while (selecionados[indice]);
                selecionados[indice] = true;
                if (this.erros[indice] < melhorErro) {
                    melhorErro = this.erros[indice];
                    melhorIndice = indice;
                }
            }
            melhores[i] = populacao[melhorIndice];
        }
        return melhores;
    }

    private Arvore[] cruzar(Arvore[] melhores) {
        Arvore[] prole = new Arvore[10];
        for (int i = 0; i < 10; i += 2) {
            int tamanho1 = melhores[i].getTamanho();
            int tamanho2 = melhores[i + 1].getTamanho();
            int indice1 = random.nextInt(tamanho1);
            int indice2 = random.nextInt(tamanho2);
            Arvore subArvore1 = melhores[i].getSubArvore(indice1);
            Arvore subArvore2 = melhores[i + 1].getSubArvore(indice2);
            melhores[i].trocarSubArvore(indice1, subArvore2);
            melhores[i + 1].trocarSubArvore(indice2, subArvore1);
            prole[i] = melhores[i]; // Adicionar as novas árvores à prole
            prole[i + 1] = melhores[i + 1];
        }
        return prole;
    }

    private Arvore[] mutar(Arvore[] prole, double probabilidade) {
        for (int i = 0; i < prole.length; i++) {
            if (random.nextDouble() < probabilidade) {
                prole[i] = prole[i].mutar(0.05);
            }
        }
        return prole;
    }

    private Arvore[] substituirPorTorneio(Arvore[] populacao, Arvore[] prole, int tamanhoTorneio) {
        Arvore[] novaPopulacao = new Arvore[populacao.length];
        for (int i = 0; i < populacao.length; i++) {
            int melhorIndice = -1;
            double melhorErro = Double.MAX_VALUE;
            for (int j = 0; j < tamanhoTorneio; j++) {
                int indice = random.nextInt(populacao.length);
                if (this.erros[indice] < melhorErro) {
                    melhorErro = this.erros[indice];
                    melhorIndice = indice;
                }
            }
            novaPopulacao[i] = populacao[melhorIndice];
        }
        return novaPopulacao;
    }

    public String imprimirVetor(double[] vetor) {
        String vetorString = "[";
        for (int i = 0; i < vetor.length; i++) {
            vetorString += vetor[i];
            if (i < vetor.length - 1) {
                vetorString += ", ";
            }
        }
        vetorString += "]";
        return vetorString;
    }

    public void programacaoGenetica() {
        // primeiro lemos os dados de x e y do arquivo data/f1.csv
        double[][] dados = lerDados("data/f1.csv");

        // Agora vamos separar os dados em treino, validação e teste
        boolean[] usado = new boolean[10];
        double[][] dadosTreino = separarDados(dados, usado, 6);
        double[][] dadosValidacao = separarDados(dados, usado, 2);
        double[][] dadosTeste = separarDados(dados, usado, 2);
        
        // Agora vamos criar a população inicial
        Arvore[] populacao = inicializarPopulacao(100, 8);

        double melhorErro = avaliarPopulacao(populacao, dadosTreino);
        int geracao = 0;
        System.out.println("Geracao: " + geracao++ + " Melhor erro: " + melhorErro);


        while (geracao < 50) {
            // Selecionar os melhores indivíduos
            Arvore[] melhores = new Arvore[10];
            Arvore[] prole = new Arvore[10];
            Arvore[] proleMutada;
            melhores = selecionarPorTorneio(populacao);
            // Cruzar os melhores indivíduos
            prole = cruzar(melhores);

            // Mutar alguns da prole
            proleMutada = mutar(prole, 0.1);

            populacao = substituirPorTorneio(populacao, proleMutada, tamanhoTorneio);

            // Avaliar a nova população
            double erro = avaliarPopulacao(populacao, dadosTreino);
            System.out.println("Vetor de erros: " + imprimirVetor(erros));
            // Se o erro for menor que o melhor erro, atualizar o melhor erro
            if (erro < melhorErro) {
                melhorErro = erro;
            }
            System.out.println("Geracao: " + geracao + " Melhor erro: " + melhorErro);
            geracao++;
        }

        // Avaliar a população final no conjunto de validação
        double erroValidacao = avaliarPopulacao(populacao, dadosValidacao);

        // Avaliar a população final no conjunto de teste
        double erroTeste = avaliarPopulacao(populacao, dadosTeste);

        System.out.println("Erro no conjunto de validação: " + erroValidacao);
        System.out.println("Erro no conjunto de teste: " + erroTeste);
    }
}