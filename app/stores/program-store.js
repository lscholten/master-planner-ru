import { Dispatcher } from "flux";
import AppDispatcher from '../core/app-dispatcher';
import Store from '../core/store';

/**
 * Struct for all possible program action types
 */
export const ProgramActionTypes = {
    SET_PROGRAMS: "program_set_programs"
};

/**
 * Class definition for the Program store
 */
class ProgramStoreClass extends Store {
    constructor() {
        super();
        this.programs = [];
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
            ProgramStore.emitChange();
        }
    }
);

export default ProgramStore;