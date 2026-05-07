import numpy as np
import random
import matplotlib.pyplot as plt
import matplotlib.patches as patches
import matplotlib.animation as animation
import json
import time
import math

class No:
    def __init__(self, valor):
        self.valor = valor
        self.esquerda = None
        self.direita = None

class Ambiente:
    def __init__(self, largura=800, altura=600, num_obstaculos=15, num_recursos=8):
        self.largura = largura
        self.altura = altura
        self.obstaculos = self.gerar_obstaculos(num_obstaculos)
        self.recursos = self.gerar_recursos(num_recursos)
        self.tempo = 0
        self.max_tempo = 1000  # Tempo máximo de simulação
        self.ponto_chegada = self.gerar_ponto_chegada()
        self.vitoria = False
    
    def gerar_obstaculos(self, num_obstaculos):
        obstaculos = []
        
        # Adicionar bordas como obstáculos
        obstaculos.append({
            'x': 0,
            'y': 0,
            'largura': self.largura,
            'altura': 20,
            'tipo': 'borda'
        })
        obstaculos.append({
            'x': 0,
            'y': self.altura - 20,
            'largura': self.largura,
            'altura': 20,
            'tipo': 'borda'
        })
        obstaculos.append({
            'x': 0,
            'y': 0,
            'largura': 20,
            'altura': self.altura,
            'tipo': 'borda'
        })
        obstaculos.append({
            'x': self.largura - 20,
            'y': 0,
            'largura': 20,
            'altura': self.altura,
            'tipo': 'borda'
        })
        
        # Gerar obstáculos aleatórios
        for _ in range(num_obstaculos):
            # Tentar posicionar o obstáculo sem sobreposição
            tentativas = 0
            posicionado = False
            
            while tentativas < 50 and not posicionado:
                x = random.randint(50, self.largura - 50)
                y = random.randint(50, self.altura - 50)
                largura = random.randint(30, 120)
                altura = random.randint(30, 120)
                
                # Verificar sobreposição com outros obstáculos
                sobreposicao = False
                for obstaculo in obstaculos:
                    if (x < obstaculo['x'] + obstaculo['largura'] and 
                        x + largura > obstaculo['x'] and
                        y < obstaculo['y'] + obstaculo['altura'] and 
                        y + altura > obstaculo['y']):
                        sobreposicao = True
                        break
                
                if not sobreposicao:
                    obstaculos.append({
                        'x': x,
                        'y': y,
                        'largura': largura,
                        'altura': altura,
                        'tipo': 'normal'
                    })
                    posicionado = True
                
                tentativas += 1
        
        return obstaculos
    
    def gerar_recursos(self, num_recursos):
        recursos = []
        
        # Gerar recursos aleatórios
        for _ in range(num_recursos):
            # Tentar posicionar o recurso sem sobreposição com obstáculos
            tentativas = 0
            posicionado = False
            
            while tentativas < 50 and not posicionado:
                x = random.randint(30, self.largura - 30)
                y = random.randint(30, self.altura - 30)
                
                # Verificar sobreposição com obstáculos
                sobreposicao = False
                for obstaculo in self.obstaculos:
                    if (x > obstaculo['x'] - 20 and 
                        x < obstaculo['x'] + obstaculo['largura'] + 20 and
                        y > obstaculo['y'] - 20 and 
                        y < obstaculo['y'] + obstaculo['altura'] + 20):
                        sobreposicao = True
                        break
                
                if not sobreposicao:
                    recursos.append({
                        'x': x,
                        'y': y,
                        'coletado': False,
                        'valor': random.randint(1, 3)  # Recursos com valores diferentes
                    })
                    posicionado = True
                
                tentativas += 1
        
        return recursos
    
    def gerar_ponto_chegada(self):
        # Tentar posicionar o ponto de chegada sem sobreposição
        for _ in range(50):
            x = random.randint(30, self.largura - 30)
            y = random.randint(30, self.altura - 30)
            
            # Verificar sobreposição com obstáculos
            sobreposicao = False
            for obstaculo in self.obstaculos:
                if (x > obstaculo['x'] - 20 and 
                    x < obstaculo['x'] + obstaculo['largura'] + 20 and
                    y > obstaculo['y'] - 20 and 
                    y < obstaculo['y'] + obstaculo['altura'] + 20):
                    sobreposicao = True
                    break
            
            if not sobreposicao:
                return {'x': x, 'y': y, 'raio': 20}
        
        # Se não conseguir posicionar, coloca no centro
        return {'x': self.largura//2, 'y': self.altura//2, 'raio': 20}
    
    def verificar_colisao(self, x, y, raio):
        # Verificar colisão com as bordas
        if x - raio < 0 or x + raio > self.largura or y - raio < 0 or y + raio > self.altura:
            return True
        
        # Verificar colisão com obstáculos
        for obstaculo in self.obstaculos:
            if (x + raio > obstaculo['x'] and 
                x - raio < obstaculo['x'] + obstaculo['largura'] and
                y + raio > obstaculo['y'] and 
                y - raio < obstaculo['y'] + obstaculo['altura']):
                return True
        
        return False
    
    def verificar_coleta_recursos(self, x, y, raio):
        recursos_coletados = 0
        for recurso in self.recursos:
            if not recurso['coletado']:
                distancia = np.sqrt((x - recurso['x'])**2 + (y - recurso['y'])**2)
                if distancia < raio + 10:  # 10 é o raio do recurso
                    recurso['coletado'] = True
                    recursos_coletados += recurso['valor']  # Considerar o valor do recurso
        return recursos_coletados
    
    def verificar_chegada(self, x, y, raio):
        if not self.vitoria:  # Só verifica se ainda não venceu
            distancia = np.sqrt((x - self.ponto_chegada['x'])**2 + (y - self.ponto_chegada['y'])**2)
            if distancia < raio + self.ponto_chegada['raio']:
                self.vitoria = True
                return True
        return False
    
    def reset(self):
        self.tempo = 0
        self.vitoria = False
        for recurso in self.recursos:
            recurso['coletado'] = False
        return self.get_estado()
    
    def get_estado(self):
        return {
            'tempo': self.tempo,
            'recursos_coletados': sum(1 for r in self.recursos if r['coletado']),
            'recursos_restantes': sum(1 for r in self.recursos if not r['coletado']),
            'valor_total_recursos': sum(r['valor'] for r in self.recursos if r['coletado'])
        }
    
    def passo(self):
        self.tempo += 1
        return self.tempo >= self.max_tempo

class Robo:
    def __init__(self, x, y, raio=15):
        self.x = x
        self.y = y
        self.raio = raio
        self.angulo = 0  # em radianos
        self.velocidade = 0
        self.energia = 100
        self.recursos_coletados = 0
        self.colisoes = 0
        self.distancia_percorrida = 0
        self.ultima_posicao = (x, y)
        self.tempo_sem_coleta = 0
        self.ultima_colisao = 0
    
    def reset(self, x, y):
        self.x = x
        self.y = y
        self.angulo = 0
        self.velocidade = 0
        self.energia = 100
        self.recursos_coletados = 0
        self.colisoes = 0
        self.distancia_percorrida = 0
        self.ultima_posicao = (x, y)
        self.tempo_sem_coleta = 0
        self.ultima_colisao = 0
    
    def mover(self, aceleracao, rotacao, ambiente):
        # Atualizar ângulo
        self.angulo += rotacao
        
        # Atualizar velocidade
        self.velocidade += aceleracao
        self.velocidade = max(0, min(5, self.velocidade))  # Limitar velocidade
        
        # Calcular nova posição
        novo_x = self.x + self.velocidade * np.cos(self.angulo)
        novo_y = self.y + self.velocidade * np.sin(self.angulo)
        
        # Verificar colisão
        if ambiente.verificar_colisao(novo_x, novo_y, self.raio):
            self.colisoes += 1
            self.velocidade = 0
            self.ultima_colisao = ambiente.tempo
            
            # Tentar recuperar da colisão - mover em direção oposta
            if self.ultima_colisao > 0 and ambiente.tempo - self.ultima_colisao < 5:
                # Se colidiu recentemente, tenta uma direção diferente
                self.angulo += np.pi / 2 * random.choice([-1, 1])
            else:
                # Primeira colisão, apenas para
                pass
        else:
            # Atualizar posição
            self.distancia_percorrida += np.sqrt((novo_x - self.x)**2 + (novo_y - self.y)**2)
            self.x = novo_x
            self.y = novo_y
            self.ultima_posicao = (self.x, self.y)
        
        # Verificar coleta de recursos
        recursos_coletados = ambiente.verificar_coleta_recursos(self.x, self.y, self.raio)
        if recursos_coletados > 0:
            self.recursos_coletados += recursos_coletados
            self.tempo_sem_coleta = 0
        else:
            self.tempo_sem_coleta += 1
        
        # Consumir energia
        self.energia -= 0.1 + 0.05 * self.velocidade + 0.1 * abs(rotacao)
        self.energia = max(0, self.energia)
        
        # Recuperar energia ao coletar recursos
        if recursos_coletados > 0:
            self.energia = min(100, self.energia + 20 * recursos_coletados)
        
        return self.energia <= 0
    
    def get_sensores(self, ambiente):
        # Distância até o recurso mais próximo
        dist_recurso = float('inf')
        angulo_recurso = 0
        recurso_mais_proximo = None
        
        for recurso in ambiente.recursos:
            if not recurso['coletado']:
                dist = np.sqrt((self.x - recurso['x'])**2 + (self.y - recurso['y'])**2)
                if dist < dist_recurso:
                    dist_recurso = dist
                    recurso_mais_proximo = recurso
                    # Calcular ângulo até o recurso
                    dx = recurso['x'] - self.x
                    dy = recurso['y'] - self.y
                    angulo = np.arctan2(dy, dx)
                    angulo_recurso = angulo - self.angulo
                    # Normalizar para [-pi, pi]
                    while angulo_recurso > np.pi:
                        angulo_recurso -= 2 * np.pi
                    while angulo_recurso < -np.pi:
                        angulo_recurso += 2 * np.pi
        
        # Distância até o obstáculo mais próximo em 8 direções
        dist_obstaculos = []
        for angulo in [0, np.pi/4, np.pi/2, 3*np.pi/4, np.pi, 5*np.pi/4, 3*np.pi/2, 7*np.pi/4]:
            # Projetar um raio na direção do ângulo
            raio = 1
            max_raio = 200
            encontrou_obstaculo = False
            
            while raio < max_raio and not encontrou_obstaculo:
                x_proj = self.x + raio * np.cos(self.angulo + angulo)
                y_proj = self.y + raio * np.sin(self.angulo + angulo)
                
                if ambiente.verificar_colisao(x_proj, y_proj, 1):
                    dist_obstaculos.append(raio)
                    encontrou_obstaculo = True
                else:
                    raio += 5
            
            if not encontrou_obstaculo:
                dist_obstaculos.append(max_raio)
        
        # Distância média até obstáculos
        dist_obstaculo = sum(dist_obstaculos) / len(dist_obstaculos)
        
        # Distância mínima até obstáculos (para evitar colisões)
        dist_obstaculo_min = min(dist_obstaculos)
        
        # Direção do obstáculo mais próximo
        idx_min = dist_obstaculos.index(dist_obstaculo_min)
        angulo_obstaculo = idx_min * np.pi/4
        
        # Normalizar para [-pi, pi]
        while angulo_obstaculo > np.pi:
            angulo_obstaculo -= 2 * np.pi
        while angulo_obstaculo < -np.pi:
            angulo_obstaculo += 2 * np.pi
        
        # Calcular se está se movendo
        movimento = np.sqrt((self.x - self.ultima_posicao[0])**2 + (self.y - self.ultima_posicao[1])**2)
        
        return {
            'dist_recurso': dist_recurso,
            'dist_obstaculo': dist_obstaculo,
            'dist_obstaculo_min': dist_obstaculo_min,
            'angulo_recurso': angulo_recurso,
            'angulo_obstaculo': angulo_obstaculo,
            'energia': self.energia,
            'velocidade': self.velocidade,
            'movimento': movimento,
            'tempo_sem_coleta': self.tempo_sem_coleta,
            'colisoes_recentes': 1 if ambiente.tempo - self.ultima_colisao < 10 else 0
        }

class IndividuoPG:
    def __init__(self, profundidade=5):
        self.arvore = self.criar_arvore_aleatoria(profundidade)
        self.fitness = float('-inf')
        
    def criar_arvore_aleatoria(self, profundidade):
        if profundidade == 0 or random.random() < 0.3:
            # Folha: variável ou constante
            if random.random() < 0.8:  # Aumentar probabilidade de variáveis
                # Priorizar variáveis mais importantes
                variaveis = ['dist_recurso', 'dist_obstaculo_min', 'angulo_recurso', 'energia', 'velocidade']
                pesos = [0.35, 0.25, 0.20, 0.10, 0.10]  # Pesos para cada variável
                return No(random.choices(variaveis, weights=pesos)[0])
            else:
                # Constantes com valores mais úteis
                return No(random.choice([-3, -2, -1, 0, 1, 2, 3]))
        else:
            # Nó interno: operador
            # Priorizar operadores mais úteis
            operadores = ['+', '-', '*', 'max', 'min']
            pesos = [0.35, 0.25, 0.20, 0.10, 0.10]  # Pesos para cada operador
            
            # Evitar divisão para evitar erros
            operador = random.choices(operadores, weights=pesos)[0]
            
            # Criar subárvores com profundidade reduzida
            profundidade_esq = max(0, profundidade - 1 - random.randint(0, 1))
            profundidade_dir = max(0, profundidade - 1 - random.randint(0, 1))
            
            no = No(operador)
            no.esquerda = self.criar_arvore_aleatoria(profundidade_esq)
            no.direita = self.criar_arvore_aleatoria(profundidade_dir)
            return no
    
    def avaliar(self, sensores):
        """Avalia a árvore de expressão com os valores dos sensores."""
        try:
            # Avaliar a árvore
            resultado = self.avaliar_arvore(self.arvore, sensores)
            
            # Extrair valores de aceleração e rotação
            aceleracao = resultado[0]
            rotacao = resultado[1]
            
            # Adicionar um pequeno ruído para evitar comportamento repetitivo
            ruido = random.uniform(-0.01, 0.01)
            
            # Lógica para evitar obstáculos
            if sensores['dist_obstaculo_min'] < 20:  # Obstáculo muito próximo
                # Desacelerar e girar para longe do obstáculo
                aceleracao = min(0.2, aceleracao)
                # Girar na direção oposta ao obstáculo
                if sensores['angulo_obstaculo'] > 0:
                    rotacao = max(0.3, rotacao)
                else:
                    rotacao = min(-0.3, rotacao)
            
            # Lógica para seguir recursos
            elif sensores['dist_recurso'] < float('inf'):  # Há recursos visíveis
                # Acelerar em direção ao recurso
                aceleracao = max(0.4, aceleracao)
                # Ajustar rotação para alinhar com o recurso
                if abs(sensores['angulo_recurso']) > 0.1:
                    rotacao = sensores['angulo_recurso'] * 0.5
            
            # Lógica para movimento livre
            else:
                # Manter aceleração moderada quando não há obstáculos próximos
                aceleracao = max(0.3, aceleracao)
                # Reduzir rotação quando livre
                rotacao *= 0.8
            
            # Gerenciamento de energia
            if sensores['energia'] < 30:
                # Economizar energia quando está baixa
                aceleracao = min(0.3, aceleracao)
                rotacao *= 0.7
            
            # Evitar ficar parado
            if sensores['movimento'] < 0.1 and sensores['tempo_sem_coleta'] > 10:
                # Forçar movimento se estiver parado por muito tempo
                aceleracao = max(0.4, aceleracao)
                rotacao += random.uniform(-0.2, 0.2)
            
            # Adicionar ruído aos resultados
            aceleracao += ruido
            rotacao += ruido
            
            # Limitar valores
            aceleracao = max(-5, min(5, aceleracao))  # Aceleração entre -5 e 5
            rotacao = max(-math.pi/4, min(math.pi/4, rotacao))  # Rotação entre -π/4 e π/4
            
            return [aceleracao, rotacao]
        except Exception as e:
            print(f"Erro na avaliação: {e}")
            return [0.0, 0.0]  # Retorna movimento nulo em caso de erro
    
    def avaliar_arvore(self, no, sensores):
        if no is None:
            return [0.0, 0.0]  # Retorna [aceleração, rotação]
            
        try:
            if isinstance(no.valor, (int, float)):
                return [float(no.valor), float(no.valor)]  # Usa o mesmo valor para ambos
            elif no.valor in sensores:
                valor = float(sensores[no.valor])
                return [valor, valor]  # Usa o mesmo valor para ambos
            else:
                esq = self.avaliar_arvore(no.esquerda, sensores)
                dir = self.avaliar_arvore(no.direita, sensores)
                
                if no.valor == '+':
                    return [esq[0] + dir[0], esq[1] + dir[1]]
                elif no.valor == '-':
                    return [esq[0] - dir[0], esq[1] - dir[1]]
                elif no.valor == '*':
                    return [esq[0] * dir[0], esq[1] * dir[1]]
                elif no.valor == '/':
                    return [
                        esq[0] / dir[0] if abs(dir[0]) > 1e-10 else 0.0,
                        esq[1] / dir[1] if abs(dir[1]) > 1e-10 else 0.0
                    ]
                elif no.valor == 'max':
                    return [max(esq[0], dir[0]), max(esq[1], dir[1])]
                elif no.valor == 'min':
                    return [min(esq[0], dir[0]), min(esq[1], dir[1])]
                else:
                    return [0.0, 0.0]
        except Exception as e:
            print(f"Erro na avaliação da árvore: {e}")
            return [0.0, 0.0]
    
    def copy(self):
        novo = IndividuoPG()
        novo.arvore = self.copiar_arvore(self.arvore)
        novo.fitness = self.fitness
        return novo
    
    def copiar_arvore(self, no):
        if no is None:
            return None
        
        novo_no = No(no.valor)
        novo_no.esquerda = self.copiar_arvore(no.esquerda)
        novo_no.direita = self.copiar_arvore(no.direita)
        return novo_no
    
    def escolher_no_aleatorio(self):
        # Coletar todos os nós da árvore
        nos = []
        def coletar_nos(no):
            if no:
                nos.append(no)
                coletar_nos(no.esquerda)
                coletar_nos(no.direita)
        
        coletar_nos(self.arvore)
        return random.choice(nos) if nos else None
    
    def trocar_subarvore(self, no1, no2):
        # Trocar valores dos nós
        no1.valor, no2.valor = no2.valor, no1.valor
        no1.esquerda, no2.esquerda = no2.esquerda, no1.esquerda
        no1.direita, no2.direita = no2.direita, no1.direita
    
    def substituir_subarvore(self, no, nova_subarvore):
        no.valor = nova_subarvore.valor
        no.esquerda = self.copiar_arvore(nova_subarvore.esquerda)
        no.direita = self.copiar_arvore(nova_subarvore.direita)
    
    def mutacao_no(self, no):
        if isinstance(no.valor, (int, float)):
            # Mutação de constante - usar distribuição gaussiana com desvio padrão menor
            no.valor += random.gauss(0, 0.5)
            no.valor = max(min(no.valor, 10), -10)
        elif no.valor in ['dist_recurso', 'dist_obstaculo_min', 'angulo_recurso', 'energia']:
            # Mutação de variável - priorizar variáveis mais importantes
            variaveis = ['dist_recurso', 'dist_obstaculo_min', 'angulo_recurso', 'energia']
            pesos = [0.4, 0.3, 0.2, 0.1]
            no.valor = random.choices(variaveis, weights=pesos)[0]
        else:
            # Mutação de operador - priorizar operadores mais úteis
            operadores = ['+', '-', '*', 'max', 'min']
            pesos = [0.3, 0.3, 0.2, 0.1, 0.1]
            no.valor = random.choices(operadores, weights=pesos)[0]
    
    def get_nos(self):
        nos = []
        def coletar_nos(no):
            if no:
                nos.append(no)
                coletar_nos(no.esquerda)
                coletar_nos(no.direita)
        
        coletar_nos(self.arvore)
        return nos

class ProgramacaoGenetica:
    def __init__(self, tamanho_populacao=100, num_geracoes=1000, taxa_mutacao=0.3, taxa_crossover=0.7):
        self.tamanho_populacao = tamanho_populacao
        self.num_geracoes = num_geracoes
        self.taxa_mutacao = taxa_mutacao
        self.taxa_crossover = taxa_crossover
        self.populacao = []
        self.melhor_individuo = None
        self.historico_fitness = []
        self.operadores = ['+', '-', '*', '/', 'max', 'min']
        self.variaveis = ['dist_recursos', 'dist_obstaculos', 'energia', 'tempo_sem_coleta']
        self.constantes = list(range(-10, 11))
        
    def inicializar_populacao(self):
        self.populacao = [IndividuoPG() for _ in range(self.tamanho_populacao)]
        self.avaliar_populacao()
        
    def avaliar_populacao(self):
        for individuo in self.populacao:
            if not hasattr(individuo, 'fitness') or individuo.fitness == float('-inf'):
                ambiente = Ambiente()
                robo = Robo(ambiente.largura // 2, ambiente.altura // 2)
                simulador = Simulador(ambiente, robo, individuo)
                fitness = simulador.simular(mostrar_visualizacao=False)
                individuo.fitness = fitness
                
                # Atualizar melhor indivíduo
                if self.melhor_individuo is None or fitness > self.melhor_individuo.fitness:
                    self.melhor_individuo = individuo.copy()
                
                # Fechar figuras para evitar vazamento de memória
                plt.close('all')
        
        # Ordenar população por fitness
        self.populacao.sort(key=lambda x: x.fitness, reverse=True)
        
        # Registrar histórico
        if self.melhor_individuo is not None:
            self.historico_fitness.append(self.melhor_individuo.fitness)
        
    def selecionar_pais(self):
        # Torneio com 5 indivíduos (aumentar tamanho do torneio)
        tamanho_torneio = 5
        pais = []
        
        for _ in range(2):
            # Selecionar indivíduos para o torneio
            torneio = random.sample(self.populacao, tamanho_torneio)
            
            # Ordenar por fitness
            torneio.sort(key=lambda x: x.fitness, reverse=True)
            
            # Selecionar vencedor com probabilidade
            # Dar mais chance para os melhores, mas ainda permitir que os piores vençam
            soma_fitness = sum(i.fitness for i in torneio)
            if soma_fitness > 0:
                # Usar roleta viciada para seleção
                r = random.uniform(0, soma_fitness)
                soma = 0
                for individuo in torneio:
                    soma += individuo.fitness
                    if soma >= r:
                        pais.append(individuo)
                        break
                else:
                    pais.append(torneio[0])  # Fallback para o melhor
            else:
                # Se todos tiverem fitness zero ou negativo, escolher aleatoriamente
                pais.append(random.choice(torneio))
        
        return pais[0], pais[1]
    
    def crossover(self, pai1, pai2):
        if random.random() > self.taxa_crossover:
            return pai1.copy(), pai2.copy()
        
        filho1 = pai1.copy()
        filho2 = pai2.copy()
        
        # Realizar crossover em múltiplos pontos
        num_pontos = random.randint(1, 3)
        
        # Coletar todos os nós de ambos os indivíduos
        nos_filho1 = filho1.get_nos()
        nos_filho2 = filho2.get_nos()
        
        # Filtrar nós para evitar trocar a raiz (pode causar problemas)
        nos_filho1 = [no for no in nos_filho1 if no != filho1.arvore]
        nos_filho2 = [no for no in nos_filho2 if no != filho2.arvore]
        
        # Realizar as trocas
        for _ in range(num_pontos):
            if nos_filho1 and nos_filho2:
                # Selecionar nós aleatórios para troca
                no1 = random.choice(nos_filho1)
                no2 = random.choice(nos_filho2)
                
                # Trocar subárvores
                filho1.trocar_subarvore(no1, no2)
                filho2.trocar_subarvore(no2, no1)
        
        return filho1, filho2
    
    def mutacao(self, individuo):
        if random.random() > self.taxa_mutacao:
            return individuo
        
        # Aplicar diferentes tipos de mutação
        tipo_mutacao = random.choice(['no', 'subarvore', 'constante'])
        
        if tipo_mutacao == 'no':
            # Mutação de nó individual
            no = individuo.escolher_no_aleatorio()
            if no:
                individuo.mutacao_no(no)
        
        elif tipo_mutacao == 'subarvore':
            # Mutação de subárvore inteira
            no = individuo.escolher_no_aleatorio()
            if no:
                profundidade = random.randint(1, 3)
                nova_subarvore = individuo.criar_arvore_aleatoria(profundidade)
                individuo.substituir_subarvore(no, nova_subarvore)
        
        else:  # constante
            # Mutação gaussiana em constantes
            for no in individuo.get_nos():
                if isinstance(no.valor, (int, float)):
                    no.valor += random.gauss(0, 1)
                    no.valor = max(min(no.valor, 10), -10)
        
        return individuo
    
    def evoluir(self):
        self.inicializar_populacao()
        
        # Parâmetros para controle de diversidade
        geracoes_sem_melhoria = 0
        ultimo_melhor_fitness = float('-inf')
        taxa_mutacao_dinamica = self.taxa_mutacao
        
        for geracao in range(self.num_geracoes):
            nova_populacao = []
            
            # Elitismo: manter os melhores indivíduos
            num_elite = max(2, self.tamanho_populacao // 10)
            nova_populacao.extend(self.populacao[:num_elite])
            
            # Verificar se houve melhoria
            if self.melhor_individuo.fitness > ultimo_melhor_fitness:
                ultimo_melhor_fitness = self.melhor_individuo.fitness
                geracoes_sem_melhoria = 0
                # Reduzir taxa de mutação quando há melhoria
                taxa_mutacao_dinamica = max(0.1, taxa_mutacao_dinamica * 0.95)
            else:
                geracoes_sem_melhoria += 1
                # Aumentar taxa de mutação quando não há melhoria
                taxa_mutacao_dinamica = min(0.8, taxa_mutacao_dinamica * 1.05)
            
            # Se ficar muito tempo sem melhoria, reiniciar parte da população
            if geracoes_sem_melhoria > 60:
                print("Reiniciando parte da população para aumentar diversidade...")
                # Manter apenas os melhores 20%
                num_mantidos = max(5, self.tamanho_populacao // 5)
                nova_populacao = nova_populacao[:num_mantidos]
                # Adicionar novos indivíduos aleatórios
                for _ in range(self.tamanho_populacao - num_mantidos):
                    nova_populacao.append(IndividuoPG(profundidade=random.randint(3, 7)))
                geracoes_sem_melhoria = 0
                taxa_mutacao_dinamica = self.taxa_mutacao
            
            # Gerar resto da população
            while len(nova_populacao) < self.tamanho_populacao:
                pai1, pai2 = self.selecionar_pais()
                filho1, filho2 = self.crossover(pai1, pai2)
                
                # Aplicar mutação com taxa dinâmica
                if random.random() < taxa_mutacao_dinamica:
                    filho1 = self.mutacao(filho1)
                if random.random() < taxa_mutacao_dinamica:
                    filho2 = self.mutacao(filho2)
                
                nova_populacao.extend([filho1, filho2])
            
            # Ajustar tamanho da população
            nova_populacao = nova_populacao[:self.tamanho_populacao]
            self.populacao = nova_populacao
            
            # Avaliar nova população
            self.avaliar_populacao()
            
            # Imprimir progresso
            if (geracao + 1) % 10 == 0:
                print(f"Geração {geracao + 1}/{self.num_geracoes}")
                print(f"Melhor fitness: {self.melhor_individuo.fitness:.2f}")
                print(f"Fitness médio: {sum(i.fitness for i in self.populacao)/len(self.populacao):.2f}")
                print(f"Taxa de mutação: {taxa_mutacao_dinamica:.2f}")
                print(f"Gerações sem melhoria: {geracoes_sem_melhoria}")
                print("-" * 50)
        
        return self.melhor_individuo

class Simulador:
    def __init__(self, ambiente, robo, individuo):
        self.ambiente = ambiente
        self.robo = robo
        self.individuo = individuo
        self.frames = []
        
        # Configurar matplotlib para melhor visualização
        plt.style.use('default')  # Usar estilo padrão
        self.fig, self.ax = plt.subplots(figsize=(12, 8))
        self.ax.set_xlim(0, ambiente.largura)
        self.ax.set_ylim(0, ambiente.altura)
        self.ax.set_title("Simulador de Robô com Programação Genética", fontsize=14)
        self.ax.set_xlabel("X", fontsize=12)
        self.ax.set_ylabel("Y", fontsize=12)
        self.ax.grid(True, linestyle='--', alpha=0.7)
    
    def simular(self, mostrar_visualizacao=False):
        self.ambiente.reset()
        self.robo.reset(self.ambiente.largura // 2, self.ambiente.altura // 2)
        self.frames = []
        
        # Configurar visualização se necessário
        if mostrar_visualizacao:
            plt.ion()  # Modo interativo
            # Fechar figuras existentes para evitar vazamento de memória
            plt.close('all')
            self.fig, self.ax = plt.subplots(figsize=(12, 8))
            self.ax.set_xlim(0, self.ambiente.largura)
            self.ax.set_ylim(0, self.ambiente.altura)
            self.ax.set_title("Simulador de Robô com Programação Genética", fontsize=14)
            self.ax.set_xlabel("X", fontsize=12)
            self.ax.set_ylabel("Y", fontsize=12)
            self.ax.grid(True, linestyle='--', alpha=0.7)
            
            # Desenhar obstáculos (estáticos)
            for obstaculo in self.ambiente.obstaculos:
                rect = patches.Rectangle(
                    (obstaculo['x'], obstaculo['y']),
                    obstaculo['largura'],
                    obstaculo['altura'],
                    linewidth=1,
                    edgecolor='black',
                    facecolor='#FF9999',
                    alpha=0.7
                )
                self.ax.add_patch(rect)
            
            # Desenhar recursos (estáticos)
            for recurso in self.ambiente.recursos:
                if not recurso['coletado']:
                    circ = patches.Circle(
                        (recurso['x'], recurso['y']),
                        10,
                        linewidth=1,
                        edgecolor='black',
                        facecolor='#99FF99',
                        alpha=0.8
                    )
                    self.ax.add_patch(circ)
            
            # Desenhar ponto de chegada
            chegada_circ = patches.Circle(
                (self.ambiente.ponto_chegada['x'], self.ambiente.ponto_chegada['y']),
                self.ambiente.ponto_chegada['raio'],
                linewidth=2,
                edgecolor='gold',
                facecolor='yellow',
                alpha=0.8
            )
            self.ax.add_patch(chegada_circ)
            
            # Criar objetos para o robô e direção (serão atualizados)
            robo_circ = patches.Circle(
                (self.robo.x, self.robo.y),
                self.robo.raio,
                linewidth=2,
                edgecolor='black',
                facecolor='#9999FF',
                alpha=0.8
            )
            self.ax.add_patch(robo_circ)
            
            # Criar texto para informações
            info_text = self.ax.text(
                10, self.ambiente.altura - 10,
                "",
                fontsize=12,
                bbox=dict(facecolor='white', alpha=0.8, edgecolor='gray', boxstyle='round,pad=0.5')
            )
            
            # Atualizar a figura
            plt.draw()
            plt.pause(0.01)
        
        # Executar a simulação
        tempo_parado = 0
        ultima_posicao = (self.robo.x, self.robo.y)
        ultimo_tempo_parado = 0
        colisoes_consecutivas = 0
        posicoes_recentes = [(self.robo.x, self.robo.y)]  # Lista para rastrear posições recentes
        tempo_preso = 0  # Tempo que o robô está preso em um ciclo
        ultimo_recurso_coletado = 0  # Tempo desde a última coleta de recurso
        
        while True:
            # Obter sensores
            sensores = self.robo.get_sensores(self.ambiente)
            
            # Avaliar árvores de decisão
            aceleracao, rotacao = self.individuo.avaliar(sensores)
            
            # Mover robô
            sem_energia = self.robo.mover(aceleracao, rotacao, self.ambiente)
            
            # Verificar chegada
            chegou = self.ambiente.verificar_chegada(self.robo.x, self.robo.y, self.robo.raio)
            
            # Verificar se o robô está parado
            posicao_atual = (self.robo.x, self.robo.y)
            distancia_movimento = np.sqrt((posicao_atual[0] - ultima_posicao[0])**2 + (posicao_atual[1] - ultima_posicao[1])**2)
            
            # Atualizar lista de posições recentes
            posicoes_recentes.append(posicao_atual)
            if len(posicoes_recentes) > 15:  # Aumentar o número de posições para melhor detecção
                posicoes_recentes.pop(0)
            
            # Verificar se o robô está preso em um ciclo
            preso_em_ciclo = False
            if len(posicoes_recentes) >= 15:
                # Verificar se o robô está oscilando entre as mesmas posições
                posicoes_unicas = set(posicoes_recentes)
                if len(posicoes_unicas) < 4:  # Aumentar o número de posições únicas necessárias
                    tempo_preso += 1
                    # Só considerar preso se estiver assim por muito tempo
                    if tempo_preso > 20:  # Aumentar o tempo necessário para considerar preso
                        preso_em_ciclo = True
                else:
                    tempo_preso = 0
            
            # Verificar se coletou recursos recentemente
            if self.robo.recursos_coletados > ultimo_recurso_coletado:
                ultimo_recurso_coletado = self.robo.recursos_coletados
                tempo_preso = 0  # Resetar o tempo preso se coletou um recurso
            
            if distancia_movimento < 0.1:  # Se moveu menos que 0.1 unidades
                tempo_parado += 1
            else:
                tempo_parado = 0
                
            ultima_posicao = posicao_atual
            
            # Verificar colisões consecutivas
            if self.robo.colisoes > ultimo_tempo_parado:
                colisoes_consecutivas += 1
            else:
                colisoes_consecutivas = 0
                
            ultimo_tempo_parado = self.robo.colisoes
            
            # Atualizar visualização se necessário
            if mostrar_visualizacao:
                self.ax.clear()
                self.ax.set_xlim(0, self.ambiente.largura)
                self.ax.set_ylim(0, self.ambiente.altura)
                self.ax.set_title("Simulador de Robô com Programação Genética", fontsize=14)
                self.ax.set_xlabel("X", fontsize=12)
                self.ax.set_ylabel("Y", fontsize=12)
                self.ax.grid(True, linestyle='--', alpha=0.7)
                
                # Desenhar obstáculos
                for obstaculo in self.ambiente.obstaculos:
                    rect = patches.Rectangle(
                        (obstaculo['x'], obstaculo['y']),
                        obstaculo['largura'],
                        obstaculo['altura'],
                        linewidth=1,
                        edgecolor='black',
                        facecolor='#FF9999',
                        alpha=0.7
                    )
                    self.ax.add_patch(rect)
                
                # Desenhar recursos
                for recurso in self.ambiente.recursos:
                    if not recurso['coletado']:
                        circ = patches.Circle(
                            (recurso['x'], recurso['y']),
                            10,
                            linewidth=1,
                            edgecolor='black',
                            facecolor='#99FF99',
                            alpha=0.8
                        )
                        self.ax.add_patch(circ)
                
                # Desenhar ponto de chegada
                chegada_circ = patches.Circle(
                    (self.ambiente.ponto_chegada['x'], self.ambiente.ponto_chegada['y']),
                    self.ambiente.ponto_chegada['raio'],
                    linewidth=2,
                    edgecolor='gold',
                    facecolor='yellow',
                    alpha=0.8
                )
                self.ax.add_patch(chegada_circ)
                
                # Desenhar robô
                robo_circ = patches.Circle(
                    (self.robo.x, self.robo.y),
                    self.robo.raio,
                    linewidth=2,
                    edgecolor='black',
                    facecolor='#9999FF',
                    alpha=0.8
                )
                self.ax.add_patch(robo_circ)
                
                # Desenhar direção do robô (seta mais visível)
                direcao_x = self.robo.x + self.robo.raio * 1.5 * np.cos(self.robo.angulo)
                direcao_y = self.robo.y + self.robo.raio * 1.5 * np.sin(self.robo.angulo)
                
                # Desenhar linha principal
                self.ax.plot([self.robo.x, direcao_x], [self.robo.y, direcao_y], 'r-', linewidth=3)
                
                # Desenhar ponta da seta
                angulo_seta = np.pi/6  # 30 graus
                tamanho_seta = self.robo.raio * 0.5
                
                # Calcular pontos da ponta da seta
                angulo1 = self.robo.angulo + np.pi - angulo_seta
                angulo2 = self.robo.angulo + np.pi + angulo_seta
                
                ponta1_x = direcao_x + tamanho_seta * np.cos(angulo1)
                ponta1_y = direcao_y + tamanho_seta * np.sin(angulo1)
                ponta2_x = direcao_x + tamanho_seta * np.cos(angulo2)
                ponta2_y = direcao_y + tamanho_seta * np.sin(angulo2)
                
                # Desenhar as linhas da ponta da seta
                self.ax.plot([direcao_x, ponta1_x], [direcao_y, ponta1_y], 'r-', linewidth=2)
                self.ax.plot([direcao_x, ponta2_x], [direcao_y, ponta2_y], 'r-', linewidth=2)
                
                # Adicionar informações
                status = "VITÓRIA!" if self.ambiente.vitoria else ""
                info_text = self.ax.text(
                    self.ambiente.largura - 200,  # Posicionar à direita
                    30,  # Posicionar mais abaixo
                    f"Tempo: {self.ambiente.tempo}\n"
                    f"Recursos: {self.robo.recursos_coletados}\n"
                    f"Energia: {self.robo.energia:.1f}\n"
                    f"Colisões: {self.robo.colisoes}\n"
                    f"Distância: {self.robo.distancia_percorrida:.1f}\n"
                    f"Tempo parado: {tempo_parado}\n"
                    f"Tempo preso: {tempo_preso}\n"
                    f"{status}",
                    fontsize=12,
                    bbox=dict(facecolor='white', alpha=0.8, edgecolor='gray', boxstyle='round,pad=0.5'),
                    verticalalignment='bottom'  # Alinhar ao fundo
                )
                
                # Atualizar a figura
                plt.draw()
                plt.pause(0.05)  # Pausa para controlar a velocidade da simulação
            
            # Verificar fim da simulação
            # Só terminar por estar preso se estiver assim por muito tempo e não tiver energia suficiente
            if sem_energia or self.ambiente.passo() or chegou or (preso_em_ciclo and self.robo.energia < 20):
                break
        
        if mostrar_visualizacao:
            # Manter a janela aberta até que o usuário a feche
            plt.ioff()
            plt.show(block=True)
        
        # Calcular fitness
        fitness = (
            self.robo.recursos_coletados * 200 +  # Pontuação por recursos
            (2000 if self.ambiente.vitoria else 0) +  # Bônus por chegar ao objetivo
            self.robo.distancia_percorrida * 0.5 -  # Bônus por distância
            self.robo.colisoes * 100 -  # Penalidade por colisões
            tempo_parado * 2.0  # Penalidade por ficar parado
        )
        
        # Penalidade adicional por colisões consecutivas
        fitness -= colisoes_consecutivas * 50
        
        # Penalidade por ficar preso em ciclo (reduzida)
        if preso_em_ciclo:
            fitness -= 150  # Reduzir a penalidade
        
        # Adicionar bônus por explorar o ambiente
        recursos_visiveis = sum(1 for r in self.ambiente.recursos if not r['coletado'])
        fitness += (len(self.ambiente.recursos) - recursos_visiveis) * 50  # Bônus por recursos coletados
        
        # Adicionar bônus por sobrevivência
        fitness += self.ambiente.tempo * 0.1  # Pequeno bônus por tempo de sobrevivência
        
        return max(0, fitness)  # Garantir que o fitness não seja negativo

def criar_ambiente_teste():
    """Cria um ambiente de teste com configurações diferentes do ambiente de treino."""
    ambiente = Ambiente(
        largura=800,
        altura=600,
        num_obstaculos=25,  # Mais obstáculos que no treino
        num_recursos=15     # Mais recursos que no treino
    )
    
    # Garantir que os obstáculos estejam distribuídos de forma mais desafiadora
    # Agrupar alguns obstáculos para criar "corredores" estreitos
    for i in range(5):
        x = random.randint(100, ambiente.largura - 100)
        y = random.randint(100, ambiente.altura - 100)
        for j in range(3):
            dx = random.randint(-50, 50)
            dy = random.randint(-50, 50)
            ambiente.obstaculos.append({
                'x': x + dx,
                'y': y + dy,
                'largura': random.randint(30, 80),
                'altura': random.randint(30, 80),
                'tipo': 'normal'
            })
    
    # Garantir que alguns recursos estejam em locais mais difíceis de alcançar
    for i in range(5):
        # Encontrar um obstáculo
        if ambiente.obstaculos:
            obstaculo = random.choice(ambiente.obstaculos)
            # Colocar um recurso próximo ao obstáculo
            dx = random.randint(-30, 30)
            dy = random.randint(-30, 30)
            ambiente.recursos.append({
                'x': obstaculo['x'] + obstaculo['largura'] + dx,
                'y': obstaculo['y'] + obstaculo['altura'] + dy,
                'coletado': False,
                'valor': random.randint(1, 3)
            })
    
    return ambiente

# Executando o algoritmo
if __name__ == "__main__":
    print("Iniciando simulação de robô com programação genética...")
    
    # Criar e treinar o algoritmo genético
    print("Treinando o algoritmo genético...")
    pg = ProgramacaoGenetica(
        tamanho_populacao=100,
        num_geracoes=1000,
        taxa_mutacao=0.4,
        taxa_crossover=0.8
    )
    melhor_individuo = pg.evoluir()
    
    # Plotar evolução do fitness
    print("Plotando evolução do fitness...")
    plt.figure(figsize=(12, 6))
    plt.plot(pg.historico_fitness)
    plt.title('Evolução do Fitness')
    plt.xlabel('Geração')
    plt.ylabel('Fitness')
    plt.grid(True, linestyle='--', alpha=0.7)
    plt.savefig('evolucao_fitness_robo.png')
    plt.close()
    
    # Simular o melhor indivíduo no ambiente de treino
    print("\nSimulando o melhor indivíduo no ambiente de treino...")
    ambiente_treino = Ambiente()
    robo_treino = Robo(ambiente_treino.largura // 2, ambiente_treino.altura // 2)
    simulador_treino = Simulador(ambiente_treino, robo_treino, melhor_individuo)
    
    print("Executando simulação no ambiente de treino...")
    fitness_treino = simulador_treino.simular(mostrar_visualizacao=True)
    print(f"Fitness no ambiente de treino: {fitness_treino:.2f}")
    
    # Simular o melhor indivíduo no ambiente de teste
    print("\nSimulando o melhor indivíduo no ambiente de teste...")
    ambiente_teste = criar_ambiente_teste()
    robo_teste = Robo(ambiente_teste.largura // 2, ambiente_teste.altura // 2)
    simulador_teste = Simulador(ambiente_teste, robo_teste, melhor_individuo)
    
    print("Executando simulação no ambiente de teste...")
    fitness_teste = simulador_teste.simular(mostrar_visualizacao=True)
    print(f"Fitness no ambiente de teste: {fitness_teste:.2f}")
    
    # Comparar os resultados
    print("\nComparação dos resultados:")
    print(f"Fitness no ambiente de treino: {fitness_treino:.2f}")
    print(f"Fitness no ambiente de teste: {fitness_teste:.2f}")
    print(f"Diferença: {abs(fitness_treino - fitness_teste):.2f}")
    
    # Fechar todas as figuras
    plt.close('all') 