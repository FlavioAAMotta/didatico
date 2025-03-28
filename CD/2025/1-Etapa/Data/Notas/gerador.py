import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

# Definindo um seed para reprodutibilidade
np.random.seed(42)

# Gerando dados para horas de estudo (entre 0 e 12 horas)
n_amostras = 100
horas_estudo = np.random.uniform(0, 12, n_amostras)

# Criando uma relação linear com ruído
# Nota = 4 + (0.5 * horas_estudo) + ruído
# Isso significa que:
# - Nota mínima esperada (0 horas) = ~4
# - Cada hora adicional aumenta 0.5 pontos em média
# - Adicionamos ruído gaussiano para simular variações reais
ruido = np.random.normal(0, 1, n_amostras)
notas_prova = 4 + (0.5 * horas_estudo) + ruido

# Garantindo que as notas estejam entre 0 e 10
notas_prova = np.clip(notas_prova, 0, 10)

# Criando o DataFrame
df = pd.DataFrame({
    'HorasEstudo': horas_estudo,
    'NotaProva': notas_prova
})

# Salvando o dataset
df.to_csv('notas_estudantes.csv', index=False)

# Visualizando a distribuição dos dados
plt.figure(figsize=(10, 6))
plt.scatter(horas_estudo, notas_prova, alpha=0.5)
plt.xlabel('Horas de Estudo')
plt.ylabel('Nota da Prova')
plt.title('Relação entre Horas de Estudo e Notas')
plt.grid(True)
plt.savefig('distribuicao_notas.png')
plt.close()
