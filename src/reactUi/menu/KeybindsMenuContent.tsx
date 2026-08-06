/**
KeybindsMenuContent.tsx
@Author: Luke Johnson
component for displaying keybinds. is updated by bindingsAndJoysState thorugh use sync external store.
Allows setting keybinds through child components.
 */
import UseBindingsStore from "../../stores/UseBindingsStore";
import KeybindButton from "./KeybindButton";

export default function KeybindsMenuContent() {
	return (
		<>
			<KeybindButton />
		</>
	)
}
