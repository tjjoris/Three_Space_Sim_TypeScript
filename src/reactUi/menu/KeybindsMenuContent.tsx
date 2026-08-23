/**
KeybindsMenuContent.tsx
@Author: Luke Johnson
component for displaying keybinds. is updated by bindingsAndJoysState thorugh use sync external store.
Allows setting keybinds through child components.
 */
import UseBindingsStore from "../../stores/UseBindingsStore";
import useGameStateStore from "../../stores/UseGameStateStore";
import { useContext } from "react";
import { GameStateContext } from "../contexts/GameStateContext";
import KeybindButton from "./KeybindButton";
import type {BindingType} from "../../types/bindingType";
import BindingsAndJoysState from "../../input/bindingsAndJoysState";

export default function KeybindsMenuContent() {
	//the const for storing the value set by the binding state.
	const bindingsState: BindingType[] | null = UseBindingsStore(BindingsAndJoysState.getInstance());

	//the context passed from App.tsx
	const gameStateContext = useContext(GameStateContext);
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
			//if ((binding == null) || (binding.flightAxis == null)) 
			bindingsToReturn.push(binding);
			bindingsDomToReturn.push(<div>{binding.flightAxis}</div>);
		}
			return (<>
					{bindingsDomToReturn}
					</>)


	}
	return (
		<>
		{ returnBindings() }
			<KeybindButton />
		</>
	)
}
