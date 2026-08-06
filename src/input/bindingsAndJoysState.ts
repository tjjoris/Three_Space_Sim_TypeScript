type Listener = () => void;
/*
 *bindingsAndJoysState.ts
 @Author: Luke Johnson
 this class stores the state for the bindings and joys.
 It is set by bindingsStorage, and JoysHandler.
 it has the notifier for the UseSyncExternalStore.
 it belongs to JoysHandler and BindingsStorage.
 */


import type {BindingType} from "../types/bindingType";

export default class BindingsAndJoysState {
	private static instance: BindingsAndJoysState | null = null;
	private state: BindingType[] | null = null;
    	private listeners: Listener[] = []; //listeners subscribed to.

	/*
	 * constructor is private to prevent instantiating a new instance of this singleton.
	 */
	private constructor () {
	}

	public static getInstance(): BindingsAndJoysState {
		if (BindingsAndJoysState.instance === null) {
			BindingsAndJoysState.instance = new BindingsAndJoysState();
		}
		return BindingsAndJoysState.instance;
	}

	public resetState() {
		this.state = null;
		this.notify();
	}

	public setState(state: BindingType[] | null) {
		if (state == null) {
			return 
		}
		console.log("set bindings and joys state: ", state.length);
		this.state = state;
		this.notify();
	}

	public getState(): BindingType[] | null {
		return this.state;
	}

    /**
     * subscribe to listener for UseInputDiffStore 
     * @param listener 
     */
    	public subscribe(listener: Listener) {
		//console.log("diff state subscribing: ", listener);
        	this.listeners.push(listener);
        	return () => {
            		this.listeners = this.listeners.filter((l) => l !== listener);
        	}
    	}


    	/**
     	* notify all listeners
     	*/
    	private notify() {
        	console.log("in bindings and joys state listener, length: ", this.listeners.length);
        	this.listeners.forEach((listener) => listener());
    	}

}
