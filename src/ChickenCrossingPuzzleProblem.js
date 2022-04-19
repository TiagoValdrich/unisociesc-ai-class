import UninformedSearch from "./lib/UninformedSearch.js";

const states = {
    LEFT: 'Esquerda',
    RIGHT: 'Direita'
}
    
const actions = {
    GOALONE: 'Vai-sozinho',
    GOWITHFOX: 'Vai-com-raposa',
    GOWITHCHICKEN: 'Vai-com-a-galinha',
    GOWITHCORN: 'Vai-com-milho',
    COMEBACKALONE: 'Volta-sozinho',
    COMEBACKWITHFOX: 'Volta-com-raposa',
    COMEBACKWITHCHICKEN: 'Volta-com-galinha',
    COMEBACKWITHCORN: 'Volta-com-milho',    
}

class ChickenCrossingPuzzle {
    constructor(farmerState, foxState, chickenState, cornState) {   
        this.farmerState = farmerState;
        this.foxState = foxState;
        this.chickenState = chickenState;
        this.cornState = cornState;
    }

    getActions() {
        let list = [];

        if (this.farmerState == states.LEFT) {
            if ((this.foxState != this.chickenState) && (this.chickenState != this.cornState)) {
                list.push(actions.GOALONE);
            }

            if ((this.foxState == states.LEFT) && (this.chickenState != this.cornState)) {
                list.push(actions.GOWITHFOX);
            }

            if (this.chickenState == states.LEFT) {
                list.push(actions.GOWITHCHICKEN);
            }

            if ((this.cornState == states.LEFT) && (this.foxState != this.chickenState)) {
                list.push(actions.GOWITHCORN);
            }
        } else {
            if ((this.foxState != this.chickenState) && (this.chickenState != this.cornState)) {
                list.push(actions.COMEBACKALONE);
            }

            if ((this.foxState == states.RIGHT) && (this.chickenState != this.cornState)) {
                list.push(actions.COMEBACKWITHFOX);
            }

            if (this.chickenState == states.RIGHT) {
                list.push(actions.COMEBACKWITHCHICKEN);
            }

            if ((this.cornState == states.RIGHT) && (this.foxState != this.chickenState)) {
                list.push(actions.COMEBACKWITHCORN);
            }
        }

        return list;
    }

    doAction(action) {
        let state = this.clone();

        if (action == actions.GOALONE) {
            state.farmerState = states.RIGHT;
        } else if (action == actions.GOWITHFOX) {
            state.farmerState = states.RIGHT;
            state.foxState = states.RIGHT;
        } else if (action == actions.GOWITHCHICKEN) {
            state.farmerState = states.RIGHT;
            state.chickenState = states.RIGHT;
        } else if (action == actions.GOWITHCORN) {
            state.farmerState = states.RIGHT;
            state.cornState = states.RIGHT;
        } else if (action == actions.COMEBACKALONE) {
            state.farmerState = states.LEFT;
        } else if (action == actions.COMEBACKWITHFOX) {
            state.farmerState = states.LEFT;
            state.foxState = states.LEFT;
        } else if (action == actions.COMEBACKWITHCHICKEN) {
            state.farmerState = states.LEFT;
            state.chickenState = states.LEFT;
        } else if (action == actions.COMEBACKWITHCORN) {
            state.farmerState = states.LEFT;
            state.cornState = states.LEFT;
        }

        return state;
    }

    equals(o) {
        return o.farmerState == this.farmerState &&
            o.foxState == this.foxState && 
            o.chickenState == this.chickenState &&
            o.cornState == this.cornState;
    }

    clone() {
        return new ChickenCrossingPuzzle(
            this.farmerState,
            this.foxState,
            this.chickenState,
            this.cornState);
    }
    
    toString() {
        return `[Fazendeiro=${this.farmerState}, Raposa=${this.foxState}, Galinha=${this.chickenState}, Milho=${this.cornState}]`
    }
}

let initial = new ChickenCrossingPuzzle(states.LEFT, states.LEFT, states.LEFT, states.LEFT);

let finals = [
        new ChickenCrossingPuzzle(states.RIGHT, states.RIGHT, states.RIGHT, states.RIGHT)
    ];

let problem = new UninformedSearch(initial, finals);

let result = problem.search();

if (result) {
    result.forEach(state => console.log(state.toString()));
}
