import AStarSearch from "./lib/AStarSearch.js";
import WeightedGraph from "./lib/WeightedGraph.js";

const weightedGraph = new WeightedGraph();
const HEURISTIC = {
  Arad: 366,
  Bucharest: 0,
  Craiova: 160,
  Dobreta: 242,
  Eforie: 161,
  Fagaras: 176,
  Giurgiu: 77,
  Hirsova: 151,
  Lasi: 226,
  Lugoj: 244,
  Mehadia: 241,
  Neamt: 234,
  Oradea: 380,
  Pitesti: 100,
  "Rimnicu Vilcea": 193,
  Sibiu: 253,
  Timisoara: 329,
  Urziceni: 80,
  Vaslui: 199,
  Zerind: 374,
};

weightedGraph
  .addEdge("Bucharest", "Urziceni", 85)
  .addEdge("Bucharest", "Giurgiu", 90)
  .addEdge("Bucharest", "Pitesti", 101)
  .addEdge("Bucharest", "Fagaras", 211)
  .addEdge("Urziceni", "Hirsova", 98)
  .addEdge("Hirsova", "Eforie", 86)
  .addEdge("Urziceni", "Vaslui", 142)
  .addEdge("Vaslui", "Lasi", 92)
  .addEdge("Lasi", "Neamt", 87)
  .addEdge("Fagaras", "Sibiu", 99)
  .addEdge("Sibiu", "Arad", 140)
  .addEdge("Sibiu", "Oradea", 151)
  .addEdge("Arad", "Zerind", 75)
  .addEdge("Oradea", "Zerind", 71)
  .addEdge("Pitesti", "Rimnicu Vilcea", 97)
  .addEdge("Rimnicu Vilcea", "Sibiu", 80)
  .addEdge("Pitesti", "Craiova", 138)
  .addEdge("Craiova", "Rimnicu Vilcea", 146)
  .addEdge("Craiova", "Dobreta", 120)
  .addEdge("Dobreta", "Mehadia", 75)
  .addEdge("Mehadia", "Lugoj", 70)
  .addEdge("Lugoj", "Timisoara", 111)
  .addEdge("Timisoara", "Arad", 118);

const results = AStarSearch(weightedGraph, HEURISTIC, "Arad", "Bucharest");

let shortestPath = null;

for (const result of results) {
  if (!shortestPath || result.cost < shortestPath.cost) {
    shortestPath = result;
  }
}

console.log("The shortest path is: ", shortestPath.path.join(" -> "));
console.log("Path cost: ", shortestPath.cost);
