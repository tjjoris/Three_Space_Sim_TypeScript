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
import type {InputType} from "../types/inputType";
import BindingsToStateConverter from "./bindingsToStateConverter";
import GameState from "../ui/menu/gameState";
import Joy from "./joy";
import setCookie from "../cookies/setCookie";
import BindingsAndJoysCookieSetter from "../cookies/bindingsAndJoysCookieSetter";

export default class BindingsStorage {
	private bindingsAndJoysCookieSetter;
       private bindingsRecord: Record<FlightAxisType, JoyAxisBinding>;
	private bindingsToStateConverter: BindingsToStateConverter;
	private gameState: GameState;
	

	/*
	 *constrcutor is passed the bindingsToStateconverter, gameState, and bindingsRecord. 
	 */
	public constructor (bindingsAndJoysCookieSetter: BindingsAndJoysCookieSetter, bindingsToStateConverter: BindingsToStateConverter, gameState: GameState, bindingsRecord: Record<FlightAxisType, JoyAxisBinding>) {
		this.bindingsAndJoysCookieSetter = bindingsAndJoysCookieSetter;
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
		//console.log("bindingsType ", bindingsType);
		this.gameState.setStateBindings(bindingsType);
		this.gameState.notify();
	}

	/*
	 * set the binding by passing it the flight axis, and joy.
	 */
	public setBinding(flightAxis: FlightAxisType, joyAxis: number, joy: Joy | null) {
		if (joy == null) {
			console.log("joy is null.");
			return;
			
		}
		const joyAxisBinding = this.bindingsRecord[flightAxis];
		joyAxisBinding.setJoyAxisBinding(joyAxis);
		joyAxisBinding.setJoy(joy);
		console.log("joy axis binding in bindings storage: ", joyAxisBinding);
		this.setStoredBindingToCookiesFromFlightAxis(flightAxis);
		this.setBindingsToState();
	}
	
	/*
	 * uses the flightAxis paramater and gets the stored binding and sets it to cookies.
	 */
	public setStoredBindingToCookiesFromFlightAxis(flightAxis: FlightAxisType) {
		//get the joyAxisBinding for this binding
		const joyAxisBinding: JoyAxisBinding = this.bindingsRecord[flightAxis];
		this.bindingsAndJoysCookieSetter.setJoyAxisBindingToCookies(flightAxis, joyAxisBinding);
	}

}
