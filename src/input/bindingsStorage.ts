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
		this.setStoredBindingToCookies(flightAxis);
		this.setBindingsToState();
	}
	
	/*
	 * uses the flightAxis paramater and gets the stored binding and sets it to cookies.
	 */
	public setStoredBindingToCookies(flightAxis: FlightAxisType) {
		//set the number of days the cookies should last
		const expDays: number = 365;
		//get the joyAxisBinding for this binding
		const joyAxisBinding: JoyAxisBinding = this.bindingsRecord[flightAxis];
		const joy: Joy | null = joyAxisBinding.getJoy();
		if (joy == null) {
			return;
		}
		this.setAxisNumberCookie(flightAxis, joyAxisBinding, expDays);
		this.setInputTypeCookie(flightAxis, "joyAxis", expDays);
		this.setJoyNameCookie(flightAxis, joy, expDays);
		this.setJoyIdCookie(flightAxis, joy, expDays);
		this.setJoyRefIdCookie(flightAxis, joy, expDays);
	}

	/*
	 * set the axis number cookie
	 */
	public setAxisNumberCookie(flightAxis: FlightAxisType, joyAxisBinding: JoyAxisBinding, expDays: number) {
		//make the cookie key for the flightAxis axis id
		const axisCookieKey: string = flightAxis + "axis";
		//get the axis number id for the binding
		const axisNumber: number | null = joyAxisBinding.getAxisId();
		if (axisNumber == null) {
			return;
		}
		//convert the axis number to a string
		const axisNumString: string = axisNumber.toString();
		//set the axis number to a cookie
		setCookie(axisCookieKey, axisNumString, expDays);	
	}

	/*
	 * set the input type cookie
	 */
	public setInputTypeCookie(flightAxis: FlightAxisType, inputType: InputType, expDays: number) {
		//parse the cookie key for the input type
		const inputTypeCookieKey: string = flightAxis + "Type";
		//set the input type for the flight axis to a cookie
		setCookie(inputTypeCookieKey, inputType, expDays);
	}

	/*
	 * set joy name cookie
	 */
	public setJoyNameCookie(flightAxis: FlightAxisType, joy: Joy, expDays: number) {
		//parse the cookie key for the joyName
		const joyNameCookieKey: string = flightAxis + "JoyName"
		//get the joy name string
		const joyName: string | null = joy.getJoyName();
		if (joyName == null) {
			return;
		}
		//set the cookie for the joy name
		setCookie(joyNameCookieKey, joyName, expDays);
	}

	/**
	 *set the joy id(index) cookie
	 */
	public setJoyIdCookie(flightAxis: FlightAxisType, joy: Joy, expDays: number) {
		//parse the cookie key for the joyIndex
		const joyIndexCookieKey: string = flightAxis + "JoyIndex";
		//get the joyId
		const joyIdNumber: number | null = joy.getJoyId();
		if (joyIdNumber == null) {
			return;
		}
		const joyIdString: string = joyIdNumber.toString();
		//set the cookie for the joyId(index)
		setCookie(joyIndexCookieKey, joyIdString, expDays);
	}

	/*
	 * set the joy ref id cookie
	 */
	public setJoyRefIdCookie(flightAxis: FlightAxisType, joy: Joy, expDays: number) {
		//parse the cookie key for the joyRefId
		const joyRefIdCookieKey: string = flightAxis + "JoyRefId";
		//get the joyRefId
		const joyRefIdNumber: number | null = joy.getJoyRefId();
		if (joyRefIdNumber == null) {
			return;
		}
		//set the joy ref id number to a string
		const joyRefIdString: string = joyRefIdNumber.toString();
		//set the cookie for the joy ref id
		setCookie(joyRefIdCookieKey, joyRefIdString, expDays);
	}
}
