import type {FlightAxisType}  from "./flightAxisType"
/**
 *bindingsType.ts
 @Author: Luke Johnson
 * a type to store all bindings.
 */
export type JoysAndBindingsType = {bindings: [{ flightAxis: FlightAxisType, refId: number, joyAxisId: number}], joys: [{refId: number, joyName: string, joyId: number}]}; 
