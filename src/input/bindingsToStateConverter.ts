/*
 * bindingsToStateConverter.ts
 @Author: Luke Johnson
this class simply converts from a JoyAxisBinding array  to a BindingType array. also for the singluar objects.
 */

import JoyAxisBinding from "./joyAxisBinding";
import type { BindingType } from "../types/bindingType";

export default class BindingsToStateConverter {

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
