/*
 joy.ts
 @Author:Luke Johnson
 this class is used for tracking the joyId to be used by the binding, for reading joy inputs.
 the name is set from cookies, and when a joy is connected, the connected joys name is
 comparted to the names from these joys, to see if they match. If they do, and the joy is not
 enabled, the joy is enabled. but if the id's of the connected joy, and this joy do not match, and the names match, and this joy is not enabled, and the id of this joy is set to the id of the connected joy. note that it does this in order of the joys array, meaning lower id joys are checked first. meaning if multiple joys have the same name, the lower number joy ids from cookies, are used first when joys are connected.
 */
export default class Joy{
	private joyId:number|null;
	private joyName:string|null;
	//TODO: remove enabled.
	private enabled:boolean;

	/*
	constructor for Joy
	@parm:joyId:number|null
	@parm:joyName:number|null
	@parm:enabled:boolean
	 */
	public constructor(
		joyId:number|null,
		joyName:string|null,
		enabled:boolean,
	)
	{
		this.joyId = joyId;
		this.joyName = joyName;
		this.enabled = enabled;
	}

	public getJoyId():number|null {
		return this.joyId;
	}

	public getJoyName():string|null {
		return this.joyName;
	}

	public getEnabled():boolean{
		return this.enabled;
	}

	/*
	 *note you need to get a new gamepad form the navigator each time you use it.
	 or it will give you a stale value.
	 */
	public getGamepad():Gamepad|null{
		let joyId = this.joyId;
		if (joyId == null) {
			return null;
		}
		return navigator.getGamepads()[joyId];
	}
	public setJoyId(joyId:number) {
		this.joyId = joyId;
	}
	public setJoyName(joyName:string) {
		this.joyName = joyName;
	}
	/*
	 connect the joy based on it's id.
	 */
	public connectJoy(joyId:number){
		
		//set get gamePad from joy.
		this.joyId = joyId;
		this.enabled = true;
	}

	/*
	disconnect the current joy. 
	 */
	public disconnectJoy(){
		this.enabled = false;
	}
}
