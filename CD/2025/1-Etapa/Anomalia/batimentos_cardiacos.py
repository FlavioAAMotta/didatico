import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from datetime import datetime, timedelta

# Configurar seed para reprodutibilidade
np.random.seed(42)

# Criar dataframe base
data_inicio = datetime(2024, 3, 1, 8, 0)  # Começando às 8h da manhã
registros = []

# Definir atividades e seus batimentos cardíacos normais
atividades = {
    'Repouso': (60, 10),         # média 60 bpm, desvio padrão 10
    'Caminhada': (100, 15),      # média 100 bpm, desvio padrão 15
    'Corrida': (150, 20),        # média 150 bpm, desvio padrão 20
    'Exercício': (130, 15),      # média 130 bpm, desvio padrão 15
    'Sono': (50, 8)              # média 50 bpm, desvio padrão 8
}

# Gerar sequência de atividades para um dia típico
sequencia_atividades = []

# Manhã: acordar, exercício, caminhada para o trabalho
sequencia_atividades.extend(['Sono'] * 10)
sequencia_atividades.extend(['Repouso'] * 5)
sequencia_atividades.extend(['Exercício'] * 10)
sequencia_atividades.extend(['Repouso'] * 5)
sequencia_atividades.extend(['Caminhada'] * 10)

# Dia: trabalho (repouso), caminhada no almoço, trabalho
sequencia_atividades.extend(['Repouso'] * 20)
sequencia_atividades.extend(['Caminhada'] * 10)
sequencia_atividades.extend(['Repouso'] * 20)

# Noite: caminhada para casa, corrida, repouso, sono
sequencia_atividades.extend(['Caminhada'] * 10)
sequencia_atividades.extend(['Corrida'] * 15)
sequencia_atividades.extend(['Repouso'] * 15)
sequencia_atividades.extend(['Sono'] * 20)

# Garantir que temos 150 registros
sequencia_atividades = sequencia_atividades[:150]
while len(sequencia_atividades) < 150:
    sequencia_atividades.append('Repouso')

# Gerar batimentos cardíacos para cada atividade
for i, atividade in enumerate(sequencia_atividades):
    # Calcular timestamp (incrementando a cada 10 minutos)
    timestamp = data_inicio + timedelta(minutes=10 * i)
    
    # Obter média e desvio padrão para a atividade
    media, desvio = atividades[atividade]
    
    # Gerar batimentos cardíacos normais para a atividade
    bpm = round(np.random.normal(media, desvio))
    
    # Adicionar ao dataframe
    registros.append({
        'timestamp': timestamp,
        'atividade': atividade,
        'bpm': bpm,
        'anomalia': False,
        'tipo_anomalia': None
    })

# Converter para DataFrame
df = pd.DataFrame(registros)

# Inserir anomalias contextuais (valores que são anômalos apenas no contexto específico)

# Anomalia 1: Batimentos muito altos durante o sono (possível pesadelo ou apneia)
indices_sono = df[df['atividade'] == 'Sono'].index.tolist()
indice_anomalia1 = np.random.choice(indices_sono)
df.loc[indice_anomalia1, 'bpm'] = 110  # Batimentos altos para sono, normais para outras atividades
df.loc[indice_anomalia1, 'anomalia'] = True
df.loc[indice_anomalia1, 'tipo_anomalia'] = 'Batimentos altos durante sono'

# Anomalia 2: Batimentos muito baixos durante exercício (possível problema cardíaco)
indices_exercicio = df[df['atividade'] == 'Exercício'].index.tolist()
indice_anomalia2 = np.random.choice(indices_exercicio)
df.loc[indice_anomalia2, 'bpm'] = 70  # Batimentos baixos para exercício, normais para repouso
df.loc[indice_anomalia2, 'anomalia'] = True
df.loc[indice_anomalia2, 'tipo_anomalia'] = 'Batimentos baixos durante exercício'

# Anomalia 3: Batimentos muito altos em repouso (possível ansiedade ou febre)
indices_repouso = df[df['atividade'] == 'Repouso'].index.tolist()
indice_anomalia3 = np.random.choice(indices_repouso)
df.loc[indice_anomalia3, 'bpm'] = 135  # Batimentos altos para repouso, normais para corrida
df.loc[indice_anomalia3, 'anomalia'] = True
df.loc[indice_anomalia3, 'tipo_anomalia'] = 'Batimentos altos em repouso'

# Anomalia 4: Batimentos muito baixos durante corrida (possível fadiga extrema)
indices_corrida = df[df['atividade'] == 'Corrida'].index.tolist()
indice_anomalia4 = np.random.choice(indices_corrida)
df.loc[indice_anomalia4, 'bpm'] = 90  # Batimentos baixos para corrida, normais para caminhada
df.loc[indice_anomalia4, 'anomalia'] = True
df.loc[indice_anomalia4, 'tipo_anomalia'] = 'Batimentos baixos durante corrida'

# Adicionar colunas úteis para análise
df['hora'] = df['timestamp'].dt.hour
df['minuto'] = df['timestamp'].dt.minute
df['hora_do_dia'] = df['hora'] + df['minuto']/60

# Salvar o dataset
df.to_csv('batimentos_cardiacos.csv', index=False)

# Visualizar informações básicas
print(f"Total de registros: {len(df)}")
print(f"Total de anomalias: {df['anomalia'].sum()}")
print(f"Percentual de anomalias: {df['anomalia'].sum() / len(df) * 100:.2f}%")

# Visualizar batimentos por atividade
plt.figure(figsize=(12, 6))
sns.lineplot(x='timestamp', y='bpm', hue='atividade', data=df)
plt.scatter(df[df['anomalia']]['timestamp'], df[df['anomalia']]['bpm'], 
           color='red', s=100, label='Anomalias')
plt.title('Batimentos Cardíacos ao Longo do Dia')
plt.xlabel('Hora do Dia')
plt.ylabel('Batimentos por Minuto (BPM)')
plt.legend()
plt.tight_layout()
plt.savefig('batimentos_cardiacos.png')
plt.show()

# Visualizar distribuição de batimentos por atividade
plt.figure(figsize=(10, 6))
sns.boxplot(x='atividade', y='bpm', data=df)
plt.scatter(df[df['anomalia']]['atividade'].map({'Repouso': 0, 'Caminhada': 1, 'Corrida': 2, 'Exercício': 3, 'Sono': 4}), 
           df[df['anomalia']]['bpm'], color='red', s=100, marker='X', label='Anomalias')
plt.title('Distribuição de Batimentos Cardíacos por Atividade')
plt.xlabel('Atividade')
plt.ylabel('Batimentos por Minuto (BPM)')
plt.legend()
plt.tight_layout()
plt.savefig('distribuicao_batimentos.png')
plt.show()

# Visualizar batimentos ao longo do dia com atividades destacadas
plt.figure(figsize=(14, 8))
cores_atividades = {'Repouso': 'blue', 'Caminhada': 'green', 'Corrida': 'orange', 'Exercício': 'purple', 'Sono': 'gray'}

for atividade in atividades.keys():
    dados_atividade = df[df['atividade'] == atividade]
    plt.scatter(dados_atividade['hora_do_dia'], dados_atividade['bpm'], 
               color=cores_atividades[atividade], label=atividade, alpha=0.7)

plt.scatter(df[df['anomalia']]['hora_do_dia'], df[df['anomalia']]['bpm'], 
           color='red', s=150, marker='X', label='Anomalias')

for i, row in df[df['anomalia']].iterrows():
    plt.annotate(row['tipo_anomalia'], 
                (row['hora_do_dia'], row['bpm']),
                xytext=(10, 10),
                textcoords='offset points',
                arrowprops=dict(arrowstyle='->', color='red'),
                fontsize=8)

plt.title('Batimentos Cardíacos por Hora do Dia e Atividade')
plt.xlabel('Hora do Dia')
plt.ylabel('Batimentos por Minuto (BPM)')
plt.legend()
plt.grid(True, linestyle='--', alpha=0.7)
plt.tight_layout()
plt.savefig('batimentos_por_hora.png')
plt.show()

print("Análise concluída! Dados salvos em 'batimentos_cardiacos.csv'")
print("Visualizações salvas em arquivos PNG") 