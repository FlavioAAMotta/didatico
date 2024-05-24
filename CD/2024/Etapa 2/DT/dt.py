from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier, plot_tree
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np

# Configuração de semente para reprodutibilidade
np.random.seed(42)

# Dados básicos
idades = ['Jovem', 'Meia-idade', 'Idoso']
intensidades = ['Alta', 'Média', 'Baixa']
restrições = ['Sim', 'Não']

# Definindo probabilidades condicionais para atividades baseadas em idade e saúde
atividades_por_idade_saude = {
    ('Jovem', 'Não'): ['Corrida', 'Ciclismo', 'Natação', 'Pilates'],
    ('Jovem', 'Sim'): ['Caminhada', 'Yoga', 'Pilates'],
    ('Meia-idade', 'Não'): ['Natação', 'Ciclismo', 'Corrida', 'Pilates'],
    ('Meia-idade', 'Sim'): ['Caminhada', 'Yoga', 'Pilates'],
    ('Idoso', 'Não'): ['Caminhada', 'Pilates', 'Yoga'],
    ('Idoso', 'Sim'): ['Caminhada', 'Yoga']
}

# Função para escolher atividade baseada na idade e restrição de saúde
def escolher_atividade(idade, restricao):
    atividades = atividades_por_idade_saude[(idade, restricao)]
    return np.random.choice(atividades)

# Gerando os dados
data = {
    'Idade': [np.random.choice(idades, p=[0.3, 0.4, 0.3]) for _ in range(100)],
    'Intensidade Preferida': [np.random.choice(intensidades) for _ in range(100)],
    'Restrição de Saúde': [np.random.choice(restrições, p=[0.2, 0.8]) for _ in range(100)]
}

# Adicionando a atividade recomendada com base em idade e restrição de saúde
data['Atividade Recomendada'] = [
    escolher_atividade(data['Idade'][i], data['Restrição de Saúde'][i]) for i in range(100)
]


df = pd.DataFrame(data)
df_encoded = pd.get_dummies(df, columns=['Idade', 'Intensidade Preferida', 'Restrição de Saúde'])

# Separando os dados em atributos e etiquetas
X = df_encoded.drop('Atividade Recomendada', axis=1)
y = df['Atividade Recomendada']

# Dividindo os dados em treino, validação e teste
X_train, X_temp, y_train, y_temp = train_test_split(X, y, test_size=0.4, random_state=42)
X_valid, X_test, y_valid, y_test = train_test_split(X_temp, y_temp, test_size=0.5, random_state=42)

# Ajustando o modelo com o conjunto de treinamento
model = DecisionTreeClassifier()
model.fit(X_train, y_train)

# Ajustando hiperparâmetros com o conjunto de validação
# Testando diferentes profundidades da árvore
best_score = 0
best_depth = 1
for depth in range(3, 10):
    model = DecisionTreeClassifier(max_depth=depth)
    model.fit(X_train, y_train)
    score = model.score(X_valid, y_valid)
    if score > best_score:
        best_score = score
        best_depth = depth

# Treinando o modelo final com a melhor profundidade encontrada
model = DecisionTreeClassifier(max_depth=best_depth)
model.fit(X_train, y_train)

# Avaliação final no conjunto de teste
test_score = model.score(X_test, y_test)
print(f"Pontuação de Teste: {test_score}")

from sklearn.tree import export_graphviz
import graphviz
# Exportando a árvore de decisão para um arquivo DOT
dot_data = export_graphviz(
    model,
    out_file=None, 
    feature_names=X.columns,
    class_names=model.classes_,
    filled=True,
    rounded=True,
    special_characters=True
)

# Usando o Graphviz para visualizar a árvore
graph = graphviz.Source(dot_data)
graph.render("decision_tree", format='png', cleanup=True)  # Salva a árvore como PNG e limpa arquivos temporários

# Mostrando a árvore diretamente
graph