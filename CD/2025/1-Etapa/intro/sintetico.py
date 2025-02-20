import numpy as np
import pandas as pd
from datetime import datetime, timedelta
import random

def gerar_dados_cartao(n_registros=200000):
    # Configurar seed para reprodutibilidade
    np.random.seed(42)
    random.seed(42)
    
    # Gerar timestamps em um período de 1 ano
    data_inicial = datetime(2023, 1, 1)
    timestamps = [data_inicial + timedelta(minutes=random.randint(0, 525600))
                 for _ in range(n_registros)]
    timestamps.sort()
    
    # Gerar valores de transação
    # Transações normais seguem uma distribuição log-normal
    valores_normais = np.random.lognormal(4, 1, n_registros)
    
    # Adicionar alguns outliers para transações fraudulentas
    valores = valores_normais.copy()
    indices_fraude = np.random.choice(n_registros, size=int(n_registros * 0.002), replace=False)
    valores[indices_fraude] = np.random.uniform(500, 5000, size=len(indices_fraude))
    
    # Gerar categorias de comerciantes
    categorias = ['Varejo', 'Restaurante', 'Supermercado', 'E-commerce', 
                  'Viagem', 'Combustível', 'Entretenimento', 'Serviços']
    
    # Gerar dados de localização
    cidades = ['São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Curitiba', 
               'Porto Alegre', 'Salvador', 'Recife', 'Brasília']
    
    # Criar o DataFrame
    df = pd.DataFrame({
        'timestamp': timestamps,
        'valor': valores,
        'categoria': np.random.choice(categorias, n_registros, p=[0.2, 0.15, 0.15, 0.2, 0.1, 0.1, 0.05, 0.05]),
        'cidade': np.random.choice(cidades, n_registros),
        'is_fraude': np.zeros(n_registros, dtype=int)
    })
    
    # Marcar transações fraudulentas
    df.loc[indices_fraude, 'is_fraude'] = 1
    
    # Adicionar padrões de fraude
    # 1. Várias transações pequenas seguidas
    for _ in range(100):
        idx = np.random.randint(0, n_registros-5)
        df.loc[idx:idx+4, 'valor'] = np.random.uniform(10, 50, 5)
        df.loc[idx:idx+4, 'is_fraude'] = 1
    
    # 2. Transações em locais distantes em curto período
    for _ in range(50):
        idx = np.random.randint(0, n_registros-2)
        df.loc[idx:idx+1, 'cidade'] = np.random.choice(cidades, 2, replace=False)
        df.loc[idx:idx+1, 'is_fraude'] = 1
    
    # Adicionar features derivadas
    df['hora'] = df['timestamp'].dt.hour
    df['dia_semana'] = df['timestamp'].dt.dayofweek
    df['mes'] = df['timestamp'].dt.month
    
    # Adicionar flag para horário suspeito (madrugada)
    df['horario_suspeito'] = ((df['hora'] >= 0) & (df['hora'] <= 4)).astype(int)
    
    # Arredondar valores para 2 casas decimais
    df['valor'] = df['valor'].round(2)
    
    return df

# Gerar os dados
df = gerar_dados_cartao()

# Salvar em CSV
df.to_csv('fraudes_cartao_sintetico.csv', index=False)

print(f"Total de registros: {len(df)}")
print(f"Total de fraudes: {df['is_fraude'].sum()}")
print(f"Percentual de fraudes: {(df['is_fraude'].sum() / len(df) * 100):.2f}%")
