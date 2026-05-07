import numpy as np
import random
import matplotlib.pyplot as plt

class AlgoritmoGeneticoRotas:
    def __init__(self, n_pontos_entrega=10, tamanho_populacao=50, n_geracoes=100):
        # Gerando pontos de entrega aleatórios
        self.pontos_entrega = np.random.rand(n_pontos_entrega, 2) * 100
        self.tamanho_populacao = tamanho_populacao
        self.n_geracoes = n_geracoes
        
    def criar_cromossomo(self):
        """Cria um cromossomo (rota) aleatório"""
        return list(range(len(self.pontos_entrega)))
    
    def calcular_distancia(self, rota):
        """Calcula a distância total de uma rota"""
        distancia = 0
        for i in range(len(rota) - 1):
            ponto1 = self.pontos_entrega[rota[i]]
            ponto2 = self.pontos_entrega[rota[i + 1]]
            distancia += np.sqrt(np.sum((ponto1 - ponto2) ** 2))
        # Adiciona distância do último ponto ao primeiro (retorno ao depósito)
        distancia += np.sqrt(np.sum((self.pontos_entrega[rota[-1]] - self.pontos_entrega[rota[0]]) ** 2))
        return distancia
    
    def fitness(self, cromossomo):
        """Função de aptidão - quanto menor a distância, melhor a aptidão"""
        return self.calcular_distancia(cromossomo)
    
    def crossover(self, pai1, pai2):
        """Operador de cruzamento - Order Crossover (OX)"""
        tamanho = len(pai1)
        # Seleciona dois pontos de corte
        ponto1, ponto2 = sorted(random.sample(range(tamanho), 2))
        
        # Cria o filho com a sequência do pai1 entre os pontos de corte
        filho = [-1] * tamanho
        for i in range(ponto1, ponto2 + 1):
            filho[i] = pai1[i]
        
        # Preenche o resto com genes do pai2
        j = (ponto2 + 1) % tamanho
        for i in range(tamanho):
            if filho[i] == -1:
                while pai2[j] in filho:
                    j = (j + 1) % tamanho
                filho[i] = pai2[j]
                j = (j + 1) % tamanho
        
        return filho
    
    def mutacao(self, cromossomo):
        """Operador de mutação - Swap Mutation"""
        if random.random() < 0.1:  # 10% de chance de mutação
            i, j = random.sample(range(len(cromossomo)), 2)
            cromossomo[i], cromossomo[j] = cromossomo[j], cromossomo[i]
        return cromossomo
    
    def evoluir(self):
        """Executa a evolução da população"""
        # Inicializa a população
        populacao = [self.criar_cromossomo() for _ in range(self.tamanho_populacao)]
        melhores_distancias = []
        
        for geracao in range(self.n_geracoes):
            # Avalia a aptidão de cada cromossomo
            fitness_populacao = [(self.fitness(cromossomo), cromossomo) 
                               for cromossomo in populacao]
            fitness_populacao.sort()  # Agora ordenamos em ordem crescente (menor distância = melhor)
            
            # Guarda a melhor distância da geração
            melhores_distancias.append(fitness_populacao[0][0])
            
            # Imprime informações da geração atual
            melhor_cromossomo = fitness_populacao[0][1]
            distancia_atual = self.calcular_distancia(melhor_cromossomo)
            print(f"Geração {geracao + 1}/{self.n_geracoes}")
            print(f"Distância da melhor rota: {distancia_atual:.2f}")
            print("-" * 50)
            
            # Seleciona os melhores indivíduos
            nova_populacao = [cromossomo for _, cromossomo in fitness_populacao[:self.tamanho_populacao//2]]
            
            # Completa a nova população com cruzamentos e mutações
            while len(nova_populacao) < self.tamanho_populacao:
                pai1, pai2 = random.sample(fitness_populacao[:self.tamanho_populacao//2], 2)
                filho = self.crossover(pai1[1], pai2[1])
                filho = self.mutacao(filho)
                nova_populacao.append(filho)
            
            populacao = nova_populacao
        
        return fitness_populacao[0][1], melhores_distancias
    
    def visualizar_rota(self, rota):
        """Visualiza a rota encontrada"""
        plt.figure(figsize=(10, 10))
        plt.scatter(self.pontos_entrega[:, 0], self.pontos_entrega[:, 1], c='red', s=100)
        
        # Desenha a rota
        for i in range(len(rota)):
            ponto1 = self.pontos_entrega[rota[i]]
            ponto2 = self.pontos_entrega[rota[(i + 1) % len(rota)]]
            plt.plot([ponto1[0], ponto2[0]], [ponto1[1], ponto2[1]], 'b-')
        
        plt.title('Rota Otimizada')
        plt.savefig('rota_otimizada.png')
        plt.close()

# Executando o algoritmo
if __name__ == "__main__":
    ag = AlgoritmoGeneticoRotas(n_pontos_entrega=20, tamanho_populacao=50, n_geracoes=100)
    melhor_rota, historico_distancias = ag.evoluir()
    
    print(f"Distância total da melhor rota: {ag.calcular_distancia(melhor_rota):.2f}")
    ag.visualizar_rota(melhor_rota)
    
    # Plotando a evolução da distância
    plt.figure(figsize=(10, 5))
    plt.plot(historico_distancias)
    plt.title('Evolução da Distância')
    plt.xlabel('Geração')
    plt.ylabel('Distância')
    plt.savefig('evolucao_distancia.png')
    plt.close()
