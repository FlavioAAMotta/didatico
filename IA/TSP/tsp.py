#traveling salesman problem for 8 cities

#matrix of distances between cities
distances =    [[0, 5, 2, 3, 7, 5, 6, 9],
                [5, 0, 3, 2, 3, 4, 7, 6],
                [2, 3, 0, 1, 2, 30, 7, 5],
                [3, 2, 1, 0, 12, 2, 3, 8],
                [7, 3, 2, 12, 0, 3, 2, 3],
                [5, 7, 30, 2, 3, 0, 1, 2],
                [6, 7, 4, 3, 2, 1, 0, 1],
                [9, 6, 5, 8, 3, 2, 1, 0]]
#find the shortest path from 0 to 7
#solution usign genetic programming
#['07','017','0135827']