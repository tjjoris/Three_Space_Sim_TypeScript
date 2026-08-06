import type {FlightAxisType}  from "./flightAxisType"
/**
 *bindingType.ts
 @Author: Luke Johnson
 * a type to store all bindings.
 */
export type BindingType = { flightAxis: FlightAxisType, refId: number | null, axisId: number | null};
