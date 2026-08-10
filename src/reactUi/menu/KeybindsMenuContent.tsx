/**
KeybindsMenuContent.tsx
@Author: Luke Johnson
component for displaying keybinds. is updated by bindingsAndJoysState thorugh use sync external store.
Allows setting keybinds through child components.
 */
import UseBindingsStore from "../../stores/UseBindingsStore";
import KeybindButton from "./KeybindButton";
import type {BindingType} from "../../types/bindingType";
import BindingsAndJoysState from "../../input/bindingsAndJoysState";

export default function KeybindsMenuContent() {
	//the const for storing the value set by the binding state.
	const bindingsState: BindingType[] | null = UseBindingsStore(BindingsAndJoysState.getInstance());

	/*
	 *return react Dom element based on the bindingsState, if it is null return an empty react element.
	 */
	function returnBindings() {
		if ((bindingsState == null)) {
			return (<></>);
		}
		for (
			let bindingsIndex = 0;
			bindingsIndex < bindingsState.length;
			bindingsIndex ++
		) {
			return (<>
					{bindingsState[bindingsIndex].flightAxis}
					</>)
		}


	}
	return (
		<>
			<KeybindButton />
		</>
	)
}
