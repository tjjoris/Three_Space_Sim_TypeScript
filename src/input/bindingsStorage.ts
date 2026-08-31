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
       private bindingsRecord: Record<FlightAxisType, JoyAxisBinding>;
	private bindingsToStateConverter: BindingsToStateConverter;
	private gameState: GameState;
	

	/*
	 *constrcutor is passed the bindingsToStateconverter, gameState, and bindingsRecord. 
	 */
	public constructor (bindingsToStateConverter: BindingsToStateConverter, gameState: GameState, bindingsRecord: Record<FlightAxisType, JoyAxisBinding>) {
	       this.bindingsRecord = bindingsRecord;
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
	public setBinding(flightAxis: FlightAxisType, joyRefId: number, joyAxis: number) {
		const joyAxisBinding = this.bindingsRecord[flightAxis];
		joyAxisBinding.setJoyAxisBinding(joyAxis);
		this.setBindingsToState();
	}
	

}
