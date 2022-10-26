#traveling salesman problem for 8 cities
#
import random
import time

#matrix of distances between cities
distances =    [[0, 1, 2, 3, 4, 5, 6, 7],
                [1, 0, 1, 2, 3, 4, 5, 6],
                [2, 1, 0, 1, 2, 3, 4, 5],
                [3, 2, 1, 0, 1, 2, 3, 4],
                [4, 3, 2, 1, 0, 1, 2, 3],
                [5, 4, 3, 2, 1, 0, 1, 2],
                [6, 5, 4, 3, 2, 1, 0, 1],
                [7, 6, 5, 4, 3, 2, 1, 0]]

#solution usign genetic programming
