---
title: Walking every street in Barcelona
subtitle: 
date: 2024-08-18
tags: ["barcelona", "python", "osmnx"]
draft: false
---
In 2024, I began walking semi-seriously with the goal of covering every street in Barcelona. I track all my walks with Strava and use Python along with osmnx to process the data and monitor my progress.

As of August 18th, I have walked approximately 1,450 km and completed 43% of all streets (and ramblas, carreteras, places, camins and others).

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

![map](/progress.gif)*As of 18-08-2024*


