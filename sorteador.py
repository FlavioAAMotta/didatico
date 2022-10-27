#code to generate 14 random unique numbers from 1 to 14
import random
numbers = []
while len(numbers) < 14:
    number = random.randint(1,14)
    if number not in numbers:
        numbers.append(number)
print(numbers)