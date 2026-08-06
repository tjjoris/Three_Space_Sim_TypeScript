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

}
