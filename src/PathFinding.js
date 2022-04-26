import AStarFinder from "pathfinding/src/finders/AStarFinder.js";
import Grid from "pathfinding/src/core/Grid.js";

const distance = [
  [70, 66, 62, 58, 54, 50],
  [66, 56, 52, 48, 44, 40],
  [62, 52, 42, 38, 34, 30],
  [58, 48, 38, 28, 24, 20],
  [54, 44, 34, 24, 14, 10],
  [50, 40, 30, 20, 10, 0],
];
const grid = new Grid(6, 6);

grid.setWalkableAt(4, 4, false);

const algo = new AStarFinder({
  allowDiagonal: true,
  dontCrossCorners: true,
});

const result = algo.findPath(0, 0, 5, 5, grid);

console.log("Path travelled: ");

for (const position of result) {
  console.log(position, " - ", distance[position[0]][position[1]]);
}
