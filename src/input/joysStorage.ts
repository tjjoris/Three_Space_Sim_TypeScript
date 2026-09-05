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
	 *a joy has been connected, 
	 First loop the joys to see if joy exists and set it to connected.
	 thien, loop the joys to see if values are null or the array element is null and add the joy there, or else push it as a new element to the array. 
	 */
	public joyConnected(joyId: number, joyName: string) {
		//call enableJoyIfInJoys to enable the joy if it exists, if it returs true this is done.
		const joyEnabled = this.enableJoyIfInJoys(joyId, joyName);
		//if the joy was enabled, end function.
		if (joyEnabled) {
			return;
		}
		//add the joy because it did not exist.
		this.addNewJoy(joyId, joyName, true);
	}

	/*
	 * loop joys to see if the name matches, if it does and it's disabled set it to enabled, if this happens return true. if loops through whole array and a matching name is not already disabled, return false.
	 */
	public enableJoyIfInJoys(joyId: number, joyName: string) : boolean {
		//loop all joys
		for (let joysIndex = 0; joysIndex < joys.length; joysIndex ++) {
			const joy = this.joys[joysIndex];
			if (joy == null) {
				continue;
			}
			//check if the names match and it is disabled
			if ((joyName == joy.getJoyName()) && (!joy.getEnabled())) {
				//set the joy to enabled, and set the joyId.	
				joy.setEnabled(true);
				joy.setJoyId(joyId);
				//return true because function was successfull.
				return true;
			}
		}
	}

	/*
	 * add a new joy because joy does not already exist.
	 */
	private addNewJoy(joyId: number, joyName: string, joyEnabled: boolean){
		//loop all joys
		for (let joysIndex = 0; joysIndex < this.joys.length; joysIndex ++) {
			const joy = this.joys[joysIndex];
			//if joy is null
			if (joy == null) {
				const joyToAdd: Joy = new Joy (joyId, joysIndex, joyName, joyEnabled);
				//add the joy to the array.
				this.joys[joysIndex] = joyToAdd;
				//return that it's done.
				return ;
			}
			//if joy values are null, set them for the new joy.
			if ((joy.getJoyName() == null) || (joy.getJoyId() == null)) {
				joy.setJoyName(joyName);
				joy.setJoyId(joyId);
				joy.setEnabled(joyEnabled);
				//return that it's done.
				return ;
			}
			const joyToAdd: Joy = new Joy (joyId, this.joys.length, joyName, joyEnbaled);
			this.joys.push(joyToAdd);
			return ;
		}
	}

	/*
	 * return the joy from the array if it matches the passed joyId.
	 */
	getJoyById(joyId: number): Joy | null{
		this.joys.forEach((joy) => {
			if (joy != null) {
				if (joy.getJoyId() == joyId) {
					return joy;
				}
			}
		});
		return null;
	}
}
