export default class WeightedGraph {
  constructor() {
    this.edges = {};
    this.vertices = new Set();
  }

  #createEdgeIfNotExists(from, to) {
    if (!this.edges[from]) {
      this.edges[from] = {};
      this.edges[from][from] = 0;
      this.edges[from][to] = Infinity;
      this.vertices.add(from);
    }
  }

  addEdge(from, to, cost) {
    this.#createEdgeIfNotExists(from, to);
    this.#createEdgeIfNotExists(to, from);
    this.edges[from][to] = cost;
    this.edges[to][from] = cost;

    return this;
  }
}
