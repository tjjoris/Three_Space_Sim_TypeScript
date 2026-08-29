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

export default function KeybindsMenuContent() {

	//the context passed from App.tsx
	const gameStateContext = useContext(GameStateContext);

	//the const for storing the value set by the binding state.
		const gameStateType: GameStateType | null = UseGameStateStore(gameStateContext);
		const bindingsState: BindingType[] | null = gameStateType.bindings;


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
			bindingsDomToReturn.push(<div>
					<KeybindButton flightAxis={binding.flightAxis}/>

						 </div>);
		}
			return (<>
				
					{bindingsDomToReturn}
					</>)


	}
	console.log("game state context in react", GameStateContext);
	return (
		<>
		{ returnBindings() }
		</>
	)
}
