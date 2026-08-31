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
import type {FlightAxisType} from "../types/flightAxisType";
import BindingsToStateConverter from "./bindingsToStateConverter";
import GameState from "../ui/menu/gameState";

export default class BindingsStorage {

	private bindings: JoyAxisBinding[];
	private bindingsRecord: Record<FlightAxisType, JoyAxisBinding | null> = {

		pitch: null,
		roll: null,
		yaw: null,
		forward: null,
		vertical: null,
		horizontal: null
	};
	private bindingsToStateConverter: BindingsToStateConverter;
	private gameState: GameState;
	

	public constructor (bindings: JoyAxisBinding[], bindingsToStateConverter: BindingsToStateConverter, gameState: GameState) {
		this.bindings = bindings;
		//set the bindingsRecord, giving it a key of the flight axis, and value of the JoyAxisBinding
		bindings.forEach((binding: JoyAxisBinding) => {
			const flightAxis = binding.getFlightAxis();
			if (flightAxis != null) {
			this.bindingsRecord[flightAxis] = binding;
			}
		});
		this.bindingsToStateConverter = bindingsToStateConverter;
		this.gameState = gameState;
		this.setBindingsToState();
	}

	/*
	 * set bindings to state sets the stored bindings to the state class.
	 */
	public setBindingsToState() {
		const bindingsType: BindingType[] = this.bindingsToStateConverter.convertJoyAxisBindingsRecordToBindingsType(this.bindingsRecord);
		this.gameState.setStateBindings(bindingsType);
		console.log("game state ", this.gameState);
	}

	/*
	 * set a binding passing it the flight axis, joystick ref id, joy axis, and joy id.
	 */
	

}
