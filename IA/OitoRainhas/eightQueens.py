#eight queen problem

import random
import time

#solution usign genetic programming
def geneticAlgorithm(population, fitness):
    mutationProbability = 0.03
    newPopulation = []
    populationSize = len(population)
    while len(newPopulation) < populationSize:
        #select two random individuals
        individual1 = random.choice(population)
        individual2 = random.choice(population)
        #crossover
        crossoverPoint = random.randint(1,7)
        offspring1 = individual1[0:crossoverPoint] + individual2[crossoverPoint:]
        offspring2 = individual2[0:crossoverPoint] + individual1[crossoverPoint:]
        #mutation
        if random.random() < mutationProbability:
            mutationPoint = random.randint(0,7)
            offspring1 = offspring1[0:mutationPoint] + str(random.randint(1,8)) + offspring1[mutationPoint+1:]
        if random.random() < mutationProbability:
            mutationPoint = random.randint(0,7)
            offspring2 = offspring2[0:mutationPoint] + str(random.randint(1,8)) + offspring2[mutationPoint+1:]
        #add offspring to new population
        newPopulation.append(offspring1)
        newPopulation.append(offspring2)
    return newPopulation

#fitness function
def getFitness(population):
    fitness = {}
    for individual in population:
        #number of conflicts
        conflicts = 0
        #for each pair of queens
        for i in range(len(individual)):
            for j in range(i+1, len(individual)):
                #if there is a conflict
                if individual[i] == individual[j]:
                    conflicts = conflicts + 1   
                offset = j - i
                if abs(int(individual[i]) - int(individual[j])) == offset:
                    conflicts = conflicts + 1
        fitness[individual] = conflicts
    return fitness

#generate a random population
#individual are string of 8 numbers, 1 to 8
def generateRandomPopulation(populationSize):
    population = []
    for i in range(populationSize):
        individual = ''
        for j in range(8):
            individual = individual + str(random.randint(1,8))
        population.append(individual)
    return population

#main
population = generateRandomPopulation(100)
fitness = getFitness(population)
generation = 1
while min(fitness.values()) > 0:
    print ('Generation ' + str(generation) + ' - Fittest is ' + str(min(fitness.values())))
    population = geneticAlgorithm(population, fitness)
    fitness = getFitness(population)
    generation = generation + 1
print ('Solution found in generation ' + str(generation-1))
print ('Fitness: ' + str(min(fitness.values())))
for individual in fitness.keys():
    if fitness[individual] == 0:
        print ('Solution: ' + individual)
        break