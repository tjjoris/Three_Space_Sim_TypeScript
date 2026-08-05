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
import { setDiffEnabled } from "../../main";

type BindType = { id: number, name : string}; 

export default function KeybindsMenuContent() {
	
	const diffState: JoyAxisInputDiffValueReporter | null = useInputDiffStore(InputDiffState.getInstance());
	const [isButtonActive, setIsButtonActive] = useState(false);

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

	function callDisableDiff() {
		setIsButtonActive(false);
		setDiffEnabled(false);
	}

	function callEnableDiff() {
		setIsButtonActive(true);
		setDiffEnabled(true);
	}

	function returnActivatableButton() {
		if (isButtonActive) {
		return (
			<>
			<div
				className = "menu-button"
			>
				<button 
					className = "menu-button"
					onClick={callEnableDiff} >
				Deactivate	
				
			</button>
			<div		
				onTransitionEnd={callDisableDiff}
		className="diff-button-disabled"/>

			</div>
			</>
		)}
		return (
			<>
			<div
				className = "menu-button"
			>
				<button
				className = "menu-button"
				onClick={callEnableDiff} 
			>
				Activate	
							</button>
					<div
					onTransitionEnd={callDisableDiff}
					className="diff-button-enabled"  />

			</div>
			</>
		)
	}



	return (
		<>
		{ returnActivatableButton() }
		is button active { isButtonActive ? "true": "false" }
		</>
	)
}
