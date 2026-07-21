/*
inputsFactory.ts
@Author:Luke Johnson
This is the factory class for creating all the instances of the classes needed for the inputs 
namespace. each function instantiates a concrete instnace of a class, and return it.
sometimes an array of instances.
 */
import Joy from "./joy";
import JoyAxisBinding from "./joyAxisBinding";
import Axis from "../axes/axis"
import JoyConnector from "./joyConnector";
import BindingsTicker from "./bindingsTicker";

export default class InputsFactory{

	private joys:Joy[];
	private joyAxisBindings:JoyAxisBinding[];
	private joyConnector:JoyConnector;
	private bindingsTicker:BindingsTicker;

	constructor(pitchAxis: Axis, 
		    rollAxis: Axis, 
		    verticalAxis: Axis,
		   horizontalAxis: Axis) {
		let joyOne = new Joy(null, null, false, null);
		let joyTwo = new Joy(null, null, false, null);
		this.joys = [joyOne, joyTwo]; 

		let pitchBinding = new JoyAxisBinding(joyOne, 0, pitchAxis);
		let rollBinding = new JoyAxisBinding(joyOne, 1, rollAxis);
		let verticalBinding = new JoyAxisBinding(joyOne, 0, verticalAxis);
		let horizontalBinding = new JoyAxisBinding(joyOne, 1, horizontalAxis);
		this.joyAxisBindings = [pitchBinding, 
			rollBinding, 
			verticalBinding, 
			horizontalBinding];
		this.joyConnector = new JoyConnector(this.joys);
		this.bindingsTicker = new BindingsTicker();
	}

	/*
	get the joys that are instantiated by this factory. normally they would be
	blank and set by the cookies, for testing, they have values set.
	 */
	public getJoys():Joy[]{
		return this.joys;
	}

	getBindings():JoyAxisBinding[] {
		return this.joyAxisBindings;
	}

	getJoyConnector():JoyConnector {
		return this.joyConnector;
	}
	
	getBindingsTicker():BindingsTicker {
		return this.bindingsTicker;
	}
}
