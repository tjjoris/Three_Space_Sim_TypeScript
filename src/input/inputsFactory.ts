/*
inputsFactory.ts
@Author:Luke Johnson
This is the factory class for creating all the instances of the classes needed for the inputs 
namespace. each function instantiates a concrete instnace of a class, and return it.
sometimes an array of instances.
 */
import Joy from "./joy";
import JoyAxisBinding from "./joyAxisBinding";
import FlightAxis from "../axes/flightAxis"
import JoyConnector from "./joyConnector";
import BindingsTicker from "./bindingsTicker";
import type Tickable from "../game/tickable";
import InputDiffsComparerForAllJoys from "./inputDiffsComparerForAllJoys"; 
import BindingsStorage from "./bindingsStorage";
import BindingsToStateConverter from "./bindingsToStateConverter";
import GameState from "../ui/menu/gameState";
import InputDiffState from "./inputDiffState";

export default class InputsFactory{

	private joys:Joy[];
	private joyAxisBindings:JoyAxisBinding[];
	private joyConnector:JoyConnector;
	private bindingsTicker:BindingsTicker;
	private inputDiffsComparerForAllJoys: InputDiffsComparerForAllJoys;
	private bindingsStorage: BindingsStorage;
	private bindingsToStateConverter: BindingsToStateConverter;
	private gameState: GameState;
	private inputDiffState: InputDiffState;

	constructor(pitchAxis: FlightAxis, 
		    rollAxis: FlightAxis, 
		    verticalAxis: FlightAxis,
		   horizontalAxis: FlightAxis) {
		let joyZero = new Joy(null, 0, "CH FLIGHTSTICK PRO (Vendor: 068e Product: 00f6)", false);
		let joyOne = new Joy(null, 1, "CH FIGHTERSTICK USB  (Vendor: 068e Product: 00f3)", false);
		let joyTwo = new Joy(null, 2, null, false);
		let joyThree = new Joy(null, 3, null, false);
		let joyFour = new Joy(null, 4, null, false);
		this.joys = [joyZero, joyOne, joyTwo, joyThree, joyFour]; 

		let pitchBinding = new JoyAxisBinding(joyOne, 1, pitchAxis);
		let rollBinding = new JoyAxisBinding(joyOne, 0, rollAxis);
		let verticalBinding = new JoyAxisBinding(joyZero, 1, verticalAxis);
		let horizontalBinding = new JoyAxisBinding(joyZero, 0, horizontalAxis);
		this.joyAxisBindings = [pitchBinding, 
			rollBinding, 
			verticalBinding, 
			horizontalBinding];
		this.bindingsTicker = new BindingsTicker();
			/*
		this.bindingsTicker.addTickable(pitchBinding as Tickable);
		this.bindingsTicker.addTickable(rollBinding as Tickable);
		this.bindingsTicker.addTickable(verticalBinding as Tickable);
		this.bindingsTicker.addTickable(horizontalBinding as Tickable);
		*/
		//add tickable bindings to bindings ticker
		//TODO: put this in the constructor.
		for (let bindingsIndex = 0; bindingsIndex < this.joyAxisBindings.length; bindingsIndex ++) { 
			this.bindingsTicker.addTickable(this.joyAxisBindings[bindingsIndex] as Tickable);
		}
		//new bindings to state converter
		this.bindingsToStateConverter = new BindingsToStateConverter();
		//new bindings storage
		this.gameState = new GameState();
		this.bindingsStorage = new BindingsStorage(this.joyAxisBindings, this.bindingsToStateConverter, this.gameState);
		this.inputDiffState = new InputDiffState(this.gameState);
		this.inputDiffsComparerForAllJoys = new InputDiffsComparerForAllJoys(this.inputDiffState);
		this.joyConnector = new JoyConnector(this.joys, this.inputDiffsComparerForAllJoys);

	}

	/*
	get the joys that are instantiated by this factory. normally they would be
	blank and set by the cookies, for testing, they have values set.
	 */
	public getJoys():Joy[]{
		return this.joys;
	}

	getBindings():JoyAxisBinding[] {
		return this.joyAxisBindings;
	}

	getJoyConnector():JoyConnector {
		return this.joyConnector;
	}
	
	getBindingsTicker():BindingsTicker {
		return this.bindingsTicker;
	}

	getInputDiffsComparerForAllJoys():InputDiffsComparerForAllJoys {
		return this.inputDiffsComparerForAllJoys;
	}

	public getBindingsStorage() : BindingsStorage {
		return this.bindingsStorage;
	}

	public getGameState(): GameState {
		return this.gameState;
	}

	public getInputDiffState(): InputDiffState {
		return this.inputDiffState;
	}
}
