/**
 *bindingsType.ts
 @Author: Luke Johnson
 * a type to store all bindings.
 */
export type JoysAndBindingsType = {bindings: [{ flightAxis: string, refId: number, joyAxisId: number}], joys: [{refId: number, joyName: string, joyId: number}]}; 
