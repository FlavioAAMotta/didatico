import random
import numpy as np
distances = [[0, 19, 18, 21, 57, 999, 999, 999],
             [19, 0, 999, 8, 999, 33, 37, 999],
             [18, 999, 0, 14, 35, 999, 999, 999],
             [21, 8, 14, 0, 38, 999, 30, 999],
             [57, 999, 35, 38, 0, 999, 10, 53],
             [999, 33, 999, 999, 999, 0, 6, 41],
             [999, 37, 999, 10, 5, 6, 0, 47],
             [999, 999, 999, 53, 5, 41, 47, 0]]
def generatePopulation(size):
    population = []
    
    while len(set(population)) < size:
        paths = random.randint(0, 5)
        individual = '0'
        for i in range(paths):
            individual = individual + str(random.randint(1, 6))
        individual = individual + '7'
        population.append(individual)
    return set(population)
def FitnessCalculation(population):
    fitness = {}
    for individual in population:
        cost = 0
        for i in range(len(individual)):
            if i < len(individual) - 1:
                a = distances[int(individual[i])]
                b = int(individual[i+1])
                value = a[b]
                cost += value
        fitness[individual] = cost
    
    return fitness
def GeneticAlgorithm(population, fitness):
    mutationRate = 0.25
    newPopulation = []
    populationSize = len(population)
    HighestFit = dict(sorted(fitness.items(), key=lambda item: item[1]))
    HighestFit = list(HighestFit.keys())
    for i in range(int(len(HighestFit) * 0.5)):
        individual = HighestFit[i]
        newPopulation.append(individual)
    while len(set(newPopulation)) < populationSize:
        individual1 = random.choice(list(population))
        individual2 = random.choice(list(population))
        if len(individual1) < 3 or len(individual2) < 3:
            continue
        
        if len(individual1) > 3 and len(individual2) > 3:
            crossoverPoint = random.randint(1, 3)
            offspring1 = individual1[0:crossoverPoint] + individual2[crossoverPoint:]
            offspring2 = individual2[0:crossoverPoint] + individual1[crossoverPoint:]
        else:
            crossoverPoint = random.randint(1, 2)
            offspring1 = individual1[0:crossoverPoint] + individual2[crossoverPoint:]
            offspring2 = individual2[0:crossoverPoint] + individual1[crossoverPoint:]
        if random.random() < mutationRate:
            mutationPoint = random.randint(1, 2)
            offspring1 = offspring1[0:mutationPoint] + str(random.randint(1, 6)) + offspring1[mutationPoint:]
        if random.random() < mutationRate:
            mutationPoint = random.randint(1, 2)
            offspring2 = offspring2[0: mutationPoint] + str(random.randint(1, 6)) +offspring2[mutationPoint:]
        newPopulation.append(offspring1)
        newPopulation.append(offspring2)
    
    return set(newPopulation)
maxGenerations = 1000
population = generatePopulation(4)
fitness = FitnessCalculation(population)
GeneticAlgorithm(population, fitness)
generation = 1
for i in range(maxGenerations):
    print(f"Gen = {generation} - Fitness value = {min(fitness.values())}" )
    population = GeneticAlgorithm(population, fitness)
    fitness = FitnessCalculation(population)
    generation = generation + 1
print(f"The minimum cost was: {min(fitness.values())} with the individual: {min(fitness, key=fitness.get)}")