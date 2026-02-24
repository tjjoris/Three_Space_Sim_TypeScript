import * as THREE from "three";
import Mover from "./mover";

/**
 * uses calculateAcceleration3d to calculate the world acceleration.
 * has it's thrust values passed for each axis.
 * then applies these based on the mover, saving the world acceleration.
 * the getter then gets the world acceleration to be used by the mover.
 */
export default class MomentumManager {
    private acceleration3d: THREE.Vector3 = new THREE.Vector3(0, 0, 0);


    // setVerticalAxis(value: number) {
    //     this.verticalAxisValue = value;
    // }
    // setHorizontalAxis(value: number) {
    //     this.horizontalAxisValue = value;
    // }
    // setForwardAxis(value: number) {
    //     this.horizontalAxisValue = value;
    // }

    calculateAcceleration3d(verticalThrust: number, horizontalThrust: number, forwardThrust: number, mover: Mover): THREE.Vector3 {
        return new THREE.Vector3(0, 0, 0);
    }


}