from rich.console import Console
import json
import random

ORDER = [1,1,0,1,0,0,1,0,0,0]

def activate_dwarf(names, active):
    """
    Modifies the active list with a new dwarf drawn randomly from names
    """
    if len(names) == len(active):
        return
    
    i = random.randint(0, len(names) - 1)
    while names[i] in active:
        i = random.randint(0, len(names) - 1)
    
    active.append(names[i])

def visual_name(interactions, name):
    return f":{interactions[name]['emoji']}: [b blue]{name}[/]"

def fix_placeholders(interactions, s, a, b=None, c=None):
    s = s.replace("<$A$>", visual_name(interactions, a))
    if b:
        s = s.replace("<$B$>", visual_name(interactions, b))
    if c:
        s = s.replace("<$C$>", visual_name(interactions, c))
    return s

if __name__ == '__main__':
    console = Console(highlight=False)
    with open(f'{__file__.rstrip("main.py")}/interactions.json', 'r', encoding="utf-8") as f:
        interactions = json.loads(f.read())
        names = list(interactions.keys())

    active = []

    activate_dwarf(names, active)
    activate_dwarf(names, active)
    
    i = 0
    while len(active) > 0:
        console.print(f"[green][ {', '.join([visual_name(interactions, name) for name in active])} ][/]\n")
        match (ORDER[i], len(active)):
            case (_, 1): # Only one dwarf remaining
                console.print(fix_placeholders(interactions, interactions[active[-1]]["last"], active[-1]))
                del active[0]
            case (0, _): # Remove a dwarf
                console.print(fix_placeholders(interactions, interactions[active[-2]]["remove"], active[-2], active[-1]))
                del active[-2]
            case (1, _): # Add a dwarf
                activate_dwarf(names, active)
                console.print(fix_placeholders(interactions, interactions[active[-3]]["add"], active[-3], active[-2], active[-1]))
        console.print("[yellow]-------------------------------------------[/]")
        i += 1
