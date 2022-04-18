import ProblemInterface from "./lib/ProblemInterface.js";
import UninformedSearch from "./lib/UninformedSearch.js";

const POSITIONS = {
  FIRST_ROOM: "FIRST_ROOM",
  SECOND_ROOM: "SECOND_ROOM",
  THIRD_ROOM: "THIRD_ROOM",
};

const ACTIONS = {
  GO_TO_FIRST_ROOM: "GO_TO_FIRST_ROOM",
  GO_TO_SECOND_ROOM: "GO_TO_SECOND_ROOM",
  GO_TO_THIRD_ROOM: "GO_TO_THIRD_ROOM",
  CLEAR: "CLEAR",
};

const STATES = {
  DIRTY: "DIRTY",
  CLEAN: "CLEAN",
};

class VacuumCleanerProblem extends ProblemInterface {
  constructor({ position, firstRoomState, secondRoomState, thirdRoomState }) {
    super();
    this.position = position;
    this.firstRoomState = firstRoomState;
    this.secondRoomState = secondRoomState;
    this.thirdRoomState = thirdRoomState;
  }

  getActions() {
    const actions = [];
    const possibilities = {
      [POSITIONS.FIRST_ROOM]: () => {
        if (this.firstRoomState === STATES.DIRTY) {
          actions.push(ACTIONS.CLEAR);
        }

        actions.push(ACTIONS.GO_TO_SECOND_ROOM);
      },
      [POSITIONS.SECOND_ROOM]: () => {
        if (this.secondRoomState === STATES.DIRTY) {
          actions.push(ACTIONS.CLEAR);
        }

        actions.push(...[ACTIONS.GO_TO_FIRST_ROOM, ACTIONS.GO_TO_THIRD_ROOM]);
      },
      [POSITIONS.THIRD_ROOM]: () => {
        if (this.thirdRoomState === STATES.DIRTY) {
          actions.push(ACTIONS.CLEAR);
        }

        actions.push(ACTIONS.GO_TO_SECOND_ROOM);
      },
    };

    const nextAction = possibilities[this.position];
    nextAction();

    return actions;
  }

  doAction(action) {
    const state = this.copy();
    const nextPosition = {
      [ACTIONS.GO_TO_FIRST_ROOM]: POSITIONS.FIRST_ROOM,
      [ACTIONS.GO_TO_SECOND_ROOM]: POSITIONS.SECOND_ROOM,
      [ACTIONS.GO_TO_THIRD_ROOM]: POSITIONS.THIRD_ROOM,
    };
    const changeState = {
      [POSITIONS.FIRST_ROOM]: () => (state.firstRoomState = STATES.CLEAN),
      [POSITIONS.SECOND_ROOM]: () => (state.secondRoomState = STATES.CLEAN),
      [POSITIONS.THIRD_ROOM]: () => (state.thirdRoomState = STATES.CLEAN),
    };

    if (action === ACTIONS.CLEAR) {
      changeState[this.position]();
    } else {
      state.position = nextPosition[action];
    }

    return state;
  }

  copy() {
    return new VacuumCleanerProblem({
      position: this.position,
      firstRoomState: this.firstRoomState,
      secondRoomState: this.secondRoomState,
      thirdRoomState: this.thirdRoomState,
    });
  }

  equals(state) {
    return (
      this.position === state.position &&
      this.firstRoomState === state.firstRoomState &&
      this.secondRoomState === state.secondRoomState &&
      this.thirdRoomState === state.thirdRoomState
    );
  }

  toString() {
    return `Position: ${this.position}, 1R State: ${this.firstRoomState}, 2R State: ${this.secondRoomState}, 3R State: ${this.thirdRoomState}`;
  }
}

const initial = new VacuumCleanerProblem({
  position: POSITIONS.FIRST_ROOM,
  firstRoomState: STATES.DIRTY,
  secondRoomState: STATES.DIRTY,
  thirdRoomState: STATES.DIRTY,
});
const goal = [
  new VacuumCleanerProblem({
    position: POSITIONS.FIRST_ROOM,
    firstRoomState: STATES.CLEAN,
    secondRoomState: STATES.CLEAN,
    thirdRoomState: STATES.CLEAN,
  }),
  new VacuumCleanerProblem({
    position: POSITIONS.SECOND_ROOM,
    firstRoomState: STATES.CLEAN,
    secondRoomState: STATES.CLEAN,
    thirdRoomState: STATES.CLEAN,
  }),
  new VacuumCleanerProblem({
    position: POSITIONS.THIRD_ROOM,
    firstRoomState: STATES.CLEAN,
    secondRoomState: STATES.CLEAN,
    thirdRoomState: STATES.CLEAN,
  }),
];

const uninformedSearch = new UninformedSearch(initial, goal);
const result = uninformedSearch.search();

for (const state of result) {
  console.log(state.toString());
}
