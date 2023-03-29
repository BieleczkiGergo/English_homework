file = open("data.txt", "r")

for line in file:
    en, hu = line.strip().split("-")
    print(f"    [\"{en}\", \"{hu}\"],")

file.close()