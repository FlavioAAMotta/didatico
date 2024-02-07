import pandas as pd
import numpy as np

# Criando um dataset hipotético de aluguel de apartamentos em São Paulo
np.random.seed(42)  # Para reprodutibilidade

# Gerando dados
area = np.random.randint(40, 200, 100)  # Área do imóvel em m²
quartos = np.random.randint(1, 5, 100)  # Número de quartos
banheiros = np.random.randint(1, 4, 100)  # Número de banheiros
vagas = np.random.randint(0, 3, 100)  # Vagas de garagem
bairro = np.random.choice(['Moema', 'Bela Vista', 'Vila Mariana', 'Pinheiros', 'Centro'], 100)  # Bairros
aluguel = area * 50 + quartos * 250 + banheiros * 200 + vagas * 150  # Preço do aluguel em R$
aluguel += np.random.randint(-300, 300, 100)  # Adicionando um pouco de ruído aos dados

# Criando o DataFrame
df_alugueis = pd.DataFrame({
    'Area': area,
    'Quartos': quartos,
    'Banheiros': banheiros,
    'Vagas': vagas,
    'Bairro': bairro,
    'Aluguel': aluguel
})

df_alugueis.head()

from sklearn.model_selection import train_test_split
X_train_val, X_test, y_train_val, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
X_train, X_val, y_train, y_val = train_test_split(X_train_val, y_train_val, test_size=0.25, random_state=42)  # 0.25 * 0.8 = 0.2
