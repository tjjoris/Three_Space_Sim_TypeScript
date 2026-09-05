/*
 * joysStorage.ts
 * @Author: Luke Johnson
 * this class stores all the connectable joys.
 * it gets them from cookies or sets them from the bindings and the input diff joy connector.
 */
import Joy from "./joy";

export default class JoysStorage {
	private joys: Joy[] = [];
	
	/*
	 * calls the cookie function to read the joys from cookies and set them.
	 */
	public getJoyCookiesSetJoys() {
	}

	/*
	 *a joy has been connected, loop the joys to see if values are null or the array element is null and add the joy there, or else push it as a new element to the array. if the joy already exists, set it as enabled. 
	 */
	public joyConnected(joyId: number, joyName: string) {
		//loop all joys
		for (let joysIndex = 0; joysIndex < joys.length; joysIndex ++) {
			const joy = this.joys[joysIndex];
			//if the joy element in the array is null.
			if (joy == null) {
				//create the joy to add to the array.
				const joyToAdd: Joy = new Joy (joyId, joysIndex, joyName, true);
				//add the joy to the array.
				this.joys[joysIndex] = joyToAdd;
			}
			

		}
	}
}
