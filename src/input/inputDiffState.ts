/*
 *inputDiffState.ts
 @Author: Luke Johnson
 this class stores the state for the input diff used by the key binding setting.
 it has the notifier for the UseSyncExternalStore.
 it belongs to InputDiffsComparerForAllJoys.
 */

import JoyAxisInputDiffValueReporter from "./joyAxisInputDiffValueReporter";

export default class InputDiffState {
	private state: JoyAxisInputDiffValueReporter | null;

	public constructor () {
		this.state = null;
	}
	public setState(state: JoyAxisInputDiffValueReporter | null) {
		this.state = state;
	}

	public getState(): JoyAxisInputDiffValueReporter | null {
		return this.state;
	}

	public subscribe() {}
}
