import ProblemInterface from "./lib/ProblemInterface.js";
import UninformedSearch from "./lib/UninformedSearch.js";

const STATES = {
  LEFT: "LEFT",
  RIGHT: "RIGHT",
};

const ACTIONS = {
  GO_ALONE: "GO_ALONE",
  GO_WITH_CHICKEN: "GO_WITH_CHICKEN",
  GO_WITH_FOX: "GO_WITH_FOX",
  GO_WITH_CORN: "GO_WITH_CORN",
  BACK_ALONE: "BACK_ALONE",
  BACK_WITH_FOX: "BACK_WITH_FOX",
  BACK_WITH_CHICKEN: "BACK_WITH_CHICKEN",
  BACK_WITH_CORN: "BACK_WITH_CORN",
};

class FarmerProblem extends ProblemInterface {
  constructor({ farmerState, foxState, chickenState, cornState }) {
    super();
    this.farmerState = farmerState;
    this.foxState = foxState;
    this.chickenState = chickenState;
    this.cornState = cornState;
  }

  getActions() {
    const actions = [];
    const actionsByFarmerState = {
      [STATES.LEFT]: () => {
        if (
          this.foxState != this.chickenState &&
          this.chickenState != this.cornState
        ) {
          actions.push(ACTIONS.GO_ALONE);
        }

        if (
          this.foxState == STATES.LEFT &&
          this.chickenState != this.cornState
        ) {
          actions.push(ACTIONS.GO_WITH_FOX);
        }

        if (this.chickenState == STATES.LEFT) {
          actions.push(ACTIONS.GO_WITH_CHICKEN);
        }

        if (
          this.cornState == STATES.LEFT &&
          this.foxState != this.chickenState
        ) {
          actions.push(ACTIONS.GO_WITH_CORN);
        }
      },
      [STATES.RIGHT]: () => {
        if (
          this.foxState != this.chickenState &&
          this.chickenState != this.cornState
        ) {
          actions.push(ACTIONS.BACK_ALONE);
        }

        if (
          this.foxState == STATES.RIGHT &&
          this.chickenState != this.cornState
        ) {
          actions.push(ACTIONS.BACK_WITH_FOX);
        }

        if (this.chickenState == STATES.RIGHT) {
          actions.push(ACTIONS.BACK_WITH_CHICKEN);
        }

        if (
          this.cornState == STATES.RIGHT &&
          this.foxState != this.chickenState
        ) {
          actions.push(ACTIONS.BACK_WITH_CORN);
        }
      },
    };
    const executeAction = actionsByFarmerState[this.farmerState];

    executeAction();

    return actions;
  }

  doAction(action) {
    const state = this.copy();

    if (action == ACTIONS.GO_ALONE) {
      state.farmerState = STATES.RIGHT;
    } else if (action == ACTIONS.GO_WITH_FOX) {
      state.farmerState = STATES.RIGHT;
      state.foxState = STATES.RIGHT;
    } else if (action == ACTIONS.GO_WITH_CHICKEN) {
      state.farmerState = STATES.RIGHT;
      state.chickenState = STATES.RIGHT;
    } else if (action == ACTIONS.GO_WITH_CORN) {
      state.farmerState = STATES.RIGHT;
      state.cornState = STATES.RIGHT;
    } else if (action == ACTIONS.BACK_ALONE) {
      state.farmerState = STATES.LEFT;
    } else if (action == ACTIONS.BACK_WITH_FOX) {
      state.farmerState = STATES.LEFT;
      state.foxState = STATES.LEFT;
    } else if (action == ACTIONS.BACK_WITH_CHICKEN) {
      state.farmerState = STATES.LEFT;
      state.chickenState = STATES.LEFT;
    } else if (action == ACTIONS.BACK_WITH_CORN) {
      state.farmerState = STATES.LEFT;
      state.cornState = STATES.LEFT;
    }

    return state;
  }

  equals(state) {
    return (
      state.farmerState == this.farmerState &&
      state.foxState == this.foxState &&
      state.chickenState == this.chickenState &&
      state.cornState == this.cornState
    );
  }

  copy() {
    return new FarmerProblem({
      farmerState: this.farmerState,
      foxState: this.foxState,
      chickenState: this.chickenState,
      cornState: this.cornState,
    });
  }

  toString() {
    return `Farmer state: ${this.farmerState}, Fox state: ${this.foxState}, Chicken state: ${this.chickenState}, Corn state: ${this.cornState}`;
  }
}

const initialState = new FarmerProblem({
  farmerState: STATES.LEFT,
  foxState: STATES.LEFT,
  chickenState: STATES.LEFT,
  cornState: STATES.LEFT,
});
const goalState = [
  new FarmerProblem({
    farmerState: STATES.RIGHT,
    foxState: STATES.RIGHT,
    chickenState: STATES.RIGHT,
    cornState: STATES.RIGHT,
  }),
];
const result = new UninformedSearch(initialState, goalState).search();

for (const state of result) {
  console.log(state.toString());
}
