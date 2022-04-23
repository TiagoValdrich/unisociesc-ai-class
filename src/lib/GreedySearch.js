/**
 * @param {import('./WeightedGraph').default} weightedGraph
 * @param {string} start
 * @param {string} end
 */
export default function GreedySearch(weightedGraph, start, end) {
  const search = (totalPath, currentPath, cost) => {
    const newTotalPath = totalPath.split(",");
    newTotalPath.push(currentPath);
    const newPath = newTotalPath.join(",");

    if (currentPath === end) {
      visitedPaths[newPath] = cost;
    } else {
      const vertices = weightedGraph.edges[currentPath];

      for (const edge in vertices) {
        const isAlreadyVisited = newPath.split(",").slice(1).indexOf(edge) > -1;

        if (
          !isAlreadyVisited &&
          vertices[edge] < Infinity &&
          edge != currentPath
        ) {
          search(newPath, edge, cost + vertices[edge]);
        }
      }
    }
  };

  const visitedPaths = {};

  search("", start, 0);

  return Object.keys(visitedPaths).map((path) => ({
    path: path.split(",").slice(1),
    cost: visitedPaths[path],
  }));
}
