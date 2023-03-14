#traveling salesman problem for 8 cities

#Matrix of distances between the 8 cities
matrix = [[0, 19, 18, 21, 57, 999, 999, 999],
             [19, 0, 999, 8, 999, 33, 37, 999],
             [18, 999, 0, 14, 35, 999, 999, 999],
             [21, 8, 14, 0, 38, 999, 30, 999],
             [57, 999, 35, 38, 0, 999, 10, 53],
             [999, 33, 999, 999, 999, 0, 6, 41],
             [999, 37, 999, 10, 5, 6, 0, 47],
             [999, 999, 999, 53, 5, 41, 47, 0]]

 
 
import random 
idCidade=[0,1,2,3,4,5,6,7] 
 
def valorPosicao(i, j): 
    caminho=matrix[int(i)][int(j)] 
    return caminho 
 
#solution usign genetic programming 
def geneticAlgorithm(population, fitness): 
    best='' 
    valueBest=999 
    for x in fitness: 
        valorAtual=fitness[x] 
        if valorAtual<valueBest: 
            valueBest=valorAtual 
            best=x 
         
 
    mutationProbability = 0.03 
    newPopulation = [] 
    if random.random() < 0.001: 
        newPopulation.append(best) 
 
    populationSize = len(population) 
    while len(newPopulation) < populationSize: 
        #select two random individuals 
        individual1 = random.choice(population) 
        individual2 = random.choice(population) 
        #crossover 
        crossoverPoint = random.randint(1,6) 
        offspring1 = individual1[0:crossoverPoint]
        offspring11='' 
        offspring22='' 
        for i in range(0, 8): 
            gene=individual2[i] 
            if offspring1.find(gene)==-1: 
                offspring1+=gene 
         
  
        offspring2 = individual2[0:crossoverPoint]
 
        for i in range(0, 8): 
            gene=individual1[i] 
            if offspring2.find(gene)==-1: 
                offspring2+=gene 
        #mutation 
        if random.random() < mutationProbability:  
            geneA=random.randint(0, len(individual1)-2) 
            # Aplicamos a chance 
            while True: 
                geneB = random.randint(0, len(individual1)-2) 
                if geneB!=geneA: break 
                       
            valorA=offspring1[geneA] 
            valorB=offspring1[geneB] 
 
            for i in range(0,7): 
                if offspring1[i]==valorA: 
                     offspring1+=valorB 
                elif offspring1[i]==valorB: 
                     offspring11+=valorA 
                else: 
                    offspring11+=offspring1[i] 
  
         
 
        if random.random() < mutationProbability: 
 
            geneA=random.randint(0, len(individual2)-2) 
            # Aplicamos a chance 
            while True: 
                geneB = random.randint(0, len(individual2)-2) 
                if geneB!=geneA: break 
            valorA=offspring2[geneA] 
            valorB=offspring2[geneB] 
 
            for i in range(0,7): 
                if offspring2[i]==valorA: 
                     offspring22+=valorB 
                elif offspring2[i]==valorB: 
                     offspring22+=valorA 
                else: 
                    offspring22+=offspring2[i] 
  
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
        cidadeInicial=individual[0] 
        #for each pair of queens 
     
        for i in range(0,7): 
                #if there is a conflict 
                posicaoI=individual[i] 
               
                if (i==7): 
                    posicaoJ=cidadeInicial 
                else: 
                    posicaoJ=individual[i+1] 
                 
                conflicts+=valorPosicao(posicaoI,posicaoJ) 
         
              
        fitness[individual] = conflicts 
    return fitness 
 
#generate a random population 
#individual are string of 8 numbers, 1 to 8 
def generateRandomPopulation(populationSize): 
    population = [] 
        
    for i in range(populationSize): 
        individual = '' 
        idAleatorios = random.sample(idCidade, len(idCidade)) 
        for i in range(0,len(idAleatorios)): 
            individual = individual + str(idAleatorios[i]) 
        population.append(individual)   
 
    return population 
 
 
 
#generate a random population 
#individual are string of 8 numbers, 1 to 8 
def generateRandomPopulation2(populationSize): 
    population = [] 
    for i in range(populationSize): 
        individual = '' 
        for j in range(8): 
            individual = individual + str(random.randint(1,8)) 
        population.append(individual) 
    return population 
 
#main 
 
population = generateRandomPopulation(2000) # ['12312312','32132132',...]'] 
fitness = getFitness(population) 
generation = 1 
while min(fitness.values()) > 13: 
    print ('Generation ' + str(generation) + ' - Fittest is ' + 
str(min(fitness.values()))) 
    population = geneticAlgorithm(population, fitness) 
    fitness = getFitness(population) 
    generation = generation + 1 
print ('Solution found in generation ' + str(generation-1)) 
print ('Fitness: ' + str(min(fitness.values()))) 
for individual in fitness.keys(): 
    if fitness[individual] == 13: 
        print ('Solution: ' + individual) 
        #break