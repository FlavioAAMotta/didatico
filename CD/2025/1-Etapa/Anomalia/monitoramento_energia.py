import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from datetime import datetime, timedelta

# Configurar seed para reprodutibilidade
np.random.seed(42)

# Definir os eletrodomésticos de cozinha
eletrodomesticos = ['Geladeira', 'Microondas', 'Cafeteira', 'Air Fryer']

# Função para gerar consumo normal para cada eletrodoméstico
def gerar_consumo_normal(eletrodomestico):
    if eletrodomestico == 'Geladeira':
        # Geladeira tem consumo baixo e constante
        return round(np.random.normal(0.25, 0.05), 2)
    elif eletrodomestico == 'Microondas':
        # Microondas tem consumo médio-alto quando ligado
        return round(np.random.normal(1.2, 0.2), 2)
    elif eletrodomestico == 'Cafeteira':
        # Cafeteira tem consumo médio
        return round(np.random.normal(0.8, 0.15), 2)
    elif eletrodomestico == 'Air Fryer':
        # Air Fryer tem consumo alto
        return round(np.random.normal(1.5, 0.25), 2)
    return 0

# Criar dataframe base
data_inicio = datetime(2024, 3, 1, 8, 0)  # Começando às 8h da manhã
registros = []

# Gerar 150 registros (aproximadamente 1 por hora para cada eletrodoméstico)
for i in range(150):
    # Alternar entre os eletrodomésticos
    eletrodomestico = eletrodomesticos[i % len(eletrodomesticos)]
    
    # Calcular timestamp (incrementando a cada 15 minutos)
    timestamp = data_inicio + timedelta(minutes=15 * i)
    
    # Gerar consumo normal
    consumo = gerar_consumo_normal(eletrodomestico)
    
    # Adicionar ao dataframe
    registros.append({
        'timestamp': timestamp,
        'eletrodomestico': eletrodomestico,
        'consumo_kwh': consumo,
        'anomalia': False
    })

# Converter para DataFrame
df = pd.DataFrame(registros)

# Inserir anomalias em dois grupos de duas próximas
# Grupo 1: Anomalias próximas na Geladeira e no Microondas
indice_anomalia1 = 25  # Aproximadamente no início dos dados
df.loc[indice_anomalia1, 'consumo_kwh'] = 1.8  # Geladeira com consumo muito alto
df.loc[indice_anomalia1, 'anomalia'] = True
df.loc[indice_anomalia1 + 1, 'consumo_kwh'] = 3.5  # Microondas com consumo extremamente alto
df.loc[indice_anomalia1 + 1, 'anomalia'] = True

# Grupo 2: Anomalias próximas na Cafeteira e no Air Fryer
indice_anomalia2 = 100  # Aproximadamente no meio dos dados
df.loc[indice_anomalia2, 'consumo_kwh'] = 0.05  # Cafeteira com consumo muito baixo (quase desligada)
df.loc[indice_anomalia2, 'anomalia'] = True
df.loc[indice_anomalia2 + 1, 'consumo_kwh'] = 0.1  # Air Fryer com consumo muito baixo
df.loc[indice_anomalia2 + 1, 'anomalia'] = True

# Adicionar coluna de dia da semana e hora do dia para análises
df['dia_semana'] = df['timestamp'].dt.day_name()
df['hora'] = df['timestamp'].dt.hour

# Salvar o dataset
df.to_csv('consumo_eletrodomesticos.csv', index=False)

# Visualizar informações básicas
print(f"Total de registros: {len(df)}")
print(f"Total de anomalias: {df['anomalia'].sum()}")
print(f"Percentual de anomalias: {df['anomalia'].sum() / len(df) * 100:.2f}%")

# Visualizar consumo por eletrodoméstico
plt.figure(figsize=(12, 6))
sns.lineplot(x='timestamp', y='consumo_kwh', hue='eletrodomestico', data=df)
plt.scatter(df[df['anomalia']]['timestamp'], df[df['anomalia']]['consumo_kwh'], 
           color='red', s=100, label='Anomalias')
plt.title('Consumo de Energia por Eletrodoméstico')
plt.xlabel('Data/Hora')
plt.ylabel('Consumo (kWh)')
plt.legend()
plt.tight_layout()
plt.savefig('consumo_eletrodomesticos.png')
plt.show()

# Visualizar distribuição de consumo por eletrodoméstico
plt.figure(figsize=(10, 6))
sns.boxplot(x='eletrodomestico', y='consumo_kwh', data=df)
plt.title('Distribuição de Consumo por Eletrodoméstico')
plt.xlabel('Eletrodoméstico')
plt.ylabel('Consumo (kWh)')
plt.tight_layout()
plt.savefig('distribuicao_consumo.png')
plt.show()

print("Análise concluída! Dados salvos em 'consumo_eletrodomesticos.csv'")
print("Visualizações salvas em 'consumo_eletrodomesticos.png' e 'distribuicao_consumo.png'") 