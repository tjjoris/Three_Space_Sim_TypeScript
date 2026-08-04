/**
KeybindsMenuContent.tsx
@Author: Luke Johnson
The menu content for the keybinds. First reads cookies to get the keybinds, primarily basing them off joystick name.
Allows setting keybinds through child components.
Has functions for setting all the keybinds and passes them to child compoenents.
Stores the keybinds in states.
Keybinds are linked to the axes.
 */
import { useState, useSyncExternalStore } from "react";
import useInputDiffStore from "../../stores/UseInputDiffStore";
import InputDiffState from "../../input/inputDiffState";
import JoyAxisInputDiffValueReporter from "../../input/joyAxisInputDiffValueReporter";
import { getInputDiffsComparerForAllJoys } from "../../main";

type BindType = { id: number, name : string}; 

export default function KeybindsMenuContent() {
	
	const diffState: JoyAxisInputDiffValueReporter | null = useInputDiffStore(InputDiffState.getInstance());

	const [pitchBind, setPitchBind] = useState<BindType>({ id: 0 , name: "this " });

	/*
	 *function for returning input diff values to react output.
	 */
	function returnDiff() {
		if ((diffState) && (diffState.getAxisId() != null)) {
		return (
			<>
				binding {pitchBind.name} to Joy: {diffState.getJoyName()} {diffState.getJoyId()} axis: {diffState.getAxisId()}
			</>
		)

		/*
		 * main return function of this compoennt
		 */
		}
		return (
			<>
							no input
				</>
		)
	}

	return (
		<>
		<button className="menu-button" onClick={getInputDiffsComparerForAllJoys().enable} >
			Activate
			</button>

			<button className="menu-button" onClick={getInputDiffsComparerForAllJoys().disable} >
			Deactivate	
			</button>


		{returnDiff()}
		</>
	)
}
