import type {BindingType} from "./bindingType";
import JoyAxisInputDiffValueReporter from "../input/joyAxisInputDiffValueReporter";
//import type {JoysAndBindingsType} from "./joysAndBindingsType";
/**
 *gameStateType.ts
 @Author: Luke Johnson
 * A type to store all game state data, including:
 * bindings, input diffs, inversion settings, phone orientation, touch vjoy used, and popups.
 */
export type GameStateType = {
	//joys and bindings might replace bindings array, and joys array.
	//or just remove joys and bindings type
	//joysAndBindings: JoysAndBindingsType,
	bindings: BindingType[], 
	//joys: [{refId: number, joyName: string, joyId: number}],
	//input diff for the input difference used by bindings setter.
	inputDiff: JoyAxisInputDiffValueReporter | null 
	
}; 
