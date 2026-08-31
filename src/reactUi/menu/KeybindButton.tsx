/**
KeybindButton.tsx
@Author: Luke Johnson
 * activates when pressed, telling typescript to activate input diff, which reads joystick inputs.
 updates the inputDiff from the state using useSyncExternalStore.
 */
import { useState} from "react";
import UseGameStateStore from "../../stores/UseGameStateStore";
import GameState from "../../ui/menu/gameState";
import type {GameStateType} from "../../types/gameStateType";
import { getGameState } from "../../main.ts"
import JoyAxisInputDiffValueReporter from "../../input/joyAxisInputDiffValueReporter";
import { setDiffEnabled, setBinding } from "../../main";
import type { FlightAxisType } from "../../types/flightAxisType";
import type { BindingType } from "../../types/bindingType";

type BindType = { id: number, name : string}; 

type Props = {
	flightAxis: FlightAxisType;
	binding:  BindingType;
}
export default function KeybindButton(props: Props) {
	const gameStateClass: GameState = getGameState();	
	const gameStateStore: GameStateType = UseGameStateStore(gameStateClass);
	const diffState: JoyAxisInputDiffValueReporter | null = gameStateStore.inputDiff;
	//console.log("diff state ", diffState);
	const [isButtonActive, setIsButtonActive] = useState(false);

	const [pitchBind, setPitchBind] = useState<BindType>({ id: 0 , name: "this " });

	/*
	 * retruns a react friendly dom element for displaying either the axis this binding is set to, or the diff that is currently being set
	 */
	function returnDiffOrBindingSetTo() {

		if (isButtonActive) {
			const returnDiffDom = returnDiff();
			return returnDiffDom;
		}
		const returnBindingSetToDom = returnBindingSetTo();
		return returnBindingSetToDom;
	}
	/*
	 * function for returning the binding this keybind is set to.
	 */
	function returnBindingSetTo() {
		if ((props.binding == null) || (props.binding.axisId == null)) {
			return (<>
				Binding not set
				</>);
		}
		return "axis " + props.binding.axisId;
		
	}
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
	 * return an activatable button with a different animation div and label based on if it is activated.
	 */
	function returnActivatableButton() {
		return (
			<>
				<button
					className = "menu-button"
					{ ...!isButtonActive &&
						{onClick : callEnableDiff}
					}
				>
				{ isButtonActive ? 
					<>  InputBinding </> : 
					<> {props.flightAxis} </> }
				{ isButtonActive ?
					<div		
						onTransitionEnd={bindingButtonFinished}
						className="diff-slider diff-button-disabled"/> :
					<div
					//onTransitionEnd={bindingButtonFinished}
					className="diff-slider diff-button-enabled"  /> }

				</button>

			</>
		)
	}

	return (
		<>
		{ returnActivatableButton() }
		{ returnDiffOrBindingSetTo() }
		</>
	)
}
