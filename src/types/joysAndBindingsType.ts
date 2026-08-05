import type {BindingsType} from "./bindingsType";
/**
 *bindingsType.ts
 @Author: Luke Johnson
 * a type to store all bindings.
 */
export type JoysAndBindingsType = {bindings: BindingsType, joys: [{refId: number, joyName: string, joyId: number}]}; 
