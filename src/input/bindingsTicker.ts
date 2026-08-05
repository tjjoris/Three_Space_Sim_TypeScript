import type Tickable from "../game/tickable";
import type { JoysAndBindingsType } from "../types/joysAndBindingsType";
import JoyAxisInputDiffValueReporter from "./joyAxisInputDiffValueReporter";
/*
bindingTicker.ts
@Author: Luke Johnson
this class ticks all the eligable joy bindings. it is called by the main ticker.
Each binding gets the axis value and sets the flight axis. 
 */
export default class BindingsTicker implements Tickable{
	private tickableBindings:Tickable[] = [];
	
	/*
	 *add a tickable to the array.
	 */
	public addTickable(tickable: Tickable) {
		this.tickableBindings.push(tickable);
	}

	/*
	 *the tick function called by the main ticker, which loops through every tickable in the array.
	 */
	public tick(dt:number) {
		this.tickableBindings.forEach((tickable:Tickable) => {
			tickable.tick(dt);
		})	
	}

	public getBindingsAsObject(): JoysAndBindingsType {
		this.tickableBindings.forEach((tickable: Tickable ) => {
			if (tickable instanceof JoyAxisInputDiffValueReporter) {
			let binding =  tickable  as JoyAxisInputDiffValueReporter;

		}
	}
}
