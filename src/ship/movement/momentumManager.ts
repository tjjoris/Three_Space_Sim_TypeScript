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
        const worldAccel = this.calculateWorldVectorFromLocal(relativeAcceleration, mover as THREE.Object3D);
        const rawWorldaVelocity: THREE.Vector3 = this.applyWorldAcceleration(worldAccel, this.worldVelocity, this.massCoefficient);
        this.worldVelocity = this.speedLimiter.limitSpeed(rawWorldaVelocity);
        const localDirection = this.calculateLocalDirectionFromWorld(this.worldVelocity, mover as THREE.Object3D);
        return localDirection;

    }

    /**
     * calculate the world velocity.
     * @param localVector 
     * @param object 
     * @returns 
     */
    calculateWorldVectorFromLocal(localVector: THREE.Vector3, object: THREE.Object3D): THREE.Vector3 {
        // const newV3 = new THREE.Vector3();
        // object.getWorldDirection(newV3);
        // const returnV3 = new THREE.Vector3();
        // returnV3.copy(newV3).add(relativeAcceleration);
        // return returnV3;
        // const worldDir = new THREE.Vector3();
        // object.localToWorld(worldDir).copy(relativeDirection);
        // const worldDir = object.localToWorld(new THREE.Vector3().copy(relativeDirection));
        // return worldDir;
        const forward = new THREE.Vector3();
        object.getWorldDirection(forward);
        const quat = new THREE.Quaternion;
        quat.setFromUnitVectors(this.world, forward);
        const result = new THREE.Vector3();
        result.copy(localVector);
        result.applyQuaternion(quat);
        return result;


    }

    /**
     * apply world acceleration
     */
    applyWorldAcceleration(worldAcceleration: THREE.Vector3, worldVelocity: THREE.Vector3, massCoefficient: number): THREE.Vector3 {

        let x = worldVelocity.x + (massCoefficient * worldAcceleration.x * this.accelerationMult.x);
        // x = clamp(x, this.maxNegativeVelocity.x, this.maxVelocity.x);
        let y = worldVelocity.y + (massCoefficient * worldAcceleration.y * this.accelerationMult.y);
        // y = clamp(y, this.maxNegativeVelocity.y, this.maxVelocity.y);
        let z = worldVelocity.z + (massCoefficient * worldAcceleration.z * this.accelerationMult.z);
        // z = clamp(z, this.maxNegativeVelocity.z, this.maxVelocity.z);
        return new THREE.Vector3(x, y, z);
    }

    /**
     * calculate relative velocity from world velocity.
     */
    calculateLocalDirectionFromWorld(worldDirection: THREE.Vector3, object: THREE.Object3D): THREE.Vector3 {
        // const localDir = object.worldToLocal(new THREE.Vector3().copy(worlDirection));
        // return localDir;
        const forward = new THREE.Vector3();
        object.getWorldDirection(forward);
        const quat = new THREE.Quaternion();
        quat.setFromUnitVectors(forward, this.world);
        const result = new THREE.Vector3();
        result.copy(worldDirection);
        result.applyQuaternion(quat);
        return result;
    }

}