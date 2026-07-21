/*
joyAxisBinding.ts
@Author: Luke Johnson
This class on tick sets the flight axis value to the value from the stored joy axis derived from the stored joy.
If the binding is inactive, it does nothing on tick.
 */
import type Tickable from "../game/tickable"
import Joy from "./joy.ts"
import Axis from "../axes/axis"

export default class JoyAxisBinding implements Tickable{
	private joy:Joy|null;
	private joyAxis: number|null;
	private flightAxis: Axis;
	//a temporary storager for the axis value to eliminate debug spam.
	private tempAxisValue: number = 0.4;
	private showedJoyDisabledError = false;
	private showedJoyIndexNull = false;
	private showedJoyIndex = false;

	/*
	 * constructor for joyAxisBinding
	@param:joy - the Joy for this binding, can be null.
	@param:joyAxis - the axis number, can be null.
	@param:flightAxis - the flight axis.
	 */
	public constructor(joy:Joy|null, joyAxis: number|null, flightAxis:Axis){
		this.joy = joy;
		this.joyAxis = joyAxis;
		this.flightAxis = flightAxis;
	}

	/*
	this function check if the binding is enabled, if not it ends, if it is, it gets the axis value for the stored axis for the stored joy, and sets the flight axis value to this value. 
	 */
	public tick(deltaTime:number) {
		deltaTime;//neede to fix build errors.
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
	        if ((!gamepad) || (gamepad == null)) {
//            this.flightAxis.setValue(0);
			console.error("gamepad in binding is null");
       		     return;
        	}
		//end if joyAxis is null.
		if (this.joyAxis == null) {
			return;
		}
		//set the axis value from the joyAxis.
	        const axisValue = gamepad.axes[this.joyAxis] ?? 0;
		//debug tracker to prevent spam and track axis value.
		if (this.tempAxisValue != axisValue) {
//       		  console.log("gamepad ", joyId, " axis " , this.joyAxis, " value ", axisValue);
		  this.tempAxisValue = axisValue;
		}
		// set the flight axis value from the local axis value.
	        this.flightAxis.setValue(axisValue);
 
	}
}
