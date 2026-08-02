type Listener = () => void;
/*
 *inputDiffState.ts
 @Author: Luke Johnson
 this class stores the state for the input diff used by the key binding setting.
 it has the notifier for the UseSyncExternalStore.
 it belongs to InputDiffsComparerForAllJoys.
 */


import JoyAxisInputDiffValueReporter from "./joyAxisInputDiffValueReporter";

export default class InputDiffState {
	private static instance: InputDiffState | null = null;
	private state: JoyAxisInputDiffValueReporter | null = null;
    	private listeners: Listener[] = []; //listeners subscribed to.

	

	public static getInstance(): InputDiffState {
		if (InputDiffState.instance === null) {
			InputDiffState.instance = new InputDiffState();
		}
		return InputDiffState.instance;
	}
	public setState(state: JoyAxisInputDiffValueReporter | null) {
		this.state = state;
		this.notify();
	}

	public getState(): JoyAxisInputDiffValueReporter | null {
		return this.state;
	}

    /**
     * subscribe to listener for UseInputDiffStore 
     * @param listener 
     */
    	public subscribe(listener: Listener) {
        	this.listeners.push(listener);
        	return () => {
            		this.listeners = this.listeners.filter((l) => l !== listener);
        	}
    	}


    	/**
     	* notify all listeners
     	*/
    	private notify() {
        	console.log("in listener");
        	this.listeners.forEach((listener) => listener());
    	}

}
