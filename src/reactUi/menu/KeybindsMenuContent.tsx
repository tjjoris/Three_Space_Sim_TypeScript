/**
KeybindsMenuContent.tsx
@Author: Luke Johnson
component for displaying keybinds. is updated by bindingsAndJoysState thorugh use sync external store.
Allows setting keybinds through child components.
 */
import UseGameStateStore from "../../stores/UseGameStateStore";
import { useContext } from "react";
import { GameStateContext } from "../contexts/GameStateContext";
import KeybindButton from "./KeybindButton";
import type {BindingType} from "../../types/bindingType";
import type { GameStateType } from "../../types/gameStateType";
import Joy from "../../input/joy";

export default function KeybindsMenuContent() {

	//the context passed from App.tsx
	const gameStateContext = useContext(GameStateContext);

	//the const for storing the value set by the binding state.
		const gameStateType: GameStateType | null = UseGameStateStore(gameStateContext);
		const bindingsState: BindingType[] | null = gameStateType.bindings;
		/**
		const joys: Joy[] = gameStateType.joys; 
		let bindingsTouse: { [bindingType: BindingType, joy: Joy] } = [];
		/**
		 * loop through each binding and set a binding, and a joy.
		 
		for (let bindingsIndex 
		     */


	/*
	 *return react Dom element based on the bindingsState, if it is null return an empty react element.
	 */
	function returnBindings() {
		if ((bindingsState == null)) {
			return (<></>);
		}
		let bindingsToReturn: BindingType[] = []
		let bindingsDomToReturn = [];
		for (
			let bindingsIndex = 0;
			bindingsIndex < bindingsState.length;
			bindingsIndex ++
		) {
			const binding:BindingType = bindingsState[bindingsIndex];
			bindingsToReturn.push(binding);
			bindingsDomToReturn.push(<div key={ bindingsIndex } >
					<KeybindButton flightAxis={binding.flightAxis} binding={binding}/>

						 </div>);
		}
			return (<>
				
					{bindingsDomToReturn}
					</>)


	}
	//console.log("game state context in react", GameStateContext);
	return (
		<>
		{ returnBindings() }
		</>
	)
}
