/*
 *flightAxis.ts
 @Author: Luke Johnson
 inherits form axis.
 the axis used for interacting with the controls of the ships. it inherits from axis, and has an added parameter which stores the flight axis name.
 */
//import clamp from "../helpers/clamp";
import Axis from "./axis";
import type {FlightAxisType} from "../types/flightAxisType";
export default class FlightAxis extends Axis{
	private flightAxisName: FlightAxisType ;

    constructor(deadZone: number, saturation: number, inverse: boolean, flightAxisName: FlightAxisType) {
	super(deadZone, saturation, inverse);
	this.flightAxisName = flightAxisName;
    }

    public getFlightAxisName():FlightAxisType {
	    return this.flightAxisName;
    }

    public setFlightAxisName(flightAxisName: FlightAxisType) {
	    this.flightAxisName = flightAxisName;
    }
}
