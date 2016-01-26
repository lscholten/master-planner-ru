import { Dispatcher } from "flux";
import AppDispatcher from '../core/app-dispatcher';
import Store from '../core/store';

/**
 * Struct for all possible program action types
 */
export const ProgramActionTypes = {
    SET_PROGRAMS: "program_set_programs",
    TOGGLE_PROGRAM_SELECTION: "toggle_program_selection"
};

/**
 * Class definition for the Program store
 */
class ProgramStoreClass extends Store {
    constructor() {
        super();
        this.programs = [];
        this.selected = [];
    }
}

const ProgramStore = new ProgramStoreClass();

/**
 * Register handlers that update the state of the store
 * given an action.
 */
ProgramStore.dispatchToken = AppDispatcher.register(
    action => {
        if (action.type == ProgramActionTypes.SET_PROGRAMS) {
            ProgramStore.programs = action.programs;
        } else if (action.type == ProgramActionTypes.TOGGLE_PROGRAM_SELECTION) {
            var program = action.program;
            if (ProgramStore.selected.indexOf(program) > -1) {
                ProgramStore.selected.splice(ProgramStore.selected.indexOf(program), 1);
            } else {
                ProgramStore.selected.push(program);
            }
        }
        ProgramStore.emitChange();
    }
);

export default ProgramStore;