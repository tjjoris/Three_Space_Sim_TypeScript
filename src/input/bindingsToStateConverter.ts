/*
 * bindingsToStateConverter.ts
 @Author: Luke Johnson
this class simply converts from a JoyAxisBinding array  to a BindingType array. also for the singluar objects.
 */

import JoyAxisBinding from "./joyAxisBinding";
import type { BindingType } from "../types/bindingType";
import type { FlightAxisType } from "../types/flightAxisType";

export default class BindingsToStateConverter {
	/*
	 * is passed a Record of flight axis keys and JoyAxisBindings, loops through each one and returns an array of BindingType[].
	 */
	public convertJoyAxisBindingsRecordToBindingsType(bindingsRecord: Record<FlightAxisType, JoyAxisBinding | null>): BindingType[] {
		//console.log("in converter, bindings record ", bindingsRecord);
		//set the bindingType array to return.
	let bindingType: BindingType[] = [];
	//loop through the record
	for (const [key, value] of Object.entries(bindingsRecord)){
		//skip this iteration if the value is null.
		if (value == null) {
			continue
		};
		//call the key to remove build error.
		key;
		const binding = this.convertJoyAxisBindingToBindingType(value);
		//if the bindingType value is not null push it into the bindingType array.
		//console.log("binding from converter ", binding);
		if (binding != null) {
			bindingType.push(binding);
		}
	}
	//console.log("in converter bindingType to return ", bindingType);
	return bindingType;
	}

	/*
	 *is passed an array of JoyAxisBindings, loops through each one, and runs convertJoyAxisBindingToBindingType on it, and if the return value is null adds it to an array, then returns that array.
	 */

	public convertJoyAxisBindingsToBindingsType(joyAxisBindings: JoyAxisBinding[]): BindingType[] {
		let bindings: BindingType[] = []
		for (let bindingsIndex = 0; bindingsIndex  < joyAxisBindings.length; bindingsIndex ++) {

	const binding = joyAxisBindings[bindingsIndex];
				if (binding == null) {
					continue;
				}
				const bindingOfType = this.convertJoyAxisBindingToBindingType(binding);
				if (bindingOfType == null) {
					continue;
				}
			bindings.push(bindingOfType); 
		}
		return bindings;
	}

	/*
	 *is passed the JoyAxisBinding class object, and converts it to a bindingType object type.
	 */
	public convertJoyAxisBindingToBindingType(joyBindingObject:JoyAxisBinding | null): BindingType | null {
		//console.log("in converter ", joyBindingObject);
			if (joyBindingObject == null) {
				console.log("joy binding object is null");
				return null;
			}
			const axisId = joyBindingObject.getAxisId();
			const axisName = joyBindingObject.getFlightAxis();
			const refId = joyBindingObject.getJoyRefId();
			const binding : BindingType = {flightAxis : axisName, refId : refId, axisId : axisId};
			//console.log("in converter ", axisId);
			return binding;

	}

}
