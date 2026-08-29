/**
KeybindButton.tsx
@Author: Luke Johnson
 * activates when pressed, telling typescript to activate input diff, which reads joystick inputs.
 updates the inputDiff from the state using useSyncExternalStore.
 */
import { useState} from "react";
import useInputDiffStore from "../../stores/UseInputDiffStore";
import InputDiffState from "../../input/inputDiffState";
import JoyAxisInputDiffValueReporter from "../../input/joyAxisInputDiffValueReporter";
import { setDiffEnabled, setBinding } from "../../main";
import type { FlightAxisType } from "../../types/flightAxisType";

type BindType = { id: number, name : string}; 

type Props = {
	flightAxis: FlightAxisType;
}
export default function KeybindButton(props: Props) {
	
	const diffState: JoyAxisInputDiffValueReporter | null = useInputDiffStore(InputDiffState.getInstance());
	const [isButtonActive, setIsButtonActive] = useState(false);

	const [pitchBind, setPitchBind] = useState<BindType>({ id: 0 , name: "this " });

	/*
	 *function for returning input diff values to react output.
	 */
	function returnDiff() {
		if ((diffState) && (diffState.getAxisId() != null)) {
			//diffState is set so print binding values.
		return (
			<>
				binding {pitchBind.name} to Joy: {diffState.getJoyName()} {diffState.getJoyId()} axis: {diffState.getAxisId()}
			</>
		)
		//diffState is not set so print no input.
		}
		return (
			<>
							no input
				</>
		)
	}
	//call disable off for diabling inputDiff
	function callDisableDiff() {
		setIsButtonActive(false);
		setDiffEnabled(false);
	}
	//call disable on for enabling input diff.
	function callEnableDiff() {
		setIsButtonActive(true);
		setDiffEnabled(true);
	}

	/*
	 * the binding setting button css animation has finished, so the binding should be set if one has been inputted.
	 */
	function bindingButtonFinished() {
		callDisableDiff();
		//check that diffstate isnot null.
		console.log("about to call main to set binding ");
		if (diffState == null) {
			return; }
			//set the binding in the game.
		setBinding(props.flightAxis, diffState.getJoyName(), diffState.getJoyId(), diffState.getAxisId());
	}

	/*
	 * return an activatable button with a different class name, the class name animates it, and when the animation finishes, calls callDisableDiff.
	 */
	function returnActivatableButton() {
		if (isButtonActive) {
			//button is active
		return (
			<>
				<button 
					className = "menu-button"
					//onClick={callEnableDiff} 
				>
					Input Binding	
				<div		
				onTransitionEnd={bindingButtonFinished}
		className="diff-slider diff-button-disabled"/>
			</button>
						</>
		)}
		//button is inative
		return (
			<>
				<button
					className = "menu-button"
					onClick={callEnableDiff} 
				>
				{props.flightAxis} Activate	
					<div
					//onTransitionEnd={bindingButtonFinished}
					className="diff-slider diff-button-enabled"  />
				</button>
			</>
		)
	}


	return (
		<>
		{ returnActivatableButton() }
		binding: {returnDiff()}
		</>
	)
}
