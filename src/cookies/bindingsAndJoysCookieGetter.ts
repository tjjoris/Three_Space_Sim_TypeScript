import Joy from "../input/joy";
import type { FlightAxisType } from "../types/flightAxisType";
import BindingsStorage from "../input/bindingsStorage";
import { FLIGHT_AXIS_CONST } from "../consts/flightAxisConst";
import { COOKIE_CONSTS } from "../consts/cookieConsts";
import getCookie from "./getCookie";
/*
 *bindingsAndJoysCookieGetter.ts
 @Author: Luke Johnson
 * this class goes through each flight axis and gets the input type, joy axis, joy name, joy index, and joy ref id.
 * it then gets the joys that match th name from the joysStorage, and calls setBinding in bindingsStorage.
 */

export default class BindingsAndJoysCookieGetter {

	/*
	 * is passed the flightAxisType and uses joysStorage to get a joy based on the joyName and refId of the joy in the cookies for this flightAxis
	 * returns the joy.
	 */
	public getJoyFromCookiesByFlightAxis(flightAxis: FlightAxisType): Joy {
		const joyNameCookieKey: string = flightAxis + COOKIE_CONSTS.joyName;
		const joyName: string = getCookie(joyNameCookieKey);
		if (joyName == "") {
			return;
		}


	}

}
