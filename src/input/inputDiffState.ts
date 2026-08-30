type Listener = () => void;
/*
 *inputDiffState.ts
 @Author: Luke Johnson
 this class stores the state for the input diff used by the key binding setting.
 it has the notifier for the UseSyncExternalStore.
 it belongs to InputDiffsComparerForAllJoys.
 */


import JoyAxisInputDiffValueReporter from "./joyAxisInputDiffValueReporter";
import GameState from "../ui/menu/gameState";

export default class InputDiffState {
	private static instance: InputDiffState | null = null;
	private state: JoyAxisInputDiffValueReporter | null = null;
    	private listeners: Listener[] = []; //listeners subscribed to.
	private gameState: GameState;

	/*
	 * constructor is private to prevent instantiating a new instance of this singleton.
	 */
	public constructor (gameState: GameState) {
		this.gameState = gameState;
	}

	/*public static getInstance(): InputDiffState {
		if (InputDiffState.instance === null) {
			InputDiffState.instance = new InputDiffState();
		}
		return InputDiffState.instance;
	}
	*/

	public resetState() {
		this.state = null;
		this.notify();
	}

	public setState(state: JoyAxisInputDiffValueReporter | null) {
		if ((state == null) || (state.getDifference() == null)) {
			return 
		}
		console.log("SETTING INPUT DIFF STATE: ", state);
		this.gameState.setStateInputDiff(state);
		/*
		console.log("set input diff state: ", state.getDifference());
		this.state = state;
		this.notify();
		*/
	}

	public getState(): JoyAxisInputDiffValueReporter | null {
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
        	console.log("in listener, length: ", this.listeners.length);
        	this.listeners.forEach((listener) => listener());
    	}

}
