import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.ensemble import IsolationForest
from sklearn.metrics import classification_report, confusion_matrix
import xgboost as xgb
import seaborn as sns
import matplotlib.pyplot as plt
from datetime import datetime

# Carregar os dados
print("Carregando dados...")
df = pd.read_csv('fraudes_cartao_sintetico.csv')
df['timestamp'] = pd.to_datetime(df['timestamp'])

# === Análise Exploratória ===
print("\nRealizando análise exploratória...")

# Estatísticas básicas das transações
print("\nEstatísticas de valores por tipo de transação:")
print(df.groupby('is_fraude')['valor'].describe())

# Criar visualizações
plt.figure(figsize=(15, 5))

# Distribuição de valores
plt.subplot(1, 3, 1)
sns.boxplot(x='is_fraude', y='valor', data=df)
plt.title('Distribuição de Valores por Tipo')
plt.yscale('log')

# Fraudes por hora
plt.subplot(1, 3, 2)
fraud_by_hour = df[df['is_fraude'] == 1]['hora'].value_counts().sort_index()
sns.barplot(x=fraud_by_hour.index, y=fraud_by_hour.values)
plt.title('Fraudes por Hora do Dia')

# Fraudes por categoria
plt.subplot(1, 3, 3)
fraud_by_cat = df[df['is_fraude'] == 1]['categoria'].value_counts()
sns.barplot(x=fraud_by_cat.values, y=fraud_by_cat.index)
plt.title('Fraudes por Categoria')

plt.tight_layout()
plt.savefig('analise_fraudes.png')
plt.close()

# === Preparação dos Dados ===
print("\nPreparando dados para modelagem...")

# Codificar variáveis categóricas
le = LabelEncoder()
df['categoria_encoded'] = le.fit_transform(df['categoria'])
df['cidade_encoded'] = le.fit_transform(df['cidade'])

# Selecionar features para o modelo
features = ['valor', 'categoria_encoded', 'cidade_encoded', 
           'hora', 'dia_semana', 'mes', 'horario_suspeito']

X = df[features]
y = df['is_fraude']

# Normalizar os dados
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Dividir em treino e teste
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, 
                                                    test_size=0.2, 
                                                    random_state=42,
                                                    stratify=y)

# === Modelo Não Supervisionado (Isolation Forest) ===
print("\nAplicando Isolation Forest...")

iso_forest = IsolationForest(contamination=0.01, random_state=42)
y_pred_iso = iso_forest.fit_predict(X_scaled)
# Converter predições (-1 para anomalias, 1 para normal) para 0 e 1
y_pred_iso = np.where(y_pred_iso == -1, 1, 0)

print("\nResultados Isolation Forest:")
print(classification_report(df['is_fraude'], y_pred_iso))

# === Modelo Supervisionado (XGBoost) ===
print("\nAplicando XGBoost...")

# Criar e treinar o modelo
xgb_model = xgb.XGBClassifier(
    scale_pos_weight=len(y_train[y_train==0])/len(y_train[y_train==1]),
    random_state=42
)
xgb_model.fit(X_train, y_train)

# Fazer predições
y_pred_xgb = xgb_model.predict(X_test)

# Avaliar resultados
print("\nResultados XGBoost:")
print(classification_report(y_test, y_pred_xgb))

# Plotar importância das features
plt.figure(figsize=(10, 5))
feature_importance = pd.DataFrame({
    'feature': features,
    'importance': xgb_model.feature_importances_
})
feature_importance = feature_importance.sort_values('importance', ascending=False)

sns.barplot(x='importance', y='feature', data=feature_importance)
plt.title('Importância das Features - XGBoost')
plt.tight_layout()
plt.savefig('feature_importance.png')
plt.close()

print("\nAnálise completa! Visualizações salvas em 'analise_fraudes.png' e 'feature_importance.png'")
