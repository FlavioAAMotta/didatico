# Genetic Algorithm for Traveling Salesman Problem
import random

# Matrix of distances between the 8 cities
distances = [[0, 19, 18, 21, 57, 999, 999, 999],
             [19, 0, 999, 8, 999, 33, 37, 999],
             [18, 999, 0, 14, 35, 999, 999, 999],
             [21, 8, 14, 0, 38, 999, 30, 999],
             [57, 999, 35, 38, 0, 999, 10, 53],
             [999, 33, 999, 999, 999, 0, 6, 41],
             [999, 37, 999, 10, 5, 6, 0, 47],
             [999, 999, 999, 53, 5, 41, 47, 0]]

#genetic algorithm using elitism of 10%
def geneticAlgorithm(population):
    mutationProbability = 0.03
    newPopulation = []
    populationSize = int(len(population)*0.8)
    while len(newPopulation) < populationSize:
        #select two random individuals
        individual1 = random.choice(population)
        individual2 = random.choice(population)
        #crossover
        [offspring1, offspring2] = crossover( individual1, individual2 )
        #mutation
        offspring1 = mutation( offspring1, mutationProbability )
        offspring2 = mutation( offspring2, mutationProbability )
        #add offspring to new population
        newPopulation.append(offspring1)
        newPopulation.append(offspring2)

    #elitism
    fitness = getFitness(population)
    sortedFitness = sorted(fitness.items(), key=lambda x: x[1])
    for i in range(int(len(population)*0.1)):
        newPopulation.append(sortedFitness[i][0])

    #new random individuals
    while len(newPopulation) < len(population):
        individualSize = random.randint(2,6)
        individual = '0'
        for j in range(individualSize):
            #an individual cant have repetead numbers
            randomCity = str(random.randint(1,6))
            while randomCity in individual:
                randomCity = str(random.randint(1,6))
            individual = individual + randomCity
        individual = individual + '7'
        newPopulation.append(individual)

    return newPopulation

#crossover has to ignore the first and last character
def crossover( individual1, individual2):
    offspring1 = individual1[0]
    offspring2 = individual2[0]
    
    #get a random crossover point between 1 and the size of the individual
    crossoverPoint = random.randint(1,len(individual1)-1)
    offspring1 = offspring1 + individual2[crossoverPoint:]
    offspring2 = offspring2 + individual1[crossoverPoint:]

    offspring1 = offspring1 + individual1[len(individual1)-1]
    offspring2 = offspring2 + individual2[len(individual2)-1]
    return [offspring1, offspring2]

#mutation cant be on the first or last character
def mutation( offspring, mutationProbability ):
    for i in range(1,len(offspring)-1):
        if random.random() < mutationProbability:
            offspring = offspring[0:i] + str(random.randint(1,6)) + offspring[i+1:]
    return offspring

#fitness function
def getFitness(population):
    fitness = {}
    for individual in population:
        fitness[individual] = getDistance(individual)
    return fitness

def getDistance(individual):
    distance = 0
    for i in range(len(individual)-1):
        distance = distance + distances[int(individual[i])][int(individual[i+1])]
    return distance

#generate a random population
#individual are string first character is 0, the others are 1 to 6 and last one is 7

def generateRandomPopulation(populationSize):
    population = []
    for i in range(populationSize):
        individualSize = random.randint(2,6)
        individual = '0'
        for j in range(individualSize):
            #an individual cant have repetead numbers
            randomCity = str(random.randint(1,6))
            while randomCity in individual:
                randomCity = str(random.randint(1,6))
            individual = individual + randomCity
        individual = individual + '7'
        population.append(individual)
    return population

def printPopulationWithFitness(population):
    fitness = getFitness(population)
    for individual in population:
        print(individual, fitness[individual])

#main

population = generateRandomPopulation(10) # ['12312312','32132132',...]']
fitness = getFitness(population)
generation = 0
while generation < 50:
    population = geneticAlgorithm(population)
    fitness = getFitness(population)
    print("Generation: ", generation, " Best: ", min(fitness.values()))
    generation = generation + 1

def getIndividualWithoutRepetition(individual):
    individualWithoutRepetition = individual[0]
    for i in range(1,len(individual)-1):
        if individual[i] not in individualWithoutRepetition:
            individualWithoutRepetition = individualWithoutRepetition + individual[i]
    return individualWithoutRepetition

#best individual
bestIndividual = min(fitness, key=fitness.get)
bestDistance = fitness[bestIndividual]
bestIndividual = getIndividualWithoutRepetition(bestIndividual)
print("Best individual: ", bestIndividual)

#best distance
print("Best distance: ", bestDistance)
