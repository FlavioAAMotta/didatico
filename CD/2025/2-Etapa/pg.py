import numpy as np
import random
import matplotlib.pyplot as plt
import tkinter as tk
from tkinter import ttk
import time

class JogoDaVelha:
    def __init__(self):
        self.tabuleiro = np.zeros((3, 3), dtype=int)
        self.jogador_atual = 1  # 1 para X, -1 para O
        
    def reset(self):
        self.tabuleiro = np.zeros((3, 3), dtype=int)
        self.jogador_atual = 1
        return self.get_estado()
    
    def get_estado(self):
        return self.tabuleiro.flatten()
    
    def jogada_valida(self, posicao):
        return self.tabuleiro[posicao // 3, posicao % 3] == 0
    
    def fazer_jogada(self, posicao):
        if not self.jogada_valida(posicao):
            return False, -1
        
        self.tabuleiro[posicao // 3, posicao % 3] = self.jogador_atual
        
        # Verificar vitória
        vencedor = self.verificar_vitoria()
        if vencedor != 0:
            return True, vencedor
        
        # Verificar empate
        if np.all(self.tabuleiro != 0):
            return True, 0
        
        # Trocar jogador
        self.jogador_atual *= -1
        return True, -1
    
    def verificar_vitoria(self):
        # Linhas
        for i in range(3):
            if abs(sum(self.tabuleiro[i, :])) == 3:
                return self.tabuleiro[i, 0]
        
        # Colunas
        for i in range(3):
            if abs(sum(self.tabuleiro[:, i])) == 3:
                return self.tabuleiro[0, i]
        
        # Diagonais
        diag1 = sum(self.tabuleiro[i, i] for i in range(3))
        diag2 = sum(self.tabuleiro[i, 2-i] for i in range(3))
        
        if abs(diag1) == 3:
            return self.tabuleiro[0, 0]
        if abs(diag2) == 3:
            return self.tabuleiro[0, 2]
        
        return 0

class IndividuoPG:
    def __init__(self, profundidade=3):
        self.profundidade = profundidade
        self.arvore = self.criar_arvore_aleatoria()
        self.fitness = 0
    
    def criar_arvore_aleatoria(self):
        if self.profundidade == 0:
            return self.criar_folha()
        
        operador = random.choice(['+', '-', '*', '/', 'max', 'min', 'abs', 'if_positivo', 'if_negativo'])
        if operador in ['+', '-', '*', '/']:
            return {
                'tipo': 'operador',
                'operador': operador,
                'esquerda': IndividuoPG(self.profundidade - 1).arvore,
                'direita': IndividuoPG(self.profundidade - 1).arvore
            }
        elif operador in ['max', 'min']:
            return {
                'tipo': 'operador',
                'operador': operador,
                'esquerda': IndividuoPG(self.profundidade - 1).arvore,
                'direita': IndividuoPG(self.profundidade - 1).arvore
            }
        elif operador == 'abs':
            return {
                'tipo': 'operador',
                'operador': operador,
                'esquerda': IndividuoPG(self.profundidade - 1).arvore,
                'direita': None
            }
        else:  # if_positivo ou if_negativo
            return {
                'tipo': 'operador',
                'operador': operador,
                'esquerda': IndividuoPG(self.profundidade - 1).arvore,
                'direita': IndividuoPG(self.profundidade - 1).arvore
            }
    
    def criar_folha(self):
        tipo = random.choice(['constante', 'entrada', 'posicao_central', 'posicao_cantos', 'posicao_meio'])
        if tipo == 'constante':
            return {
                'tipo': 'folha',
                'valor': random.uniform(-10, 10)
            }
        elif tipo == 'entrada':
            return {
                'tipo': 'folha',
                'indice': random.randint(0, 8)  # 9 posições no tabuleiro
            }
        elif tipo == 'posicao_central':
            return {
                'tipo': 'folha',
                'posicao_especial': 'central'  # Posição 4 (central)
            }
        elif tipo == 'posicao_cantos':
            return {
                'tipo': 'folha',
                'posicao_especial': 'cantos'  # Posições 0, 2, 6, 8 (cantos)
            }
        else:  # posicao_meio
            return {
                'tipo': 'folha',
                'posicao_especial': 'meio'  # Posições 1, 3, 5, 7 (meio)
            }
    
    def avaliar(self, estado):
        return self.avaliar_no(self.arvore, estado)
    
    def avaliar_no(self, no, estado):
        if no is None:
            return 0
            
        if no['tipo'] == 'folha':
            if 'valor' in no:
                return no['valor']
            elif 'indice' in no:
                return estado[no['indice']]
            elif 'posicao_especial' in no:
                if no['posicao_especial'] == 'central':
                    return estado[4] * 2  # Valor maior para a posição central
                elif no['posicao_especial'] == 'cantos':
                    # Soma dos valores dos cantos
                    return (estado[0] + estado[2] + estado[6] + estado[8]) / 4
                else:  # meio
                    # Soma dos valores das posições do meio
                    return (estado[1] + estado[3] + estado[5] + estado[7]) / 4
        
        if no['operador'] == 'abs':
            return abs(self.avaliar_no(no['esquerda'], estado))
        elif no['operador'] == 'if_positivo':
            valor = self.avaliar_no(no['esquerda'], estado)
            if valor > 0:
                return self.avaliar_no(no['direita'], estado)
            else:
                return 0
        elif no['operador'] == 'if_negativo':
            valor = self.avaliar_no(no['esquerda'], estado)
            if valor < 0:
                return self.avaliar_no(no['direita'], estado)
            else:
                return 0
        
        esquerda = self.avaliar_no(no['esquerda'], estado)
        direita = self.avaliar_no(no['direita'], estado) if no['direita'] is not None else 0
        
        if no['operador'] == '+':
            return esquerda + direita
        elif no['operador'] == '-':
            return esquerda - direita
        elif no['operador'] == '*':
            return esquerda * direita
        elif no['operador'] == '/':
            return esquerda / direita if direita != 0 else 0
        elif no['operador'] == 'max':
            return max(esquerda, direita)
        else:  # min
            return min(esquerda, direita)
    
    def mutacao(self, probabilidade=0.1):
        self.mutacao_no(self.arvore, probabilidade)
    
    def mutacao_no(self, no, probabilidade):
        if random.random() < probabilidade:
            if no['tipo'] == 'folha':
                if 'valor' in no:
                    no['valor'] = random.uniform(-10, 10)
                elif 'indice' in no:
                    no['indice'] = random.randint(0, 8)
                elif 'posicao_especial' in no:
                    no['posicao_especial'] = random.choice(['central', 'cantos', 'meio'])
            else:
                no['operador'] = random.choice(['+', '-', '*', '/', 'max', 'min', 'abs', 'if_positivo', 'if_negativo'])
        
        if no['tipo'] == 'operador':
            self.mutacao_no(no['esquerda'], probabilidade)
            if no['direita'] is not None:
                self.mutacao_no(no['direita'], probabilidade)
    
    def crossover(self, outro):
        novo = IndividuoPG(self.profundidade)
        novo.arvore = self.crossover_no(self.arvore, outro.arvore)
        return novo
    
    def crossover_no(self, no1, no2):
        if random.random() < 0.5:
            return no1.copy()
        else:
            return no2.copy()

class ProgramacaoGenetica:
    def __init__(self, tamanho_populacao=100, profundidade=4):
        self.tamanho_populacao = tamanho_populacao
        self.profundidade = profundidade
        self.populacao = [IndividuoPG(profundidade) for _ in range(tamanho_populacao)]
        self.melhor_individuo = None
        self.melhor_fitness = float('-inf')
        self.historico_fitness = []
    
    def avaliar_populacao(self):
        jogo = JogoDaVelha()
        
        for individuo in self.populacao:
            fitness = 0
            
            # Jogar contra estratégia aleatória
            for _ in range(20):  # 20 partidas
                estado = jogo.reset()
                jogador = 1
                
                while True:
                    if jogador == 1:  # Indivíduo
                        # Avaliar todas as posições possíveis
                        valores = []
                        for i in range(9):
                            if jogo.jogada_valida(i):
                                estado_temp = estado.copy()
                                estado_temp[i] = 1
                                valores.append((i, individuo.avaliar(estado_temp)))
                        
                        if not valores:  # Tabuleiro cheio
                            break
                        
                        # Escolher a melhor posição
                        melhor_pos = max(valores, key=lambda x: x[1])[0]
                        sucesso, resultado = jogo.fazer_jogada(melhor_pos)
                        
                        if not sucesso or resultado != -1:
                            break
                    else:  # Oponente aleatório
                        posicoes_validas = [i for i in range(9) if jogo.jogada_valida(i)]
                        if not posicoes_validas:
                            break
                        
                        pos = random.choice(posicoes_validas)
                        sucesso, resultado = jogo.fazer_jogada(pos)
                        
                        if not sucesso or resultado != -1:
                            break
                    
                    jogador *= -1
                    estado = jogo.get_estado()
                
                # Avaliar resultado
                if resultado == 1:  # Vitória
                    fitness += 3  # Pontuação maior para vitórias
                elif resultado == 0:  # Empate
                    fitness += 1
                elif resultado == -1:  # Derrota
                    fitness += 0
            
            individuo.fitness = fitness  # Não dividir mais por 20
            
            # Atualizar melhor indivíduo
            if individuo.fitness > self.melhor_fitness:
                self.melhor_fitness = individuo.fitness
                self.melhor_individuo = individuo
    
    def selecionar(self):
        # Seleção por torneio
        tamanho_torneio = 5
        selecionados = []
        
        for _ in range(self.tamanho_populacao):
            torneio = random.sample(self.populacao, tamanho_torneio)
            vencedor = max(torneio, key=lambda x: x.fitness)
            selecionados.append(vencedor)
        
        return selecionados
    
    def evoluir(self, n_geracoes=100):
        for geracao in range(n_geracoes):
            print(f"Geração {geracao + 1}/{n_geracoes}")
            
            # Avaliar população
            self.avaliar_populacao()
            
            # Registrar melhor fitness
            self.historico_fitness.append(self.melhor_fitness)
            print(f"Melhor fitness: {self.melhor_fitness:.2f}")
            
            # Selecionar indivíduos
            selecionados = self.selecionar()
            
            # Criar nova população
            nova_populacao = []
            
            # Elitismo - manter o melhor indivíduo
            nova_populacao.append(self.melhor_individuo)
            
            # Preencher o resto da população
            while len(nova_populacao) < self.tamanho_populacao:
                pai1, pai2 = random.sample(selecionados, 2)
                filho = pai1.crossover(pai2)
                filho.mutacao(probabilidade=0.2)
                nova_populacao.append(filho)
            
            self.populacao = nova_populacao
        
        return self.melhor_individuo, self.historico_fitness

class InterfaceJogo:
    def __init__(self, individuo, computador_comeca=True):
        self.jogo = JogoDaVelha()
        self.individuo = individuo
        self.computador_comeca = computador_comeca
        self.root = tk.Tk()
        self.root.title("Jogo da Velha - PG")
        self.botoes = []
        self.criar_interface()
        
        # Se o computador começa, fazer a primeira jogada
        if self.computador_comeca:
            self.fazer_jogada_computador()
    
    def criar_interface(self):
        # Frame para o tabuleiro
        frame_tabuleiro = ttk.Frame(self.root)
        frame_tabuleiro.pack(padx=10, pady=10)
        
        # Criar botões do tabuleiro
        for i in range(3):
            for j in range(3):
                botao = ttk.Button(frame_tabuleiro, text="", width=5, command=lambda row=i, col=j: self.fazer_jogada(row, col))
                botao.grid(row=i, column=j, padx=5, pady=5)
                self.botoes.append(botao)
        
        # Botão para resetar o jogo
        ttk.Button(self.root, text="Novo Jogo", command=self.resetar_jogo).pack(pady=10)
        
        # Label para mostrar o status
        self.label_status = ttk.Label(self.root, text="Sua vez (O)" if self.computador_comeca else "Sua vez (X)")
        self.label_status.pack(pady=5)
    
    def fazer_jogada_computador(self):
        estado = self.jogo.get_estado()
        valores = []
        for i in range(9):
            if self.jogo.jogada_valida(i):
                estado_temp = estado.copy()
                estado_temp[i] = -1
                valores.append((i, self.individuo.avaliar(estado_temp)))
        
        if valores:
            melhor_pos = max(valores, key=lambda x: x[1])[0]
            sucesso, resultado = self.jogo.fazer_jogada(melhor_pos)
            self.atualizar_tabuleiro()
            
            if not sucesso or resultado != -1:
                self.verificar_fim(resultado)
            else:
                self.label_status.config(text="Sua vez (O)" if self.computador_comeca else "Sua vez (X)")
    
    def fazer_jogada(self, row, col):
        posicao = row * 3 + col
        
        if not self.jogo.jogada_valida(posicao):
            return
        
        # Jogada do usuário
        sucesso, resultado = self.jogo.fazer_jogada(posicao)
        self.atualizar_tabuleiro()
        
        if not sucesso or resultado != -1:
            self.verificar_fim(resultado)
            return
        
        # Jogada do indivíduo
        self.fazer_jogada_computador()
    
    def atualizar_tabuleiro(self):
        for i in range(3):
            for j in range(3):
                valor = self.jogo.tabuleiro[i, j]
                texto = "X" if valor == 1 else "O" if valor == -1 else ""
                self.botoes[i * 3 + j].config(text=texto)
    
    def verificar_fim(self, resultado):
        # Debug para verificar o resultado
        print(f"Resultado: {resultado}")
        
        # Quando o computador começa (X), resultado 1 = computador vence, resultado -1 = usuário vence
        # Quando o usuário começa (X), resultado 1 = usuário vence, resultado -1 = computador vence
        if self.computador_comeca:
            if resultado == 1:
                self.label_status.config(text="O computador venceu!")
            elif resultado == -1:
                self.label_status.config(text="Você venceu!")
            else:
                self.label_status.config(text="Empate!")
        else:
            if resultado == 1:
                self.label_status.config(text="Você venceu!")
            elif resultado == -1:
                self.label_status.config(text="O computador venceu!")
            else:
                self.label_status.config(text="Empate!")
    
    def resetar_jogo(self):
        self.jogo.reset()
        self.atualizar_tabuleiro()
        self.label_status.config(text="Sua vez (O)" if self.computador_comeca else "Sua vez (X)")
        
        # Se o computador começa, fazer a primeira jogada
        if self.computador_comeca:
            self.fazer_jogada_computador()
    
    def iniciar(self):
        self.root.mainloop()

# Executando o algoritmo
if __name__ == "__main__":
    # Criar e treinar o algoritmo genético
    pg = ProgramacaoGenetica(tamanho_populacao=100, profundidade=6)
    melhor_individuo, historico = pg.evoluir(n_geracoes=10)
    
    # Plotar evolução do fitness
    plt.figure(figsize=(10, 5))
    plt.plot(historico)
    plt.title('Evolução do Fitness')
    plt.xlabel('Geração')
    plt.ylabel('Fitness')
    plt.savefig('evolucao_fitness_pg.png')
    plt.close()
    
    # Iniciar interface gráfica com o computador começando
    interface = InterfaceJogo(melhor_individuo, computador_comeca=True)
    interface.iniciar()
