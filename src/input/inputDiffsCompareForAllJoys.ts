/*
 *inputDiffsCompareForAllJoys.ts
 @Author: Luke Johnson
 This class is used to read inputs for binding the inputs in the React menu.
 It stores InputDiffsCompareForJoy which exists for each connected joy.
 This class has it's update loop activated by a static function called by React.
Also it's update loop is disabled in a similar way.
when the update loop gets a valid diff, it checks if it is different from the previous stored diff, and if it is not, it stores it, and that state sends a signal to UseSyncExternalStore in React which updates the Menu showing the set binding.

 */
import InputDiffsCompareForJoy from "./inputDiffsCompareForJoy";
import JoyAxisInputDiffValueReporter from "./joyAxisInputDiffValueReporter";

export default class InputDiffsCompareForAllJoys {
	//the array of joy input diffs.
	private joys:InputDiffsCompareForJoy[];
	//the reported axis input diff which can be null.
	private inputReported:JoyAxisInputDiffValueReporter | null;

	public constructor() {
		this.joys = [];
		this.inputReported = null;
	}

	/*
	 * called when a joy is connected. creates an instqance of InputDiffsCompareForJoy for the joy, and that creates JoyAxisInputDiffValueReporters for that joys axes.
	 */
	public joyConnected(joyId: number, joyName: string, axisCount: number) {
		const joyDiff = new InputDiffsCompareForJoy(joyId, joyName, axisCount);
		this.joys.push(joyDiff);
	}

	/*
	 * called when a joy is disconnected, calls disconnect function for joy diff, and removes this joy diff from the array.
	 */
	public disconnectJoy(discJoy: InputDiffsCompareForJoy) {
		/*function notDiscJoy(joy: InputDiffsCompareForJoy) : InputDiffsCompareForJoy | null{
			const discJoy : InputDiffsCompareForJoy = this;
			if (this != joy) {
				return joy;
			}
			return null;
		}*/
		const newJoys: InputDiffsCompareForJoy[] = this.joys.filter(
			joy => joy != discJoy
		)
		this.joys = newJoys;
	}
	
}
