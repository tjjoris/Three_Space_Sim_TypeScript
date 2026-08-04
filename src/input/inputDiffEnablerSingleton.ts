/*
 *inputDiffEnablerSingleton.ts
 @Author: Luke Johnson
 this singleton enables and disables the inputDiffsComparerForAllJoys update function.
 this is called by the game loop and used for getting inputs for binding keys in the menu.
 */
import InputDiffsComparerForAllJoys from "./inputDiffsComparerForAllJoys";

export default class InputDiffEnablerSingleton {
	private static  instance: InputDiffEnablerSingleton;

	/*
	 * constructor is private so class cannot be instantiated externally.
	 */
	private constructor () {}
	private inputDiffsComparerForAllJoys: InputDiffsComparerForAllJoys;

	public static getInstance (): InputDiffEnablerSingleton {
		if (this.instance === null) {
			this.instance = new InputDiffEnablerSingleton;
		}
		return this.instance;
	}
	
	public enable() {
		this.inputDiffsComparerForAllJoys.enable();
	}

	public disable() {
		this.inputDiffsComparerForAllJoys.disable();
	}

}
