/*
 * inputDiffsCompareForJoy.ts
 * @Author: Luke Johnson
 * this class exists for each connected joy.
 * it stores the axes for checking input diffs.
 * it's findGreatestDiff calculates diffs for each axes and returns the JoyAxisInputDiffValueReporter.
 * if none are above the threshold it returns null.
 */
import JoyAxisInputDiffValueReporter from "./joyAxisInputDiffValueReporter.ts";

export default class InputDiffsCompareForJoy {
	private joyId:number;
	private joyName: string;
	private diffReporters: JoyAxisInputDiffValueReporter[]; 
	private diffReported: JoyAxisInputDiffValueReporter | null;

	/*
	 * called when a joy is connected. sets values so joy can be read, and creates JoyAxisInputDiffValueReporters.
	 */
	public constructor (joyId: number, joyName: string, axisCount: number) {
		this.joyId = joyId;
		this.joyName = joyName;
		this.diffReported = null;
		this.diffReporters = [];
		/*
		 * create a JoyAxisInputDiffValueReporter for each axis for this joysitck.
		 * and add each one to the diffReporters array.
		 */
		for (let axisIndex = 0; axisIndex < axisCount; axisIndex ++) {
			const diffReporter = new JoyAxisInputDiffValueReporter(
				this.joyId,
				this.joyName,
				axisIndex
			)
			//add the axis to the diffReporters array.
			this.diffReporters.push(diffReporter);
		};
	}

	/*
	 * called when this joy is disconnected.
	 * sets all diffReporters to empty so their classes are cleaned up.
	 */
	public disconnectJoy() {
		const emptyDiffReporters : JoyAxisInputDiffValueReporter[] = [];
		this.diffReporters = emptyDiffReporters;
	}

	public calculateGreatestDiff(diff: number) {
		//get the gamepad for this joy.
		const gamepad = navigator.getGamepads()[this.joyId];
		if (gamepad == null) {
			console.error(
				"game pad in inputDiffsCompareForJoy is null, id: ",
				this.joyId,
				", name: ",
				this.joyName
			);
			return null;
		}
		//console.log("diff reporters length: ", this.diffReporters.length);
		this.diffReporters.forEach(diffReporter => {
			diffReporter.calculateDifference(gamepad);
			const axisDiff = diffReporter.getDifference();
			//if this reporters diff is not null and is greater than the last greatest diff.
			if ((axisDiff != null) && (axisDiff > diff)) {
				//set the diff which is the parameter and the greates diff so far for all joys to this diff.
				diff = axisDiff;
				//set the diff reporter to this one. this is the object we get to see the greatest one.
				this.diffReported = diffReporter;
				//console.log("diff reported in joy ", this.diffReported);

			}	
		});
	};

	/*
	 * get the aixs diff reporter.
	 */
	public getDiffReporter():JoyAxisInputDiffValueReporter | null {
		return this.diffReported;
	}

	public getJoyId(): number {
		return this.joyId;
	}

	public getJoyName(): string {
		return this.joyName;
	}
}
