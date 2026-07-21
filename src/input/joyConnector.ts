import Joy from "./joy.ts"
/*
joyConnector.ts
@Author:Luke Johnson
this class listens for when a joy is connected or disconnected.
When that happens, it tells joysHandler, and passes it a joyid:number, and joyName:string. Disconnects only need a joyId:number.
For now joyConnector will talk to joys:Joy[].
 */
export default class JoyConnector {
	private joys:Joy[];

	/*
	constructor
	@param:joys - the joys to set
	 */
	constructor(joys:Joy[]) {
		this.joys = joys;
		window.addEventListener("gamepadconnected", this.onGamepadConnected);
	}
private readonly onGamepadConnected = (e: GamepadEvent) => { this.connectJoy(e) };

/*
connect joy called when the gampad is connected from the listener.
converts the gampad id to a number and uses it to enable the joy.
 */
	private connectJoy(e:GamepadEvent):void {
		console.log("joy connector, game pad id: ", e.gamepad.index)
		let joyId:number = e.gamepad.index;
		this.joys[joyId].connectJoy(joyId);
	}
	
}
