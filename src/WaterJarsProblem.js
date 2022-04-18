import ProblemInterface from "./lib/ProblemInterface.js";
import UninformedSearch from "./lib/UninformedSearch.js";

const STATES = {
  EMPTY: 0,
  ONE_LITER: 1,
  TWO_LITERS: 2,
  THREE_LITERS: 3,
  FOUR_LITERS: 4,
};

const ACTIONS = {
  FILL_ONE: "FILL_ONE",
  FILL_TWO: "FILL_TWO",
  EMPTY_ONE: "EMPTY_ONE",
  EMPTY_TWO: "EMPTY_TWO",
  TRANSFER_FROM_ONE_TO_TWO: "TRANSFER_FROM_ONE_TO_TWO",
  TRANSFER_FROM_TWO_TO_ONE: "TRANSFER_FROM_TWO_TO_ONE",
};

class WaterJarsProblem extends ProblemInterface {
  constructor({ firstJarState, secondJarState }) {
    super();
    this.firstJarState = firstJarState;
    this.secondJarState = secondJarState;
  }

  getActions() {
    const actions = [];

    if (this.firstJarState < 3) {
      actions.push(ACTIONS.FILL_ONE);
    }

    if (this.firstJarState > 0) {
      actions.push(ACTIONS.EMPTY_ONE);

      if (this.secondJarState < 4) {
        actions.push(ACTIONS.TRANSFER_FROM_ONE_TO_TWO);
      }
    }

    if (this.secondJarState < 4) {
      actions.push(ACTIONS.FILL_TWO);
    }

    if (this.secondJarState > 0) {
      actions.push(ACTIONS.EMPTY_TWO);

      if (this.firstJarState < 3) {
        actions.push(ACTIONS.TRANSFER_FROM_TWO_TO_ONE);
      }
    }

    return actions;
  }

  copy() {
    return new WaterJarsProblem({
      firstJarState: this.firstJarState,
      secondJarState: this.secondJarState,
    });
  }

  doAction(action) {
    const state = this.copy();

    if (action === ACTIONS.EMPTY_ONE) {
      state.firstJarState = STATES.EMPTY;
    } else if (action === ACTIONS.EMPTY_TWO) {
      state.secondJarState = STATES.EMPTY;
    } else if (action === ACTIONS.FILL_ONE) {
      state.firstJarState = STATES.THREE_LITERS;
    } else if (action === ACTIONS.FILL_TWO) {
      state.secondJarState = STATES.FOUR_LITERS;
    } else if (action === ACTIONS.TRANSFER_FROM_ONE_TO_TWO) {
      const transfer = Math.min(state.firstJarState, 4 - state.secondJarState);

      state.firstJarState -= transfer;
      state.secondJarState += transfer;
    } else if (action == ACTIONS.TRANSFER_FROM_TWO_TO_ONE) {
      let transfer = Math.min(state.firstJarState, 3 - state.secondJarState);

      state.firstJarState += transfer;
      state.secondJarState -= transfer;
    }

    return state;
  }

  toString() {
    return `Three liter Jar quantity: ${this.firstJarState}L; Four liter jar: ${this.secondJarState}L`;
  }

  equals(state) {
    return (
      this.firstJarState === state.firstJarState &&
      this.secondJarState === state.secondJarState
    );
  }
}

const initialWaterJarProblem = new WaterJarsProblem({
  firstJarState: STATES.EMPTY,
  secondJarState: STATES.EMPTY,
});
const goalWaterJarProblem = [
  new WaterJarsProblem({
    firstJarState: STATES.THREE_LITERS,
    secondJarState: STATES.TWO_LITERS,
  }),
  new WaterJarsProblem({
    firstJarState: STATES.TWO_LITERS,
    secondJarState: STATES.TWO_LITERS,
  }),
  new WaterJarsProblem({
    firstJarState: STATES.ONE_LITER,
    secondJarState: STATES.TWO_LITERS,
  }),
  new WaterJarsProblem({
    firstJarState: STATES.EMPTY,
    secondJarState: STATES.TWO_LITERS,
  }),
];
const results = new UninformedSearch(
  initialWaterJarProblem,
  goalWaterJarProblem
).search();

for (const result of results) {
  console.log(result.toString());
}
