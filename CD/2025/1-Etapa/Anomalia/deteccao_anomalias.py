import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import DBSCAN
from sklearn.decomposition import PCA
from sklearn.metrics import confusion_matrix, classification_report

# Carregar os dados
print("Carregando dados...")
df = pd.read_csv('consumo_eletrodomesticos.csv')
df['timestamp'] = pd.to_datetime(df['timestamp'])

# Verificar os dados
print("\nInformações do dataset:")
print(f"Total de registros: {len(df)}")
print(f"Total de anomalias reais: {df['anomalia'].sum()}")
print(f"Percentual de anomalias: {df['anomalia'].sum() / len(df) * 100:.2f}%")

# Preparar os dados para modelagem
# Criar features adicionais
df['hora_do_dia'] = df['timestamp'].dt.hour
df['dia_da_semana'] = df['timestamp'].dt.dayofweek
df['minuto'] = df['timestamp'].dt.minute

# Codificar a variável categórica
eletrodomesticos_dummies = pd.get_dummies(df['eletrodomestico'], prefix='eletro')
df = pd.concat([df, eletrodomesticos_dummies], axis=1)

# Selecionar features para o modelo
features = ['consumo_kwh', 'hora_do_dia', 'dia_da_semana', 'minuto'] + list(eletrodomesticos_dummies.columns)
X = df[features].copy()

# Normalizar os dados
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# ===== Método 1: Isolation Forest =====
print("\n===== Aplicando Isolation Forest =====")
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

# ===== Método 2: DBSCAN =====
print("\n===== Aplicando DBSCAN =====")
# Reduzir dimensionalidade para visualização
pca = PCA(n_components=2)
X_pca = pca.fit_transform(X_scaled)

# Aplicar DBSCAN
dbscan = DBSCAN(eps=0.5, min_samples=5)
df['cluster'] = dbscan.fit_predict(X_scaled)
# Pontos com cluster -1 são considerados anomalias
df['anomalia_dbscan'] = (df['cluster'] == -1).astype(int)

# Avaliar o modelo
print("\nResultados do DBSCAN:")
print(confusion_matrix(df['anomalia'], df['anomalia_dbscan']))
print(classification_report(df['anomalia'], df['anomalia_dbscan']))

# ===== Visualizações =====
# Visualizar resultados do Isolation Forest
plt.figure(figsize=(12, 6))
sns.lineplot(x='timestamp', y='consumo_kwh', hue='eletrodomestico', data=df, alpha=0.7)
plt.scatter(df[df['anomalia']]['timestamp'], df[df['anomalia']]['consumo_kwh'], 
           color='red', s=100, label='Anomalias Reais')
plt.scatter(df[df['anomalia_iso_forest'] == 1]['timestamp'], 
           df[df['anomalia_iso_forest'] == 1]['consumo_kwh'], 
           color='orange', marker='x', s=150, label='Anomalias Detectadas (Isolation Forest)')
plt.title('Detecção de Anomalias com Isolation Forest')
plt.xlabel('Data/Hora')
plt.ylabel('Consumo (kWh)')
plt.legend()
plt.tight_layout()
plt.savefig('anomalias_isolation_forest.png')
plt.show()

# Visualizar resultados do DBSCAN em espaço PCA
plt.figure(figsize=(10, 8))
plt.scatter(X_pca[:, 0], X_pca[:, 1], c=df['cluster'], cmap='viridis', alpha=0.7)
plt.scatter(X_pca[df['anomalia'] == 1, 0], X_pca[df['anomalia'] == 1, 1], 
           color='red', s=100, label='Anomalias Reais')
plt.title('Clusters DBSCAN (PCA)')
plt.xlabel('Componente Principal 1')
plt.ylabel('Componente Principal 2')
plt.colorbar(label='Cluster')
plt.legend()
plt.tight_layout()
plt.savefig('anomalias_dbscan_pca.png')
plt.show()

# Visualizar comparação de métodos
plt.figure(figsize=(12, 6))
plt.plot(df['timestamp'], df['consumo_kwh'], 'b-', alpha=0.3, label='Consumo')
plt.scatter(df[df['anomalia'] == 1]['timestamp'], df[df['anomalia'] == 1]['consumo_kwh'], 
           color='red', s=100, label='Anomalias Reais')
plt.scatter(df[df['anomalia_iso_forest'] == 1]['timestamp'], 
           df[df['anomalia_iso_forest'] == 1]['consumo_kwh'], 
           color='orange', marker='x', s=150, label='Isolation Forest')
plt.scatter(df[df['anomalia_dbscan'] == 1]['timestamp'], 
           df[df['anomalia_dbscan'] == 1]['consumo_kwh'], 
           color='green', marker='*', s=150, label='DBSCAN')
plt.title('Comparação de Métodos de Detecção de Anomalias')
plt.xlabel('Data/Hora')
plt.ylabel('Consumo (kWh)')
plt.legend()
plt.tight_layout()
plt.savefig('comparacao_metodos.png')
plt.show()

# ===== Análise de Importância de Features =====
# Calcular scores de anomalia para cada feature
feature_importance = np.abs(iso_forest.decision_function(X_scaled))
feature_importance = pd.DataFrame({
    'Feature': features,
    'Importance': feature_importance.mean(axis=0)
})
feature_importance = feature_importance.sort_values('Importance', ascending=False)

plt.figure(figsize=(10, 6))
sns.barplot(x='Importance', y='Feature', data=feature_importance)
plt.title('Importância das Features na Detecção de Anomalias')
plt.tight_layout()
plt.savefig('feature_importance.png')
plt.show()

print("\nAnálise concluída! Visualizações salvas em arquivos PNG.")
print(f"Anomalias reais: {df['anomalia'].sum()}")
print(f"Anomalias detectadas (Isolation Forest): {df['anomalia_iso_forest'].sum()}")
print(f"Anomalias detectadas (DBSCAN): {df['anomalia_dbscan'].sum()}") 