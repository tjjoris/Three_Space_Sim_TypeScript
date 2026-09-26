import type {FlightAxisType} from "../types/flightAxisType";
import type {InputType} from "../types/inputType";
import JoyAxisBinding from "../input/joyAxisBinding";
import Joy from "../input/joy";
import setCookie from "../cookies/setCookie";

export default class BindingsAndJoysCookieSetter {
	
	/*
	 * uses the flightAxis paramater and gets the stored binding and sets it to cookies.
	 */
	public setJoyAxisBindingToCookies(flightAxis: FlightAxisType, joyAxisBinding: JoyAxisBinding) {
		//set the number of days the cookies should last
		const expDays: number = 365;
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
