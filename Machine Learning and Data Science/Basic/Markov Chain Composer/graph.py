# This is our markov chain representation
import random
 # defining the graph in terms of the vertices 

class vertex:
    def __init__(self, value):
        self.value = value
        self.adjecent = {} # ths will keep track of which vertices is connected to the next vertex
        self.neighbors = []
        self.neighbors_weights = []
    def add_edge_to(self, vertex, weight = 0):
        self.adjacent [vertex]= weight
    
    def increment_edge(self, vertex):
        self.adjacent[vertex] = self.adjacent.get(vertex, 0) + 1
    
    def get_probability_map(self):
        for (vext,weight) in self.adjacent.item():
            self.neighbors.append(vertex)
            self.neigbors_weights.append(weight)
    
    def next_word(self):
        # randomly select next word based on weight
        return random.choices(self.neighbors, weights = self.neigbors_weights)[0]

    
# now we want to put all of this in a graph 
class Graph: 
    def __init__(self):
        self.vertices = {}
    
    def get_vertex_valies(self):
        # this is going to return all possible words
        return set(self.vertices.key())
    
    def add_vertex(self, value):
        self.vertices[value]= vertex(value)

    def get_vertex(self, value):
        # if the value isnt in the graph, get it from here
        if value not in self.vertices:
            self.add_vertex(value)
        return self.vertices[value] 

    def get_next_word(self,current_vertex):
        return self.vertices[current_vertex.value].next_word()
    
    def generate_probability_mappings(self):
        for vertex in self.vertices.values():
            vertex.get_probability_map()
    