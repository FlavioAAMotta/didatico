import numpy as np 
import random
import operator
import pandas as pd
import matplotlib.pyplot as plt

class Cidade:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def distancia(self, cidade):
        xDis = abs(self.x - cidade.x)
        yDis = abs(self.y - cidade.y)
        distancia = np.sqrt((xDis ** 2) + (yDis ** 2))
        return distancia
    
    def __repr__(self):
        return "(" + str(self.x) + "," + str(self.y) + ")"


class Fitness:
    def __init__(self, rota):
        self.rota = rota
        self.distancia = 0
        self.fitness= 0.0
    
    def distanciaRota(self):
        if self.distancia ==0:
            pathDistancia = 0
            for i in range(0, len(self.rota)):
                fromCidade = self.rota[i]
                toCidade = None
                if i + 1 < len(self.rota):
                    toCidade = self.rota[i + 1]
                else:
                    toCidade = self.rota[0]
                pathDistancia += fromCidade.distancia(toCidade)
            self.distancia = pathDistancia
        return self.distancia
    
    def fitnessRota(self):
        if self.fitness == 0:
            self.fitness = 1 / float(self.distanciaRota())
        return self.fitness

def criarRota(listaCidade):
    route = random.sample(listaCidade, len(listaCidade))
    return route

def populacaoInicial(popSize, listaCidade):
    populacao = []

    for i in range(0, popSize):
        populacao.append(criarRota(listaCidade))
    return populacao

def rankRotas(populacao):
    fitnessResults = {}
    for i in range(0,len(populacao)):
        fitnessResults[i] = Fitness(populacao[i]).fitnessRota()
    return sorted(fitnessResults.items(), key = operator.itemgetter(1), reverse = True)

def selection(popRanked, eliteSize):
    selectionResults = []
    df = pd.DataFrame(np.array(popRanked), columns=["Index","Fitness"])
    df['cum_sum'] = df.Fitness.cumsum()
    df['cum_perc'] = 100*df.cum_sum/df.Fitness.sum()
    
    for i in range(0, eliteSize):
        selectionResults.append(popRanked[i][0])
    for i in range(0, len(popRanked) - eliteSize):
        pick = 100*random.random()
        for i in range(0, len(popRanked)):
            if pick <= df.iat[i,3]:
                selectionResults.append(popRanked[i][0])
                break
    return selectionResults

def matingPool(populacao, selectionResults):
    matingpool = []
    for i in range(0, len(selectionResults)):
        index = selectionResults[i]
        matingpool.append(populacao[index])
    return matingpool

def breed(parent1, parent2):
    child = []
    childP1 = []
    childP2 = []
    
    geneA = int(random.random() * len(parent1))
    geneB = int(random.random() * len(parent1))
    
    startGene = min(geneA, geneB)
    endGene = max(geneA, geneB)

    for i in range(startGene, endGene):
        childP1.append(parent1[i])
        
    childP2 = [item for item in parent2 if item not in childP1]

    child = childP1 + childP2
    return child

def breedPopulacao(matingpool, eliteSize):
    children = []
    length = len(matingpool) - eliteSize
    pool = random.sample(matingpool, len(matingpool))

    for i in range(0,eliteSize):
        children.append(matingpool[i])
    
    for i in range(0, length):
        child = breed(pool[i], pool[len(matingpool)-i-1])
        children.append(child)
    return children

def mutate(individual, taxaMutacao):
    for swapped in range(len(individual)):
        if(random.random() < taxaMutacao):
            swapWith = int(random.random() * len(individual))
            
            cidade1 = individual[swapped]
            cidade2 = individual[swapWith]
            
            individual[swapped] = cidade2
            individual[swapWith] = cidade1
    return individual

def geracaoFutura(currentGen, eliteSize, taxaMutacao):
    popRanked = rankRotas(currentGen)
    selectionResults = selection(popRanked, eliteSize)
    matingpool = matingPool(currentGen, selectionResults)
    children = breedPopulacao(matingpool, eliteSize)
    geracaoFutura = mutate(children, taxaMutacao)
    return geracaoFutura

def algoritmoGenetico(populacao, popSize, eliteSize, taxaMutacao, numGeracoes):
    pop = populacaoInicial(popSize, populacao)
    print("Distância Inicial: " + str(round(1 / rankRotas(pop)[0][1] , 2)))
    
    for i in range(0, numGeracoes):
        pop = geracaoFutura(pop, eliteSize, taxaMutacao)
    
    print("Distância Final: " + str(round(1 / rankRotas(pop)[0][1] , 2)))
    melhorRotaIndex = rankRotas(pop)[0][0]
    melhorRota = pop[melhorRotaIndex]
    return melhorRota

listaCidade = []

for i in range(0,25):
    listaCidade.append(Cidade(x=int(random.random() * 200), y=int(random.random() * 200)))

print(listaCidade)

algoritmoGenetico(populacao=listaCidade, popSize=100, eliteSize=20, taxaMutacao=0.01, numGeracoes=500)