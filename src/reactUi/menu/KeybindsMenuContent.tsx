/**
KeybindsMenuContent.tsx
@Author: Luke Johnson
The menu content for the keybinds. First reads cookies to get the keybinds, primarily basing them off joystick name.
Allows setting keybinds through child components.
Has functions for setting all the keybinds and passes them to child compoenents.
Stores the keybinds in states.
Keybinds are linked to the axes.
 */
import { useState } from "react";

type BindType = { id: number, name : string}; 

export default function KeybindsMenuContent() {

	const [pitchBind, setPitchBind] = useState<BindType>({ id: 0 , name: "this " });
	return (
	<div className="menu-content">
		<h1>
			Keybinds
		</h1>
		<div >
			pitch bound to: { pitchBind.name }
		</div>
	</div>
	)
}
