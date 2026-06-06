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
    private velocity: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
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
        const relativeAcceleration = new THREE.Vector3(horizontalThrust, verticalThrust, forwardThrust);
        const velocity = this.applyAcceleration(relativeAcceleration, this.velocity, this.massCoefficient);
        this.velocity = this.speedLimiter.limitSpeed(velocity);
        return this.velocity;
    }



    /**
     * apply world acceleration
     */
    applyAcceleration(acceleration: THREE.Vector3, velocity: THREE.Vector3, massCoefficient: number): THREE.Vector3 {

        let x = velocity.x + (massCoefficient * acceleration.x * this.accelerationMult.x);
        // x = clamp(x, this.maxNegativeVelocity.x, this.maxVelocity.x);
        let y = velocity.y + (massCoefficient * acceleration.y * this.accelerationMult.y);
        // y = clamp(y, this.maxNegativeVelocity.y, this.maxVelocity.y);
        let z = velocity.z + (massCoefficient * acceleration.z * this.accelerationMult.z);
        // z = clamp(z, this.maxNegativeVelocity.z, this.maxVelocity.z);
        return new THREE.Vector3(x, y, z);
    }


}