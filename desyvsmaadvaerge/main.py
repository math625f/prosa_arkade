from rich.console import Console
import json
import random

def visual_name(interactions, name):
    return f":{interactions[name]['emoji']}: [b blue]{name}[/]"

if __name__ == '__main__':
    console = Console(highlight=False)
    with open(f'{__file__.rstrip("main.py")}/interactions.json', 'r', encoding="utf-8") as f:
        interactions = json.loads(f.read())
        names = list(interactions.keys())

    a = random.randint(0, len(names) - 1)
    b = a
    while a == b:
        b = random.randint(0, len(names) - 1)
    active = [names[a], names[b]]

    for name in active:
        console.print(visual_name(interactions, name))
