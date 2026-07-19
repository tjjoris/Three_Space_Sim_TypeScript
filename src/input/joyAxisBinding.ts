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

	private constructor(joy:Joy|null, joyAxis: number|null, flightAxis:Axis){
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
			return;
		}
		//end if joy is not enabled
		if (!this.joy.getEnabled) {
			return;
		}
		//store joyId in a variable so it does not change in this scope.
		let joyId:number|null = this.joy.getJoyId();
		//end if joyId is null
		if (joyId == null) {
			return;
		}
		//set get gamePad from joy.
	        const gamepad = this.joy.getGamepad();
	        if (!gamepad) {
//            this.flightAxis.setValue(0);
       		     return;
        	}
		//end if joyAxis is null.
		if (this.joyAxis == null) {
			return;
		}
		//set the axis value from the joyAxis.
	        const axisValue = gamepad.axes[this.joyAxis] ?? 0;
       		 // console.log("gamepad axis value ", axisValue);
		// set the flight axis value from the local axis value.
	        this.flightAxis.setValue(axisValue);
 
	}
}
