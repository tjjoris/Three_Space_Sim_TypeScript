import type Tickable from "../game/tickable";
import type { JoysAndBindingsType } from "../types/joysAndBindingsType";
//import JoyAxisInputDiffValueReporter from "./joyAxisInputDiffValueReporter";
import JoyAxisBinding from "./joyAxisBinding";
import type {BindingType} from "../types/bindingType";
/*
bindingTicker.ts
@Author: Luke Johnson
this class ticks all the eligable joy bindings. it is called by the main ticker.
Each binding gets the axis value and sets the flight axis. 
 * TODO: make bindings/ tickables in constructor
 * TODO: make get bindings object return the proper objet, or at least an array of bindings type.
 *
 */

export default class BindingsTicker implements Tickable{
	private tickableBindings:Tickable[] = [];
	//private joysAndBindingsType: JoysAndBindingsType;
	
	/*
	 *add a tickable to the array.
	 */
	public addTickable(tickable: Tickable) {
		this.tickableBindings.push(tickable);
	}

	/*
	 *the tick function called by the main ticker, which loops through every tickable in the array.
	 */
	public tick(dt:number) {
		this.tickableBindings.forEach((tickable:Tickable) => {
			tickable.tick(dt);
		})	
	}

	/*
	 *gets all bindings and joys as an object of type JoysAndBindingsType.
	 */
	public getBindingsAsObject(): BindingType[] {
			let bindings: BindingType[] = []
		for (let tickableIndex = 0; tickableIndex  < this.tickableBindings.length; tickableIndex ++) {
			const tickable = this.tickableBindings[tickableIndex];
			if (!(tickable instanceof JoyAxisBinding)) {			
				continue;
			}
				const binding = this.convertJoyAxisBindingToBindingType(tickable as JoyAxisBinding);
				if (binding == null) {
					continue;
				}
			bindings.push(binding); 
		}
		return bindings;
	}


	/*
	 *is passed the JoyAxisBinding class object, and converts it to a bindingType object type.
	 */
	private convertJoyAxisBindingToBindingType(joyBindingObject:JoyAxisBinding): BindingType | null {
			if ((joyBindingObject == null) || (joyBindingObject.getAxisId == null)) {
				return null;
			}
			const axisId = joyBindingObject.getAxisId();
			const axisName = joyBindingObject.getFlightAxis();
			const refId = joyBindingObject.getJoyRefId();
			if ((refId == null) || (axisId == null)) {
				return null;
			}
			const binding : BindingType = {flightAxis : axisName, refId : refId, axisId : axisId};
			return binding;

	}

}
