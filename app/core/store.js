import EventEmitter from "eventemitter3";

const CHANGE_EVENT = 'update';

/**
 * Base store, defines some commonly used methods in all the other
 * stores.
 */
export default class Store extends EventEmitter {
    constructor() {
        super();
    }

    subscribe (callback) {
        this.on(CHANGE_EVENT, callback);
    }

    unsubscribe (callback) {
        this.removeListener(CHANGE_EVENT, callback)
    }

    emitChange() {
        this.emit(CHANGE_EVENT);
    }
}