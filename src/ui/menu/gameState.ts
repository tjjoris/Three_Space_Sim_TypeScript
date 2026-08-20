type Listener = () => void;
/*
 *bindingsAndJoysState.ts
 @Author: Luke Johnson
 this class stores the state for all items in the game react needs to know about.
 including the menu and popups
 this includes bindings, input diff, inversion settings, phone orientation, if a touch vjoy has been used, and popups.
 it is not a singeleton but an instance on main.
 */


import type {BindingType} from "../../types/bindingType";
import type {GameStateType} from "../../types/gameStateType";
import JoyAxisInputDiffValueReporter from "../../input/joyAxisInputDiffValueReporter";

export default class GameState {
	private state: GameStateType;
    	private listeners: Listener[] = []; //listeners subscribed to.

	public constructor () {
		this.state = {
			bindings: [],
			inputDiff: null
		};
	}


	public setStateBindings(state: BindingType[] | null) {
		if (state == null) {
			return 
		}
		console.log("set bindings and joys state: ", state[1].flightAxis);
		this.state.bindings = state;
		this.notify();
	}

	public setStateInputDiff(state:JoyAxisInputDiffValueReporter | null) {
		this.state.inputDiff = state;
		this.notify;
	}

	public getState(): GameStateType{
		return this.state;
	}

    /**
     * subscribe to listener for UseInputDiffStore 
     * @param listener 
     */
    	public subscribe(listener: Listener) {
		//console.log("diff state subscribing: ", listener);
        	this.listeners.push(listener);
		console.log("in bindings and joys subscribe ", this.listeners.length);
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
