/*
 * joyAxisInputDiffValueReporter.ts
 * @Author:Luke Johnson
 * This class stores the axis for a joy, and is used on updates to check for input diffs.
 * input diffs are changes in the axis beyond a threshold, this is used by the keybinding setter in the menu for reading axes to bind inputs to.
 */
export default class JoyAxisInputDiffValueReporter {
	private joyId: number;		
	private joyName: string;
	private axisId: number;
	private diff: number | null;
	readonly threshhold: number;
	private axisValue: number;

	public constructor (joyId: number, joyName: string, axisId: number,threshhold: number = 0.2) {
		this.joyId = joyId;
		this.joyName = joyName;
		this.axisId = axisId;
		this.threshhold = threshhold;
		this.diff = null;
		this.axisValue = 0;
	}

	public update() {

	}


	public calculateDifference(gamepad: Gamepad) {
		this.diff = null;
	/*	
		//end if joy is null
		if (this.joy == null) { 
			console.error("joy in binding is null");
			return;
		}
		//end if joy is not enabled
		if (!this.joy.getEnabled) {
			//error handling which only displays once.
			if (this.showedJoyDisabledError) {
				console.error("joy in binding is disabled");
				this.showedJoyDisabledError = true;
			}
			return;
		}
		//reseeting the error boolean.
		this.showedJoyDisabledError = false;
		//store joyId in a variable so it does not change in this scope.
		let joyId:number|null = this.joy.getJoyId();
		//end if joyId is null
		if (joyId == null) {
			//error check boolean so it does not show every tick.
			if (this.showedJoyIndexNull) {
				console.error("joyindex in binding is null");
				this.showedJoyIndexNull = true;
				this.showedJoyIndex = false;
			}
			return;
		}
		//reset error check toolean
		this.showedJoyIndexNull = false;
		//debug check for showed joy index.
		if (this.showedJoyIndex == false) {
			console.log("reading joy index: ", joyId);
			this.showedJoyIndex = true;
		}
		//set get gamePad from joy.
	        const gamepad = this.joy.getGamepad();
		*/
	        if ((!gamepad) || (gamepad == null)) {
//            this.flightAxis.setValue(0);
			//console.error("gamepad in binding is null");
       		     return null;
        	}
		//end if joyAxis is null.
		if (this.axisId	== null) {
			return null;
		}
		//set the axis value from the joyAxis.
	        const axisValue = gamepad.axes[this.axisId] ?? 0;
		/*
		//debug tracker to prevent spam and track axis value.
		if (this.tempAxisValue != axisValue) {
//       		  console.log("gamepad ", joyId, " axis " , this.joyAxis, " value ", axisValue);
		  this.tempAxisValue = axisValue;
		}
		*/
	       /*
		// set the flight axis value from the local axis value.
	        this.flightAxis.setValue(axisValue);
		*/
	       //find the difference between the last axis value and this one.
	       const diff = Math.abs(axisValue - this.axisValue);
	       this.axisValue = axisValue;
	       //console.log("axis ", this.axisId, " value ", this.axisValue);
	       if (diff >= this.threshhold) {
		       this.diff = diff;
		       //console.log("diff ", this.diff, " axis ", this.axisId);
	       }
	}

	public getDifference(): number | null {
		return this.diff;
	}

	public getJoyId(): number {
		return this.joyId;
	}

	public getAxisId(): number {
		return this.axisId;
	}

	public getJoyName(): string {
		return this.joyName;
	}
}
