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
				axisIndex
			)
			//add the axis to the diffReporters array.
			this.diffReporters.push(diffReporter);
		};
	}

}
