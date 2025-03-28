import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from datetime import datetime, timedelta

# Configurar seed para reprodutibilidade
np.random.seed(42)

# Definir os servidores
servidores = ['Servidor A', 'Servidor B', 'Servidor C']

# Função para gerar temperatura normal para cada servidor
def gerar_temperatura_normal(servidor):
    if servidor == 'Servidor A':
        # Servidor A opera normalmente entre 35-40°C
        return round(np.random.normal(37.5, 1.2), 1)
    elif servidor == 'Servidor B':
        # Servidor B opera normalmente entre 32-38°C
        return round(np.random.normal(35.0, 1.5), 1)
    elif servidor == 'Servidor C':
        # Servidor C opera normalmente entre 38-42°C
        return round(np.random.normal(40.0, 1.0), 1)
    return 0

# Criar dataframe base
data_inicio = datetime(2024, 3, 1, 0, 0)  # Começando à meia-noite
registros = []

# Gerar 120 registros (40 por servidor)
for i in range(120):
    # Alternar entre os servidores
    servidor = servidores[i % len(servidores)]
    
    # Calcular timestamp (incrementando a cada 30 minutos)
    timestamp = data_inicio + timedelta(minutes=30 * i)
    
    # Gerar temperatura normal
    temperatura = gerar_temperatura_normal(servidor)
    
    # Adicionar ao dataframe
    registros.append({
        'timestamp': timestamp,
        'servidor': servidor,
        'temperatura_c': temperatura,
        'anomalia': False
    })

# Converter para DataFrame
df = pd.DataFrame(registros)

# Inserir anomalias pontuais bem evidentes
# Anomalia 1: Servidor A com temperatura muito alta (superaquecimento)
indice_anomalia1 = 10
df.loc[indice_anomalia1, 'temperatura_c'] = 65.8
df.loc[indice_anomalia1, 'anomalia'] = True

# Anomalia 2: Servidor B com temperatura muito baixa (possível falha no sensor)
indice_anomalia2 = 45
df.loc[indice_anomalia2, 'temperatura_c'] = 12.3
df.loc[indice_anomalia2, 'anomalia'] = True

# Anomalia 4: Servidor A com temperatura zero (possível desligamento)
indice_anomalia4 = 115
df.loc[indice_anomalia4, 'temperatura_c'] = 0.0
df.loc[indice_anomalia4, 'anomalia'] = True

# Adicionar colunas úteis para análise
df['hora'] = df['timestamp'].dt.hour
df['dia_semana'] = df['timestamp'].dt.day_name()
df['carga'] = np.random.uniform(20, 95, size=len(df))  # Carga do servidor (%)

# Salvar o dataset
df.to_csv('temperatura_servidores.csv', index=False)

# Visualizar informações básicas
print(f"Total de registros: {len(df)}")
print(f"Total de anomalias: {df['anomalia'].sum()}")
print(f"Percentual de anomalias: {df['anomalia'].sum() / len(df) * 100:.2f}%")

# Visualizar temperatura por servidor
plt.figure(figsize=(12, 6))
sns.lineplot(x='timestamp', y='temperatura_c', hue='servidor', data=df)
plt.scatter(df[df['anomalia']]['timestamp'], df[df['anomalia']]['temperatura_c'], 
           color='red', s=100, label='Anomalias')
plt.title('Temperatura dos Servidores ao Longo do Tempo')
plt.xlabel('Data/Hora')
plt.ylabel('Temperatura (°C)')
plt.legend()
plt.tight_layout()
plt.savefig('temperatura_servidores.png')
plt.show()

# Visualizar distribuição de temperatura por servidor
plt.figure(figsize=(10, 6))
sns.boxplot(x='servidor', y='temperatura_c', data=df)
plt.title('Distribuição de Temperatura por Servidor')
plt.xlabel('Servidor')
plt.ylabel('Temperatura (°C)')
plt.tight_layout()
plt.savefig('distribuicao_temperatura.png')
plt.show()

# Visualizar relação entre temperatura e carga
plt.figure(figsize=(10, 6))
sns.scatterplot(x='carga', y='temperatura_c', hue='servidor', data=df)
plt.scatter(df[df['anomalia']]['carga'], df[df['anomalia']]['temperatura_c'], 
           color='red', s=100, marker='X', label='Anomalias')
plt.title('Relação entre Carga e Temperatura dos Servidores')
plt.xlabel('Carga do Servidor (%)')
plt.ylabel('Temperatura (°C)')
plt.legend()
plt.tight_layout()
plt.savefig('temperatura_vs_carga.png')
plt.show()

print("Análise concluída! Dados salvos em 'temperatura_servidores.csv'")
print("Visualizações salvas em arquivos PNG") 