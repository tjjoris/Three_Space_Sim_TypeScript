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
import InputDiffState from "./inputDiffState";

export default class InputDiffsComparerForAllJoys {
	//if this updater is enabled or not.
	private diffEnabled: boolean;
	//the array of joy input diffs.
	private joys:InputDiffsCompareForJoy[];
	//the reported axis input diff which can be null.
	private inputReported:JoyAxisInputDiffValueReporter | null;
	private inputDiffState: InputDiffState;
	private lastUpdateTimeSignature: number;

	public constructor(inputDiffState: InputDiffState) {
		this.diffEnabled = false;
		this.joys = [];
		this.inputReported = null;
		this.inputDiffState = inputDiffState
		this.lastUpdateTimeSignature = performance.now();
	}

	/*
	 * called when a joy is connected. creates an instqance of InputDiffsCompareForJoy for the joy, and that creates JoyAxisInputDiffValueReporters for that joys axes.
	 */
	public joyConnected(joyId: number, joyName: string, axisCount: number) {
		const joyDiff = new InputDiffsCompareForJoy(joyId, joyName, axisCount);
		this.joys.push(joyDiff);
		console.log("joy connected ", this.joys.length);
	}

	/*
	 * called when a joy is disconnected, calls disconnect function for joy diff, and removes this joy diff from the array.
	 */
	public disconnectJoy(discJoy: InputDiffsCompareForJoy) {
		const newJoys: InputDiffsCompareForJoy[] = this.joys.filter(
			joy => joy != discJoy
		)
		this.joys = newJoys;
	}
	
	/*
	 * beginBindingCheck begins the loop which calls the update on each frame.
	 */

	/*
	 * end binding check ends the loop which calls the update on each frame.
	 */

	/*
	 * update loop is updated each frame to checke all joys for diffs.
	 * it calculates the diffs for each diff joy, then gets the greates of them all.
	 */
	public update():void {
		//get time since last read input diff.
		const timeDiff = performance.now() - this.lastUpdateTimeSignature;
		//if difference in time is less than 200 end.
		if (timeDiff < 200) {
			return;
		}
		//set time signature to now because reading for input diff.
		this.lastUpdateTimeSignature = performance.now();
		//end if this is disabled.
		if (!this.diffEnabled) {
			return;
		}
		let diff = 0;
		//console.log("joys comparer length: ", this.joys.length);
		//loop all joys.
		this.joys.forEach(joy => {
			//console.log("in joy: ", joy.getJoyName(), " ", joy.getJoyId());
			joy.calculateGreatestDiff(diff);
			let tempDiff = joy.getDiffReporter();
			if (tempDiff != null){
				let tempDiffValue = tempDiff.getDifference();
				if ((tempDiffValue != null) && (tempDiffValue > diff)) {
				
					diff = tempDiffValue;	
					this.inputReported = joy.getDiffReporter();
					//console.log("in all joys loop diff ", this.inputReported);
				}
			}

		});
		const inputReported = this.inputReported;
		if (inputReported == null) {
			console.log("input reported null");
			return;
		}
		/*console.log("diff is joyId: ",
			    inputReported.getJoyId(),
			   " axis: ",
			   inputReported.getAxisId());*/
			  //console.log("IN INPUTDIFFSCOMPARER SET STATE", inputReported);
		this.inputDiffState.setState(inputReported);
	};

	/*
	 * getDiff gets the diff and prints it to the console.
	 * TODO: sync useStateExternalStore will be updated and tell react this has changed.
	 */
	public getMaxInputDiffForJoy():JoyAxisInputDiffValueReporter | null{
		//console.log("reporting diff: ", this.inputReported);
		return this.inputReported;
	}

	public enableDiff() {
		this.diffEnabled = true;
	}

	public disableDiff() {
		console.log("disabled by luke");
		console.log(this.diffEnabled);
		this.diffEnabled = false;
	}

	public setDiffEnabled(diffEnabled: boolean): void {
		this.diffEnabled = diffEnabled;
		console.log("diff enabled ", this.diffEnabled);
	}

}
