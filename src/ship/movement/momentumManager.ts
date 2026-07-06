import * as THREE from "three";
import Mover from "./mover";
import SpeedLimiter from "./speedLimiter";
// import clamp from "../../helpers/clamp";

/**
 * stores the world momentum.
 * then calculates the relative acceleration.
 * then gets the relative speed to be used by the mover.
 */
export default class MomentumManager {
    private worldVelocity: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
    private massCoefficient: number;
    readonly world = new THREE.Vector3(0, 0, 1);
    readonly accelerationMult = new THREE.Vector3(0.01, 0.01, 0.01);
    speedLimiter: SpeedLimiter;

    /**
     * 
     * @param mass 
     * @param speedLimiter 
     */
    constructor(mass: number, speedLimiter: SpeedLimiter) {
        this.massCoefficient = mass;
        this.speedLimiter = speedLimiter;
    }


    /**
     * calculate the relative velocity.
     * @param verticalThrust 
     * @param horizontalThrust 
     * @param forwardThrust 
     * @param mover 
     * @returns 
     */
    calculateLocalVelocity(verticalThrust: number, horizontalThrust: number, forwardThrust: number, mover: Mover): THREE.Vector3 {
        //find the relative acceleration including mass and acceleration multipliers.
        const relativeAcceleration = new THREE.Vector3(horizontalThrust * this.massCoefficient * this.accelerationMult.x,
            verticalThrust * this.massCoefficient * this.accelerationMult.y,
            forwardThrust * this.massCoefficient * this.accelerationMult.z);
        //find the world acceleration by applying the objects quaternion.
        const worldAcceleration = relativeAcceleration.applyQuaternion(mover.quaternion);
        //find the world velocity by applying the acceleration.
        const rawWorldVelocity = this.applyAcceleration(worldAcceleration, this.worldVelocity);
        //limit the speed and set the local world velocity.
        this.worldVelocity = this.speedLimiter.limitSpeed(rawWorldVelocity);
        //convert world velocity back to local velocity.
        const localVelocity = this.worldVelocity.clone().applyQuaternion(mover.quaternion.clone().invert());
        return localVelocity;
    }



    /**
     * apply acceleration
     */
    applyAcceleration(acceleration: THREE.Vector3, velocity: THREE.Vector3): THREE.Vector3 {

        let x = velocity.x + acceleration.x;
        let y = velocity.y + acceleration.y;
        let z = velocity.z + acceleration.z;
        return new THREE.Vector3(x, y, z);
    }


}