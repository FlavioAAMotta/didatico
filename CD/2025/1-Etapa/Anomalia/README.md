# Detecção de Anomalias - Exemplos Práticos

Este projeto contém códigos para gerar dados sintéticos e aplicar técnicas de IA para detectar anomalias nesses dados. São apresentados três cenários diferentes:

1. **Monitoramento de Consumo de Energia de Eletrodomésticos** - Anomalias sutis em grupos
2. **Monitoramento de Temperatura de Servidores** - Anomalias pontuais mais evidentes
3. **Monitoramento de Batimentos Cardíacos** - Anomalias contextuais (dependentes do contexto)

## Cenário 1: Consumo de Energia de Eletrodomésticos

### Arquivos do Projeto

1. **monitoramento_energia.py**: Gera dados sintéticos de consumo de energia para 4 eletrodomésticos de cozinha (Geladeira, Microondas, Cafeteira e Air Fryer) com 150 registros e 4 anomalias inseridas em dois grupos de duas anomalias próximas.

2. **deteccao_anomalias.py**: Aplica técnicas de IA (Isolation Forest e DBSCAN) para detectar anomalias nos dados gerados.

### Características dos Dados

- **Eletrodomésticos**: Geladeira, Microondas, Cafeteira e Air Fryer
- **Período**: Registros a cada 15 minutos
- **Anomalias**: 4 anomalias em 2 grupos de 2 anomalias próximas
  - Grupo 1: Geladeira com consumo muito alto e Microondas com consumo extremamente alto
  - Grupo 2: Cafeteira com consumo muito baixo e Air Fryer com consumo muito baixo

### Técnicas de IA Aplicadas

1. **Isolation Forest**:
   - Algoritmo não supervisionado para detecção de anomalias
   - Isola observações criando partições aleatórias
   - Anomalias são mais facilmente isoláveis

2. **DBSCAN (Density-Based Spatial Clustering of Applications with Noise)**:
   - Algoritmo de clustering baseado em densidade
   - Identifica clusters de pontos densamente agrupados
   - Pontos que não pertencem a nenhum cluster são considerados anomalias

## Cenário 2: Temperatura de Servidores

### Arquivos do Projeto

1. **temperatura_servidor.py**: Gera dados sintéticos de temperatura para 3 servidores com 120 registros e 4 anomalias pontuais bem evidentes.

2. **deteccao_temperatura.py**: Aplica técnicas mais simples e diretas (Threshold, Z-Score) e também Isolation Forest para detectar anomalias nos dados gerados.

### Características dos Dados

- **Servidores**: Servidor A, Servidor B, Servidor C
- **Período**: Registros a cada 30 minutos
- **Anomalias**: 4 anomalias pontuais bem evidentes
  - Servidor A com temperatura muito alta (superaquecimento)
  - Servidor B com temperatura muito baixa (possível falha no sensor)
  - Servidor C com temperatura muito alta (falha no sistema de refrigeração)
  - Servidor A com temperatura zero (possível desligamento)

### Técnicas de Detecção Aplicadas

1. **Detecção por Limites (Threshold)**:
   - Método simples baseado em estatísticas
   - Define limites como média ± 3*desvio padrão para cada servidor
   - Valores fora desses limites são considerados anomalias

2. **Z-Score**:
   - Normaliza os valores em termos de desvios padrão da média
   - Valores com |z| > 3 são considerados anomalias
   - Método estatístico simples e eficaz para anomalias evidentes

3. **Isolation Forest**:
   - Algoritmo mais sofisticado para comparação

## Cenário 3: Batimentos Cardíacos

### Arquivos do Projeto

1. **batimentos_cardiacos.py**: Gera dados sintéticos de batimentos cardíacos para diferentes atividades físicas com 150 registros e 4 anomalias contextuais.

2. **deteccao_batimentos.py**: Aplica técnicas específicas para detecção de anomalias contextuais, onde o valor é anômalo apenas no contexto específico.

### Características dos Dados

- **Atividades**: Repouso, Caminhada, Corrida, Exercício, Sono
- **Período**: Registros a cada 10 minutos ao longo de um dia
- **Anomalias Contextuais**: 4 anomalias que dependem do contexto (atividade) para serem identificadas
  - Batimentos muito altos durante o sono (possível pesadelo ou apneia)
  - Batimentos muito baixos durante exercício (possível problema cardíaco)
  - Batimentos muito altos em repouso (possível ansiedade ou febre)
  - Batimentos muito baixos durante corrida (possível fadiga extrema)

### Técnicas de Detecção Aplicadas

1. **Detecção Contextual por Atividade**:
   - Define limites específicos para cada atividade (média ± 2*desvio padrão)
   - Valores fora dos limites específicos da atividade são considerados anomalias
   - Abordagem simples mas eficaz para anomalias contextuais

2. **Z-Score Contextual**:
   - Calcula o Z-Score separadamente para cada atividade
   - Valores com |z| > 2 são considerados anomalias
   - Normaliza os valores dentro de cada contexto

3. **Local Outlier Factor (LOF) com Contexto**:
   - Algoritmo baseado em densidade local
   - Considera a densidade de pontos na vizinhança
   - Incorpora informações de contexto através de one-hot encoding das atividades

4. **One-Class SVM com Contexto**:
   - Algoritmo de aprendizado de máquina para detecção de novidades
   - Aprende a fronteira de decisão que engloba os dados normais
   - Incorpora informações de contexto através de features adicionais

## Como Executar

### Cenário 1: Consumo de Energia

1. Primeiro, execute o script de geração de dados:
   ```
   python monitoramento_energia.py
   ```

2. Em seguida, execute o script de detecção de anomalias:
   ```
   python deteccao_anomalias.py
   ```

### Cenário 2: Temperatura de Servidores

1. Primeiro, execute o script de geração de dados:
   ```
   python temperatura_servidor.py
   ```

2. Em seguida, execute o script de detecção de anomalias:
   ```
   python deteccao_temperatura.py
   ```

### Cenário 3: Batimentos Cardíacos

1. Primeiro, execute o script de geração de dados:
   ```
   python batimentos_cardiacos.py
   ```

2. Em seguida, execute o script de detecção de anomalias:
   ```
   python deteccao_batimentos.py
   ```

## Visualizações Geradas

### Cenário 1: Consumo de Energia
- Consumo por eletrodoméstico ao longo do tempo
- Distribuição de consumo por eletrodoméstico
- Detecção com Isolation Forest
- Clusters DBSCAN em espaço PCA
- Comparação de métodos de detecção
- Importância das features

### Cenário 2: Temperatura de Servidores
- Temperatura por servidor ao longo do tempo
- Distribuição de temperatura por servidor
- Relação entre carga e temperatura
- Comparação dos três métodos de detecção
- Z-Scores das temperaturas
- Distribuição de temperaturas com limites

### Cenário 3: Batimentos Cardíacos
- Batimentos cardíacos ao longo do dia por atividade
- Distribuição de batimentos por atividade
- Comparação dos quatro métodos de detecção
- Z-Scores dos batimentos por atividade
- Distribuição de batimentos com limites por atividade
- Comparação de desempenho dos métodos

## Requisitos

- Python 3.6+
- pandas
- numpy
- matplotlib
- seaborn
- scikit-learn 