import Joy from "../input/joy";
import type { FlightAxisType } from "../types/flightAxisType";
import type { InputType } from "../types/inputType";
import BindingsStorage from "../input/bindingsStorage";
import { FLIGHT_AXIS_CONST } from "../consts/flightAxisConst";
import { COOKIE_CONSTS } from "../consts/cookieConsts";
import getCookie from "./getCookie";
import JoysStorage from "../input/joysStorage";
/*
 *bindingsAndJoysCookieGetter.ts
 @Author: Luke Johnson
 * this class goes through each flight axis and gets the input type, joy axis, joy name, joy index, and joy ref id.
 * it then gets the joys that match th name from the joysStorage, and calls setBinding in bindingsStorage.
 */

export default class BindingsAndJoysCookieGetter {
	private joysStorage: JoysStorage;

	public constructor (joysStorage: JoysStorage) {
		this.joysStorage = joysStorage;
	}
	/*
	 * is passed the flightAxisType and uses joysStorage to get a joy based on the joyName and refId of the joy in the cookies for this flightAxis
	 * returns the joy.
	 */
	public getJoyByFlightAxis(flightAxis: FlightAxisType): Joy | null {
		const joyNameCookieKey: string = flightAxis + COOKIE_CONSTS.joyName;
		const joyName: string = getCookie(joyNameCookieKey);
		if (joyName == "") {
			return null;
		}
		const joyIdCookieKey: string = flightAxis + COOKIE_CONSTS.joyIndex;
		const joyId: string  = getCookie(joyIdCookieKey);
		if (joyId == "") {
			return null;
		}
		//convert string to number
		const joyIdNumber: number = +joyId;
		let joy: Joy | null = this.joysStorage.getJoyByNameAndId(joyName, joyIdNumber);
		if (joy != null) {
			return joy;
		}
		joy = this.joysStorage.getJoyByName(joyName);
		if (joy == null) {
			joy = this.joysStorage.addNewJoy(joyIdNumber, joyName, false);
		}
		return joy;
	}

	/*
	 * get if bining is a joy axis binding
	 */
	public getIsJoyAxisBindingByFlightAxis(flightAxis: FlightAxisType): boolean {
	    flightAxis;
	    const cookieKey: string = flightAxis + COOKIE_CONSTS.type;
	    const inputType: string = getCookie(cookieKey);
	    //if (axisType ==  
	    return false
	}



}
