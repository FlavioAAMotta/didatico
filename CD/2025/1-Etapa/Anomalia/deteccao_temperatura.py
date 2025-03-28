import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import confusion_matrix, classification_report

# Carregar os dados
print("Carregando dados...")
df = pd.read_csv('temperatura_servidores.csv')
df['timestamp'] = pd.to_datetime(df['timestamp'])

# Verificar os dados
print("\nInformações do dataset:")
print(f"Total de registros: {len(df)}")
print(f"Total de anomalias reais: {df['anomalia'].sum()}")
print(f"Percentual de anomalias: {df['anomalia'].sum() / len(df) * 100:.2f}%")

# ===== Método 1: Detecção por Limites (Threshold) =====
print("\n===== Aplicando Detecção por Limites =====")

# Calcular estatísticas por servidor
stats = df.groupby('servidor')['temperatura_c'].agg(['mean', 'std']).reset_index()
print("\nEstatísticas por servidor:")
print(stats)

# Definir limites para cada servidor (média ± 3*desvio padrão)
limites = {}
for _, row in stats.iterrows():
    servidor = row['servidor']
    media = row['mean']
    desvio = row['std']
    limites[servidor] = {
        'limite_inferior': media - 3 * desvio,
        'limite_superior': media + 3 * desvio
    }

print("\nLimites de temperatura por servidor:")
for servidor, limite in limites.items():
    print(f"{servidor}: {limite['limite_inferior']:.1f}°C a {limite['limite_superior']:.1f}°C")

# Aplicar detecção por limites
df['anomalia_threshold'] = False
for i, row in df.iterrows():
    servidor = row['servidor']
    temperatura = row['temperatura_c']
    if (temperatura < limites[servidor]['limite_inferior'] or 
        temperatura > limites[servidor]['limite_superior']):
        df.loc[i, 'anomalia_threshold'] = True

# Avaliar o modelo
print("\nResultados da Detecção por Limites:")
print(confusion_matrix(df['anomalia'], df['anomalia_threshold']))
print(classification_report(df['anomalia'], df['anomalia_threshold']))

# ===== Método 2: Isolation Forest =====
print("\n===== Aplicando Isolation Forest =====")

# Preparar os dados
# Codificar a variável categórica
servidor_dummies = pd.get_dummies(df['servidor'], prefix='servidor')
X = pd.concat([df[['temperatura_c', 'carga', 'hora']], servidor_dummies], axis=1)

# Normalizar os dados
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Treinar o modelo
contamination = 4/len(df)  # Sabemos que há 4 anomalias
iso_forest = IsolationForest(contamination=contamination, random_state=42)
df['anomalia_iso_forest'] = iso_forest.fit_predict(X_scaled)
# Converter para formato binário (1 para anomalias, 0 para normal)
df['anomalia_iso_forest'] = df['anomalia_iso_forest'].map({1: 0, -1: 1})

# Avaliar o modelo
print("\nResultados do Isolation Forest:")
print(confusion_matrix(df['anomalia'], df['anomalia_iso_forest']))
print(classification_report(df['anomalia'], df['anomalia_iso_forest']))

# ===== Método 3: Z-Score =====
print("\n===== Aplicando Z-Score =====")

# Calcular Z-Score para cada servidor
df['z_score'] = 0
for servidor in servidores:
    mask = df['servidor'] == servidor
    media = df.loc[mask, 'temperatura_c'].mean()
    desvio = df.loc[mask, 'temperatura_c'].std()
    df.loc[mask, 'z_score'] = (df.loc[mask, 'temperatura_c'] - media) / desvio

# Detectar anomalias (|z| > 3)
df['anomalia_zscore'] = abs(df['z_score']) > 3

# Avaliar o modelo
print("\nResultados do Z-Score:")
print(confusion_matrix(df['anomalia'], df['anomalia_zscore']))
print(classification_report(df['anomalia'], df['anomalia_zscore']))

# ===== Visualizações =====
# Visualizar resultados dos três métodos
plt.figure(figsize=(14, 8))
plt.subplot(3, 1, 1)
sns.lineplot(x='timestamp', y='temperatura_c', hue='servidor', data=df, alpha=0.7)
plt.scatter(df[df['anomalia']]['timestamp'], df[df['anomalia']]['temperatura_c'], 
           color='red', s=100, label='Anomalias Reais')
plt.scatter(df[df['anomalia_threshold']]['timestamp'], 
           df[df['anomalia_threshold']]['temperatura_c'], 
           color='orange', marker='x', s=150, label='Threshold')
plt.title('Detecção por Limites (Threshold)')
plt.legend()

plt.subplot(3, 1, 2)
sns.lineplot(x='timestamp', y='temperatura_c', hue='servidor', data=df, alpha=0.7)
plt.scatter(df[df['anomalia']]['timestamp'], df[df['anomalia']]['temperatura_c'], 
           color='red', s=100, label='Anomalias Reais')
plt.scatter(df[df['anomalia_iso_forest']]['timestamp'], 
           df[df['anomalia_iso_forest']]['temperatura_c'], 
           color='green', marker='*', s=150, label='Isolation Forest')
plt.title('Detecção com Isolation Forest')
plt.legend()

plt.subplot(3, 1, 3)
sns.lineplot(x='timestamp', y='temperatura_c', hue='servidor', data=df, alpha=0.7)
plt.scatter(df[df['anomalia']]['timestamp'], df[df['anomalia']]['temperatura_c'], 
           color='red', s=100, label='Anomalias Reais')
plt.scatter(df[df['anomalia_zscore']]['timestamp'], 
           df[df['anomalia_zscore']]['temperatura_c'], 
           color='purple', marker='+', s=150, label='Z-Score')
plt.title('Detecção com Z-Score')
plt.legend()

plt.tight_layout()
plt.savefig('comparacao_metodos_temperatura.png')
plt.show()

# Visualizar Z-Scores
plt.figure(figsize=(12, 6))
plt.axhline(y=3, color='r', linestyle='--', label='Limite Z-Score = 3')
plt.axhline(y=-3, color='r', linestyle='--')
sns.scatterplot(x='timestamp', y='z_score', hue='servidor', data=df)
plt.scatter(df[df['anomalia']]['timestamp'], df[df['anomalia']]['z_score'], 
           color='red', s=100, marker='X', label='Anomalias Reais')
plt.title('Z-Scores das Temperaturas dos Servidores')
plt.xlabel('Data/Hora')
plt.ylabel('Z-Score')
plt.legend()
plt.tight_layout()
plt.savefig('zscore_temperatura.png')
plt.show()

# Visualizar distribuição de temperaturas com limites
plt.figure(figsize=(12, 6))
for i, servidor in enumerate(servidores):
    plt.subplot(1, 3, i+1)
    dados_servidor = df[df['servidor'] == servidor]
    sns.histplot(dados_servidor['temperatura_c'], kde=True)
    
    # Adicionar linhas para os limites
    plt.axvline(x=limites[servidor]['limite_inferior'], color='r', linestyle='--', 
                label=f'Limite Inferior: {limites[servidor]["limite_inferior"]:.1f}°C')
    plt.axvline(x=limites[servidor]['limite_superior'], color='r', linestyle='--',
                label=f'Limite Superior: {limites[servidor]["limite_superior"]:.1f}°C')
    
    # Marcar anomalias
    for temp in dados_servidor[dados_servidor['anomalia']]['temperatura_c']:
        plt.axvline(x=temp, color='black', linestyle='-', linewidth=2)
    
    plt.title(f'Distribuição de Temperatura - {servidor}')
    plt.xlabel('Temperatura (°C)')
    plt.legend()

plt.tight_layout()
plt.savefig('distribuicao_com_limites.png')
plt.show()

print("\nAnálise concluída! Visualizações salvas em arquivos PNG.")
print(f"Anomalias reais: {df['anomalia'].sum()}")
print(f"Anomalias detectadas (Threshold): {df['anomalia_threshold'].sum()}")
print(f"Anomalias detectadas (Isolation Forest): {df['anomalia_iso_forest'].sum()}")
print(f"Anomalias detectadas (Z-Score): {df['anomalia_zscore'].sum()}") 