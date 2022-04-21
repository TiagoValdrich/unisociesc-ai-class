import UninformedSearch from "./lib/UninformedSearch.js";
import ProblemInterface from "./lib/ProblemInterface.js";

const ACTIONS = {
  MOVE_UP: "MOVE_UP",
  MOVE_DOWN: "MOVE_DOWN",
  MOVE_LEFT: "MOVE_LEFT",
  MOVE_RIGHT: "MOVE_RIGHT",
};

class EightPuzzleProblem extends ProblemInterface {
  constructor(positions) {
    super();
    this.positions = [];

    for (let i = 0; i < positions.length; i++) {
      this.positions.push([...positions[i]]);
    }
  }

  #findEmptyPosition() {
    let i, j;

    for (i = 0; i < this.positions.length; i++) {
      j = this.positions[i].findIndex((n) => !n);

      if (j != -1) break;
    }

    return [i, j];
  }

  getActions() {
    const actions = [];
    const [i, j] = this.#findEmptyPosition();

    if (i - 1 >= 0) {
      actions.push(ACTIONS.MOVE_UP);
    }

    if (i + 1 < this.positions.length) {
      actions.push(ACTIONS.MOVE_DOWN);
    }

    if (j + 1 < this.positions[i].length) {
      actions.push(ACTIONS.MOVE_RIGHT);
    }

    if (j - 1 >= 0) {
      actions.push(ACTIONS.MOVE_LEFT);
    }

    return actions;
  }

  doAction(action) {
    const state = this.copy();
    const [i, j] = this.#findEmptyPosition();

    if (action === ACTIONS.MOVE_UP) {
      state.positions[i][j] = this.positions[i - 1][j];
      state.positions[i - 1][j] = null;
    } else if (action === ACTIONS.MOVE_DOWN) {
      state.positions[i][j] = this.positions[i + 1][j];
      state.positions[i + 1][j] = null;
    } else if (action === ACTIONS.MOVE_RIGHT) {
      state.positions[i][j] = this.positions[i][j + 1];
      state.positions[i][j + 1] = null;
    } else if (action === ACTIONS.MOVE_LEFT) {
      state.positions[i][j] = this.positions[i][j - 1];
      state.positions[i][j - 1] = null;
    }

    return state;
  }

  copy() {
    return new EightPuzzleProblem(this.positions);
  }

  equals(state) {
    for (let i = 0; i < this.positions.length; i++) {
      for (let j = 0; j < this.positions[i].length; j++) {
        if (state.positions[i][j] !== this.positions[i][j]) return false;
      }
    }

    return true;
  }

  toString() {
    let s = "\n[\n";

    for (let i = 0; i < this.positions.length; i++) {
      for (let j = 0; j < this.positions.length; j++) {
        if (j === this.positions[i].length - 1) {
          s += `${this.positions[i][j]} \n`;
        } else {
          s += `${this.positions[i][j]} `;
        }
      }
    }

    s += "]";
    return s;
  }
}

const initial = new EightPuzzleProblem([
  [4, 2, 7],
  [null, 8, 6],
  [3, 5, 1],
]);
const goal = [
  new EightPuzzleProblem([
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, null],
  ]),
];

const uninformedSearch = new UninformedSearch(initial, goal);
const result = uninformedSearch.search() || [];

for (const state of result) {
  console.log(state.toString());
}
