#Resolving Traveling Salesman Problem For 8 Cities With Genetic Algorithm
#Hugo Rios & Caio Dias

#Will import Random lib
import random

#Matrix of distances between the 8 cities
distances = [[0, 19, 18, 21, 57, 999, 999, 999],
             [19, 0, 999, 8, 999, 33, 37, 999],
             [18, 999, 0, 14, 35, 999, 999, 999],
             [21, 8, 14, 0, 38, 999, 30, 999],
             [57, 999, 35, 38, 0, 999, 10, 53],
             [999, 33, 999, 999, 999, 0, 6, 41],
             [999, 37, 999, 10, 5, 6, 0, 47],
             [999, 999, 999, 53, 5, 41, 47, 0]]

#OBJECTIVE: Find the shortest path from 0 to 7

#First: we generate a random population from 0 to 7
def generateRandomPopulation(populationSize):
    #Creates a population array
    population = []
    for i in range(populationSize):
        #Starts on the position 0
        individual = '0'
        for j in range(7):
            individual = individual + str(random.randint(1,6))
        #Will aways end in the individual 7
        individual = individual + '7'
        population.append(individual)
    return population

#Second: we get the fitness from the population
def getFitness(population):
    #Create fitness
    fitness = {}
    for individual in population:
        wayCost = 0
        #If i in range of individual size
        for i in range(len(individual)):
            #If i is lesser than individual - 1
            if i < len(individual) - 1:
                individualDistLen = distances[int(individual[i])]
                individualLen = int(individual[i + 1])
                result = individualDistLen[individualLen]
                wayCost = wayCost + result
        fitness[individual] = wayCost
    return fitness

#Third: we make the solution using a genetic algorithm
def geneticAlgorithm(population, fitness):
    #Create a new population array
    newPopulation = []
    #The size of the population will be the lenght of population
    populationSize = len(population)
    #Will map the fitness of the individuals 
    theBestIndividuals = dict(sorted(fitness.items(), key=lambda item: item[1]))
    #Will make a list of that individuals
    theBestIndividuals = list(theBestIndividuals.keys())
    #Mutation probability
    mutationProbability = 0.5

    #Will pick the range of the lenght of the best individual with the mutation probability and place it into the new population
    for i in range(int(len(theBestIndividuals) * 0.5)):
        individual = theBestIndividuals[i]
        newPopulation.append(individual)
        
    #While the new population is smaller than population size, the process begins and loop until the condition stops
    while len(set(newPopulation)) < populationSize:
        individual1 = random.choice(list(population))
        individual2 = random.choice(list(population))

        #Begins the crossover process
        if len(individual1) > 3 and len(individual2) > 3:
            crossverPoint = random.randint(1, 3)
            offspring1 = individual1[0:crossverPoint] + individual2[crossverPoint:]
            offspring2 = individual2[0:crossverPoint] + individual1[crossverPoint:]
        else:
            crossverPoint = random.randint(1, 2)
            offspring1 = individual1[0:crossverPoint] + individual2[crossverPoint:]
            offspring2 = individual2[0:crossverPoint] + individual1[crossverPoint:]

        #Begins the mutation process
        if random.random() < mutationProbability:
            mutationPoint = random.randint(1, 2)
            offspring1 = offspring1[0:mutationPoint] + str(random.randint(1, 6)) + offspring1[mutationPoint:]

        if random.random() < mutationProbability:
            mutationPoint = random.randint(1, 2)
            offspring2 = offspring2[0: mutationPoint] + str(random.randint(1, 6)) + offspring2[mutationPoint:]
            newPopulation.append(offspring1)
            newPopulation.append(offspring2)
        
        if len(individual1) < 3 or len(individual2) < 3: continue

    return set(newPopulation)
    
#Main Exec
limitOfGenerations = 500
generation = 1
population = generateRandomPopulation(2)
fitness = getFitness(population)
geneticAlgorithm(population, fitness)

for i in range(limitOfGenerations):
    print(f"Generation {generation} - Fittest is {min(fitness.values())}")
    population = geneticAlgorithm(population, fitness)
    fitness = getFitness(population)
    generation = generation + 1

print ('The Algorithm Run: ' + str(generation-1) + ' Generations')
print ('The Minimun Cost Found Was: ' + str(min(fitness.values())))
print (f'Individual: {min(fitness, key=fitness.get)}')