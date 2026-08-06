/*	
 *bindingsStorage.ts
 @Author: Luke Johnson
 This class stores all bindings, bindings are class objects.
 when a binding is set it tells this class to set it based on the flight axis name, joy ref id, and axis id.
 After a binding is set, this class calls BindingsToStateConverter to convert stored bindings to a state, then sets the state in BindingsAndJoysState.
 BindingsTicker has not relation to this, they store seperate arrays of the same bindings.
 I chose to do this for for optimization.
 */
import JoyAxisBinding from "./joyAxisBinding";
import type {BindingType } from "../types/bindingType";

export default class BindingsStorage {

	private bindings: JoyAxisBinding[]

	constructor (bindings: JoyAxisBinding[]) {
		this.bindings = bindings;
	}

	public getBindingsAsBindingsType() {
		
		let bindings: BindingType[] = []
		for (let bindingsIndex = 0; bindingsIndex  < this.bindings.length; bindingsIndex ++) {

	const binding = this.bindings[bindingsIndex];
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
