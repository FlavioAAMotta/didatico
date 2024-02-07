import numpy as np
import pandas as pd

# Gerando dados fictícios para temperatura e quantidade de sorvete vendidos
np.random.seed(42)
temperatura = np.random.randint(18, 35, 50)  # Temperaturas entre 18°C e 34°C
qtd_sorvete = temperatura * 10 + np.random.normal(0, 15, 50)  # Relação linear com ruído gaussiano

# Criando um DataFrame com os dados
df = pd.DataFrame({'Temperatura (°C)': temperatura, 'Qtd Sorvete Vendidos (unidades)': qtd_sorvete})

# Dividindo os dados em conjuntos de treinamento, validação e teste (80%, 10%, 10%)
train, validate, test = np.split(df.sample(frac=1, random_state=42), [int(.8*len(df)), int(.9*len(df))])

# Salvando os conjuntos de dados em arquivos CSV
train.to_csv('./data/train_data.csv', index=False)
validate.to_csv('./data/validate_data.csv', index=False)
test.to_csv('./data/test_data.csv', index=False)

# Exibindo os primeiros registros dos conjuntos de dados
train.head(), validate.head(), test.head()
