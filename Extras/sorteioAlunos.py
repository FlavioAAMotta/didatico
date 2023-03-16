import chardet
import random

with open('ED.txt', 'rb') as file:
    encoding = chardet.detect(file.read())['encoding']
with open('ED.txt', encoding=encoding) as file:
    content = file.readlines()

groups = {}
group = []
for line in content:
    if 'Grupo' in line:
        if group:
            groups[group[0]] = group[1:]
        group = [line.replace('Grupo ', '').replace('\n', '')]
    else:
        group.append(line.replace('\n', ''))
groups[group[0]] = group[1:]

for group in groups:
    print('Grupo', group)
    print(random.choice(groups[group]))
    input()

