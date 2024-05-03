import random

def geneticAlgorithm(population, fitness):
    mutationProbability = 0.03
    newPopulation = []
    populationSize = len(population)
    while len(newPopulation) < populationSize:
        individual1 = random.choice(population)
        individual2 = random.choice(population)
        crossoverPoint = random.randint(1,7)
        offspring1 = individual1[0:crossoverPoint] + individual2[crossoverPoint:]
        offspring2 = individual2[0:crossoverPoint] + individual1[crossoverPoint:]
        if random.random() < mutationProbability:
            mutationPoint = random.randint(0,7)
            offspring1 = offspring1[0:mutationPoint] + str(random.randint(1,8)) + offspring1[mutationPoint+1:]
        if random.random() < mutationProbability:
            mutationPoint = random.randint(0,7)
            offspring2 = offspring2[0:mutationPoint] + str(random.randint(1,8)) + offspring2[mutationPoint+1:]
        newPopulation.append(offspring1)
        newPopulation.append(offspring2)
    return newPopulation

def get_individual_fitness(individual):
    conflicts = 0
    for i in range(len(individual)):
        for j in range(i+1, len(individual)):
            if individual[i] == individual[j]:
                conflicts = conflicts + 1   
            offset = j - i
            if abs(int(individual[i]) - int(individual[j])) == offset:
                conflicts = conflicts + 1
    return conflicts

def get_population_fitness(population):
    fitness = {}
    for individual in population:
        fitness[individual] = get_individual_fitness(individual)
    return fitness

#generate a random population
def generateRandomPopulation(populationSize):
    population = []
    for i in range(populationSize):
        individual = ''
        for j in range(8):
            individual = individual + str(random.randint(1,8))
        population.append(individual)
    return population


ind1 = '10433211'
ind2 = '60013303'

fil1 = '10413303'
fil2 = '60033211'

fil3 = '10413311'
fil4 = '60033203'

fil5 = '60033313'
fil6 = '10413201'

fil7 = '67043251'

print("ind1: ", get_individual_fitness(ind1))
print("ind2: ", get_individual_fitness(ind2))

print("fil1: ", get_individual_fitness(fil1))
print("fil2: ", get_individual_fitness(fil2))

print("fil3: ", get_individual_fitness(fil3))
print("fil4: ", get_individual_fitness(fil4))

print("fil5: ", get_individual_fitness(fil5))
print("fil6: ", get_individual_fitness(fil6))

print("fil7: ", get_individual_fitness(fil7))


#main

# population = generateRandomPopulation(100) # ['12312312','32132132',...]']
# fitness = getFitness(population)
# generation = 1
# while min(fitness.values()) > 0:
#     print ('Generation ' + str(generation) + ' - Fittest is ' + str(min(fitness.values())))
#     population = geneticAlgorithm(population, fitness)
#     fitness = getFitness(population)
#     generation = generation + 1
# print ('Solution found in generation ' + str(generation-1))
# print ('Fitness: ' + str(min(fitness.values())))
# for individual in fitness.keys():
#     if fitness[individual] == 0:
#         print ('Solution: ' + individual)
#         break
    
