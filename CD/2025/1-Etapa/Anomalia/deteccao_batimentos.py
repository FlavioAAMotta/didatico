import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import confusion_matrix, classification_report
from sklearn.neighbors import LocalOutlierFactor
from sklearn.svm import OneClassSVM

# Carregar os dados
print("Carregando dados...")
df = pd.read_csv('batimentos_cardiacos.csv')
df['timestamp'] = pd.to_datetime(df['timestamp'])

# Verificar os dados
print("\nInformações do dataset:")
print(f"Total de registros: {len(df)}")
print(f"Total de anomalias reais: {df['anomalia'].sum()}")
print(f"Percentual de anomalias: {df['anomalia'].sum() / len(df) * 100:.2f}%")

# ===== Método 1: Detecção Contextual por Atividade =====
print("\n===== Aplicando Detecção Contextual por Atividade =====")

# Calcular estatísticas por atividade
stats = df.groupby('atividade')['bpm'].agg(['mean', 'std']).reset_index()
print("\nEstatísticas por atividade:")
print(stats)

# Definir limites para cada atividade (média ± 2*desvio padrão)
limites = {}
for _, row in stats.iterrows():
    atividade = row['atividade']
    media = row['mean']
    desvio = row['std']
    limites[atividade] = {
        'limite_inferior': media - 2 * desvio,
        'limite_superior': media + 2 * desvio
    }

print("\nLimites de BPM por atividade:")
for atividade, limite in limites.items():
    print(f"{atividade}: {limite['limite_inferior']:.1f} a {limite['limite_superior']:.1f} BPM")

# Aplicar detecção contextual
df['anomalia_contextual'] = False
for i, row in df.iterrows():
    atividade = row['atividade']
    bpm = row['bpm']
    if (bpm < limites[atividade]['limite_inferior'] or 
        bpm > limites[atividade]['limite_superior']):
        df.loc[i, 'anomalia_contextual'] = True

# Avaliar o modelo
print("\nResultados da Detecção Contextual:")
print(confusion_matrix(df['anomalia'], df['anomalia_contextual']))
print(classification_report(df['anomalia'], df['anomalia_contextual']))

# ===== Método 2: Z-Score Contextual =====
print("\n===== Aplicando Z-Score Contextual =====")

# Calcular Z-Score para cada atividade
df['z_score'] = 0
for atividade in df['atividade'].unique():
    mask = df['atividade'] == atividade
    media = df.loc[mask, 'bpm'].mean()
    desvio = df.loc[mask, 'bpm'].std()
    df.loc[mask, 'z_score'] = (df.loc[mask, 'bpm'] - media) / desvio

# Detectar anomalias (|z| > 2)
df['anomalia_zscore'] = abs(df['z_score']) > 2

# Avaliar o modelo
print("\nResultados do Z-Score Contextual:")
print(confusion_matrix(df['anomalia'], df['anomalia_zscore']))
print(classification_report(df['anomalia'], df['anomalia_zscore']))

# ===== Método 3: Local Outlier Factor (LOF) com Contexto =====
print("\n===== Aplicando Local Outlier Factor (LOF) com Contexto =====")

# Preparar os dados com one-hot encoding para atividades
atividade_dummies = pd.get_dummies(df['atividade'], prefix='atividade')
X = pd.concat([df[['bpm', 'hora_do_dia']], atividade_dummies], axis=1)

# Normalizar os dados
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Aplicar LOF
lof = LocalOutlierFactor(n_neighbors=20, contamination=0.03)
df['anomalia_lof'] = lof.fit_predict(X_scaled)
# Converter para formato binário (1 para anomalias, 0 para normal)
df['anomalia_lof'] = df['anomalia_lof'].map({1: 0, -1: 1})

# Avaliar o modelo
print("\nResultados do LOF:")
print(confusion_matrix(df['anomalia'], df['anomalia_lof']))
print(classification_report(df['anomalia'], df['anomalia_lof']))

# ===== Método 4: One-Class SVM com Contexto =====
print("\n===== Aplicando One-Class SVM com Contexto =====")

# Aplicar One-Class SVM
svm = OneClassSVM(nu=0.03, kernel="rbf", gamma=0.1)
df['anomalia_svm'] = svm.fit_predict(X_scaled)
# Converter para formato binário (1 para anomalias, 0 para normal)
df['anomalia_svm'] = df['anomalia_svm'].map({1: 0, -1: 1})

# Avaliar o modelo
print("\nResultados do One-Class SVM:")
print(confusion_matrix(df['anomalia'], df['anomalia_svm']))
print(classification_report(df['anomalia'], df['anomalia_svm']))

# ===== Visualizações =====
# Visualizar resultados dos métodos
plt.figure(figsize=(14, 10))

# Detecção Contextual
plt.subplot(2, 2, 1)
for atividade, cor in zip(df['atividade'].unique(), ['blue', 'green', 'orange', 'purple', 'gray']):
    dados_atividade = df[df['atividade'] == atividade]
    plt.scatter(dados_atividade['hora_do_dia'], dados_atividade['bpm'], 
               color=cor, label=atividade, alpha=0.5, s=30)

plt.scatter(df[df['anomalia']]['hora_do_dia'], df[df['anomalia']]['bpm'], 
           color='red', s=100, marker='o', label='Anomalias Reais', edgecolor='black')
plt.scatter(df[df['anomalia_contextual']]['hora_do_dia'], df[df['anomalia_contextual']]['bpm'], 
           color='yellow', s=80, marker='x', label='Detecção Contextual')
plt.title('Detecção Contextual por Atividade')
plt.xlabel('Hora do Dia')
plt.ylabel('BPM')
plt.legend(loc='upper left', bbox_to_anchor=(1, 1))

# Z-Score Contextual
plt.subplot(2, 2, 2)
for atividade, cor in zip(df['atividade'].unique(), ['blue', 'green', 'orange', 'purple', 'gray']):
    dados_atividade = df[df['atividade'] == atividade]
    plt.scatter(dados_atividade['hora_do_dia'], dados_atividade['bpm'], 
               color=cor, label=atividade, alpha=0.5, s=30)

plt.scatter(df[df['anomalia']]['hora_do_dia'], df[df['anomalia']]['bpm'], 
           color='red', s=100, marker='o', label='Anomalias Reais', edgecolor='black')
plt.scatter(df[df['anomalia_zscore']]['hora_do_dia'], df[df['anomalia_zscore']]['bpm'], 
           color='cyan', s=80, marker='+', label='Z-Score Contextual')
plt.title('Z-Score Contextual')
plt.xlabel('Hora do Dia')
plt.ylabel('BPM')
plt.legend(loc='upper left', bbox_to_anchor=(1, 1))

# LOF
plt.subplot(2, 2, 3)
for atividade, cor in zip(df['atividade'].unique(), ['blue', 'green', 'orange', 'purple', 'gray']):
    dados_atividade = df[df['atividade'] == atividade]
    plt.scatter(dados_atividade['hora_do_dia'], dados_atividade['bpm'], 
               color=cor, label=atividade, alpha=0.5, s=30)

plt.scatter(df[df['anomalia']]['hora_do_dia'], df[df['anomalia']]['bpm'], 
           color='red', s=100, marker='o', label='Anomalias Reais', edgecolor='black')
plt.scatter(df[df['anomalia_lof']]['hora_do_dia'], df[df['anomalia_lof']]['bpm'], 
           color='magenta', s=80, marker='*', label='LOF')
plt.title('Local Outlier Factor (LOF)')
plt.xlabel('Hora do Dia')
plt.ylabel('BPM')
plt.legend(loc='upper left', bbox_to_anchor=(1, 1))

# One-Class SVM
plt.subplot(2, 2, 4)
for atividade, cor in zip(df['atividade'].unique(), ['blue', 'green', 'orange', 'purple', 'gray']):
    dados_atividade = df[df['atividade'] == atividade]
    plt.scatter(dados_atividade['hora_do_dia'], dados_atividade['bpm'], 
               color=cor, label=atividade, alpha=0.5, s=30)

plt.scatter(df[df['anomalia']]['hora_do_dia'], df[df['anomalia']]['bpm'], 
           color='red', s=100, marker='o', label='Anomalias Reais', edgecolor='black')
plt.scatter(df[df['anomalia_svm']]['hora_do_dia'], df[df['anomalia_svm']]['bpm'], 
           color='brown', s=80, marker='d', label='One-Class SVM')
plt.title('One-Class SVM')
plt.xlabel('Hora do Dia')
plt.ylabel('BPM')
plt.legend(loc='upper left', bbox_to_anchor=(1, 1))

plt.tight_layout()
plt.savefig('comparacao_metodos_batimentos.png')
plt.show()

# Visualizar Z-Scores por atividade
plt.figure(figsize=(12, 6))
plt.axhline(y=2, color='r', linestyle='--', label='Limite Z-Score = 2')
plt.axhline(y=-2, color='r', linestyle='--')

for atividade, cor in zip(df['atividade'].unique(), ['blue', 'green', 'orange', 'purple', 'gray']):
    dados_atividade = df[df['atividade'] == atividade]
    plt.scatter(dados_atividade['hora_do_dia'], dados_atividade['z_score'], 
               color=cor, label=atividade, alpha=0.7)

plt.scatter(df[df['anomalia']]['hora_do_dia'], df[df['anomalia']]['z_score'], 
           color='red', s=100, marker='X', label='Anomalias Reais')
plt.title('Z-Scores dos Batimentos Cardíacos por Atividade')
plt.xlabel('Hora do Dia')
plt.ylabel('Z-Score')
plt.legend()
plt.grid(True, linestyle='--', alpha=0.7)
plt.tight_layout()
plt.savefig('zscore_batimentos.png')
plt.show()

# Visualizar distribuição de batimentos com limites por atividade
plt.figure(figsize=(15, 10))
for i, atividade in enumerate(df['atividade'].unique()):
    plt.subplot(2, 3, i+1)
    dados_atividade = df[df['atividade'] == atividade]
    sns.histplot(dados_atividade['bpm'], kde=True)
    
    # Adicionar linhas para os limites
    plt.axvline(x=limites[atividade]['limite_inferior'], color='r', linestyle='--', 
                label=f'Limite Inferior: {limites[atividade]["limite_inferior"]:.1f}')
    plt.axvline(x=limites[atividade]['limite_superior'], color='r', linestyle='--',
                label=f'Limite Superior: {limites[atividade]["limite_superior"]:.1f}')
    
    # Marcar anomalias
    for bpm in dados_atividade[dados_atividade['anomalia']]['bpm']:
        plt.axvline(x=bpm, color='black', linestyle='-', linewidth=2)
    
    plt.title(f'Distribuição de BPM - {atividade}')
    plt.xlabel('Batimentos por Minuto (BPM)')
    plt.legend()

plt.tight_layout()
plt.savefig('distribuicao_com_limites_batimentos.png')
plt.show()

# Criar matriz de confusão visual para todos os métodos
metodos = ['Contextual', 'Z-Score', 'LOF', 'SVM']
acertos = []
falsos_positivos = []
falsos_negativos = []

for metodo, coluna in zip(metodos, ['anomalia_contextual', 'anomalia_zscore', 'anomalia_lof', 'anomalia_svm']):
    cm = confusion_matrix(df['anomalia'], df[coluna])
    # Verdadeiros negativos, falsos positivos, falsos negativos, verdadeiros positivos
    tn, fp, fn, tp = cm.ravel()
    acertos.append(tp)
    falsos_positivos.append(fp)
    falsos_negativos.append(fn)

plt.figure(figsize=(12, 6))
x = np.arange(len(metodos))
width = 0.25

plt.bar(x - width, acertos, width, label='Anomalias Detectadas Corretamente')
plt.bar(x, falsos_positivos, width, label='Falsos Positivos')
plt.bar(x + width, falsos_negativos, width, label='Falsos Negativos')

plt.xlabel('Método de Detecção')
plt.ylabel('Quantidade')
plt.title('Comparação de Desempenho dos Métodos de Detecção')
plt.xticks(x, metodos)
plt.legend()
plt.tight_layout()
plt.savefig('comparacao_desempenho.png')
plt.show()

print("\nAnálise concluída! Visualizações salvas em arquivos PNG.")
print(f"Anomalias reais: {df['anomalia'].sum()}")
print(f"Anomalias detectadas (Contextual): {df['anomalia_contextual'].sum()}")
print(f"Anomalias detectadas (Z-Score): {df['anomalia_zscore'].sum()}")
print(f"Anomalias detectadas (LOF): {df['anomalia_lof'].sum()}")
print(f"Anomalias detectadas (SVM): {df['anomalia_svm'].sum()}") 