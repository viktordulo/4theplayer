
// Manage the state base class.

import { Listener } from "./ProjectState.js";

export class State<T> {
    
    protected listeners: Listener<T>[] = [];

    addListener(listenerFn: Listener<T>): void {
        this.listeners.push(listenerFn);
    }

}