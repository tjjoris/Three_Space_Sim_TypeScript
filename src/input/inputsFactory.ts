/*
inputsFactory.ts
@Author:Luke Johnson
This is the factory class for creating all the instances of the classes needed for the inputs 
namespace. each function instantiates a concrete instnace of a class, and return it.
sometimes an array of instances.
 */
import Joy from "./joy"
export default class InputsFactory{

	/*
	get the joys that are instantiated by this factory. normally they would be
	blank and set by the cookies, for testing, they have values set.
	 */
	public getJoys():Joy[]{
		let joyOne = new Joy(null, null, false);
		let joyTwo = new Joy(null, null, false);
		return [joyOne, joyTwo];
	}

}
