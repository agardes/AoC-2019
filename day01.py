import math

## PART ONE
res = 0
for input in open('input.txt', encoding='utf-8'):
    res += (math.floor(int(input) / 3) - 2)

print(res)

## PART TWO
res2 = 0
for input in open('input.txt', encoding='utf-8'):
    toAdd = 0
    counting = True
    base = (math.floor(int(input) / 3) - 2)
    toAdd += base
    while counting:
        count = (math.floor(int(base) / 3) - 2)
        if count < 0:
            counting = False
        else:
            toAdd += count
            base = count
    res2+=toAdd

print(res2)