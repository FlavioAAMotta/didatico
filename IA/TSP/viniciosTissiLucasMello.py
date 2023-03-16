import random

a = [[0, 5, 2, 3, 7, 5, 6, 9],
             [5, 0, 3, 2, 3, 4, 7, 6],
             [2, 3, 0, 1, 2, 30, 7, 5],
             [3, 2, 1, 0, 12, 2, 3, 8],
             [7, 3, 2, 12, 0, 3, 2, 3],
             [5, 7, 30, 2, 3, 0, 1, 2],
             [6, 7, 4, 3, 2, 1, 0, 1],
             [9, 6, 5, 8, 3, 2, 1, 0]]

distances = [[0, 19, 18, 21, 57, 999, 999, 999],
             [19, 0, 999, 8, 999, 33, 37, 999],
             [18, 999, 0, 14, 35, 999, 999, 999],
             [21, 8, 14, 0, 38, 999, 30, 999],
             [57, 999, 35, 38, 0, 999, 10, 53],
             [999, 33, 999, 999, 999, 0, 6, 41],
             [999, 37, 999, 10, 5, 6, 0, 47],
             [999, 999, 999, 53, 5, 41, 47, 0]]


def generateRandomPopulation(populationSize):
    population = []
    # set() transforma a lista em um set, sets são listas que não possuem elementos repetidos
    # Enquanto o set population for menor que populationSize...
    while len(set(population)) < populationSize:
        # Quantidade aleatória de caminhos entre 0 e 7
        numberOfWays = random.randint(0, 5)
        # Individuo sempre começa no 0
        individual = '0'
        # Adiciona os caminhos aleatórios após o 0
        for i in range(numberOfWays):
            individual = individual + str(random.randint(1, 6))
        # Individuo sempre termina no 7
        individual = individual + '7'
        population.append(individual)

    return set(population)


def getFitness(population):
    fitness = {}
    for individual in population:
        cost = 0
        # For i para o tamanho do individuo
        for i in range(len(individual)):
            # Se não for o ultimo elemento
            if i < len(individual) - 1:
                # Pega a posição do eixo y na lista distances
                y = distances[int(individual[i])]
                # Pega a posição do eixo x na lista distances
                x = int(individual[i + 1])
                # Pega o valor na posição do eixo x
                value = y[x]
                # Adiciona ao custo
                cost = cost + value
        # Adiciona o individuo(key) com o custo(value) ao dict/map
        fitness[individual] = cost

    return fitness


def geneticAlgorithm(population, fitness):
    mutationProbability = 0.5
    newPopulation = []
    populationSize = len(population)
    theBestIndividuals = dict(sorted(fitness.items(), key=lambda item: item[1]))
    theBestIndividuals = list(theBestIndividuals.keys())
    for i in range(int(len(theBestIndividuals) * 0.5)):
        individual = theBestIndividuals[i]
        newPopulation.append(individual)
    while len(set(newPopulation)) < populationSize:
        individual1 = random.choice(list(population))
        individual2 = random.choice(list(population))
        if len(individual1) < 3 or len(individual2) < 3:
            continue

        if len(individual1) > 3 and len(individual2) > 3:
            crossverPoint = random.randint(1, 3)
            offspring1 = individual1[0:crossverPoint] + individual2[crossverPoint:]
            offspring2 = individual2[0:crossverPoint] + individual1[crossverPoint:]
        else:
            crossverPoint = random.randint(1, 2)
            offspring1 = individual1[0:crossverPoint] + individual2[crossverPoint:]
            offspring2 = individual2[0:crossverPoint] + individual1[crossverPoint:]

        if random.random() < mutationProbability:
            mutationPoint = random.randint(1, 2)
            offspring1 = offspring1[0:mutationPoint] + str(random.randint(1, 6)) + offspring1[mutationPoint:]
        if random.random() < mutationProbability:
            mutationPoint = random.randint(1, 2)
            offspring2 = offspring2[0: mutationPoint] + str(random.randint(1, 6)) + offspring2[mutationPoint:]
        newPopulation.append(offspring1)
        newPopulation.append(offspring2)
    return set(newPopulation)


maxGenerations = 500
population = generateRandomPopulation(2)
fitness = getFitness(population)
geneticAlgorithm(population, fitness)
generation = 1
for i in range(maxGenerations):
    print(f"Generation {generation} - Fittest is {min(fitness.values())}")
    population = geneticAlgorithm(population, fitness)
    fitness = getFitness(population)
    generation = generation + 1
print(f"The minimum cost was: {min(fitness.values())} with the individual: {min(fitness, key=fitness.get)}")