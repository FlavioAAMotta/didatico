import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score
import matplotlib.pyplot as plt

# Função para imprimir o DataFrame formatado
def imprimirDFFormatado(df, titulo):
    print(f'Conjunto de {titulo}')
    print(df.to_string(index=False))
    print(df.shape)
    print()

def train_test_split(df, test_size, random_state):
    df = df.sample(frac=1, random_state=random_state)
    n = len(df)
    n_teste = int(test_size * n)
    teste = df.iloc[:n_teste]
    treino = df.iloc[n_teste:]
    return treino, teste

# Carregando os dados
df = pd.read_csv('data/all_sorvete.csv')

# Dividindo os dados
treino, teste = train_test_split(df, test_size=0.3, random_state=42)
imprimirDFFormatado(treino, 'treino')
imprimirDFFormatado(teste, 'teste')

# Preparando o plot
plt.figure(figsize=(10, 6))
plt.scatter(df['Temperatura (C)'], df['Qtd Sorvete Vendidos (unidades)'], color='blue', label='Dados reais')
temperaturas = np.linspace(df['Temperatura (C)'].min(), df['Temperatura (C)'].max(), 100)

# Loop para testar ambos os modelos
for incluir_quadrado in [False, True]:
    X_treino = treino[['Temperatura (C)']].copy()
    X_teste = teste[['Temperatura (C)']].copy()
    if incluir_quadrado:
        X_treino['Temperatura²'] = X_treino['Temperatura (C)'] ** 2
        X_teste['Temperatura²'] = X_teste['Temperatura (C)'] ** 2
    y_treino = treino['Qtd Sorvete Vendidos (unidades)']
    y_teste = teste['Qtd Sorvete Vendidos (unidades)']
    modelo = LinearRegression()
    modelo.fit(X_treino, y_treino)
    if incluir_quadrado:
        print(f"Modelo com Temperatura²: y = {modelo.coef_[0]:.2f}x + {modelo.coef_[1]:.2f}x² + {modelo.intercept_:.2f}")
    else:
        print(f"Modelo Linear Simples: y = {modelo.coef_[0]:.2f}x + {modelo.intercept_:.2f}")

    r2_treino = r2_score(y_treino, modelo.predict(X_treino))
    r2_teste = r2_score(y_teste, modelo.predict(X_teste))
    print(f'R² treino: {r2_treino:.2f} (incluir quadrado da temperatura: {incluir_quadrado})')
    print(f'R² teste: {r2_teste:.2f} (incluir quadrado da temperatura: {incluir_quadrado})')
    
    # Preparando os dados para plotagem
    if incluir_quadrado:
        temperaturas_df = pd.DataFrame({'Temperatura (C)': temperaturas, 'Temperatura²': temperaturas**2})
        plt.plot(temperaturas, modelo.predict(temperaturas_df), label='Modelo com Temperatura²', color='green')
    else:
        temperaturas_df = pd.DataFrame({'Temperatura (C)': temperaturas})
        plt.plot(temperaturas, modelo.predict(temperaturas_df), label='Modelo Linear Simples', color='red')

plt.xlabel('Temperatura (C)')
plt.ylabel('Qtd Sorvete Vendidos (unidades)')
plt.title('Comparação dos Modelos de Regressão Linear')
plt.legend()
plt.show()
