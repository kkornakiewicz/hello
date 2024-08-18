---
title: Walking every street in Barcelona
subtitle: 
date: 2024-08-18
tags: ["barcelona", "python", "osmnx"]
draft: false
params:
    contentList: true
---
# Intro
In 2024, I began walking semi-seriously with the goal of covering every street in Barcelona. 

## Inspiration
I stumbled on the idea of _walking-every-street-in-your-city_ online in last days of 2023 and it clicked. 

# Implementation
I track all my walks with Strava and use Python along with osmnx to process the data and monitor my progress.
```python {linenos=inline}
# Getting geo-data of streets
edges_walk = list(osmnx.graph_to_gdfs(G, nodes=False, edges=True).fillna('').iterrows())

# Calculate nodes per street name
nodes_per_street = defaultdict(set)
for edge in edges_walk:
    # Ignoring empty values
    if(edge[1]["name"]):
        nodes_per_street[edge[1]["name"]].add(edge[0][0])
        nodes_per_street[edge[1]["name"]].add(edge[0][1])
```

# Current status
## Completion statistics:
As of August 18th, I have walked approximately 1,450 km and completed 43% of all streets (and ramblas, carreteras, places, camins and others).


## Progress map animation
![map](/progress.gif)


