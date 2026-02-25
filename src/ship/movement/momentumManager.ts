import * as THREE from "three";
import Mover from "./mover";
import clamp from "../../helpers/clamp";
import { ThreeMFLoader } from "three/examples/jsm/Addons.js";

/**
 * stores the world momentum.
 * then calculates the relative acceleration.
 * then gets the relative speed to be used by the mover.
 */
export default class MomentumManager {
    private worldSpeed: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
    private massCoefficient: number;
    private maxVelocity: THREE.Vector3 = new THREE.Vector3(1, 1, 1);
    private maxNegativeVelocity: THREE.Vector3 = new THREE.Vector3(-1, -1, -1);
    readonly world = new THREE.Vector3(0, 0, -1);

    constructor(mass: number) {
        this.massCoefficient = mass;
    }


    /**
     * calculate the relative speed.
     * @param verticalThrust 
     * @param horizontalThrust 
     * @param forwardThrust 
     * @param mover 
     * @returns 
     */
    calculateRelativeSpeed(verticalThrust: number, horizontalThrust: number, forwardThrust: number, mover: Mover): THREE.Vector3 {
        const relativeAcceleration = new THREE.Vector3(horizontalThrust, verticalThrust, forwardThrust);
        const worldAccel = this.calculateWorldDirFromLocal(relativeAcceleration, mover as THREE.Object3D);
        this.worldSpeed = this.applyWorldAcceleration(worldAccel, this.worldSpeed, this.massCoefficient);
        const localDirection = this.calculateLocalDirectionFromWorld(this.worldSpeed, mover as THREE.Object3D);
        // this.worldSpeed = this.applyWorldAcceleration(relativeAcceleration, this.worldSpeed, this.massCoefficient);
        // console.log(localDirection);
        return localDirection;

    }

    /**
     * calculate the world speed.
     * @param relativeDirection 
     * @param object 
     * @returns 
     */
    calculateWorldDirFromLocal(relativeDirection: THREE.Vector3, object: THREE.Object3D): THREE.Vector3 {
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
        result.copy(relativeDirection);
        result.applyQuaternion(quat);
        return result;


    }

    /**
     * apply world acceleration
     */
    applyWorldAcceleration(worldAcceleration: THREE.Vector3, worldSpeed: THREE.Vector3, massCoefficient: number): THREE.Vector3 {

        let x = worldSpeed.x + (massCoefficient * worldAcceleration.x);
        x = clamp(x, this.maxNegativeVelocity.x, this.maxVelocity.x);
        let y = worldSpeed.y + (massCoefficient * worldAcceleration.y);
        y = clamp(y, this.maxNegativeVelocity.y, this.maxVelocity.y);
        let z = worldSpeed.z + (massCoefficient * worldAcceleration.z);
        z = clamp(z, this.maxNegativeVelocity.z, this.maxVelocity.z);
        return new THREE.Vector3(x, y, z);
    }

    /**
     * calculate relative speed from world speed.
     */
    calculateLocalDirectionFromWorld(worlDirection: THREE.Vector3, object: THREE.Object3D): THREE.Vector3 {
        // const localDir = object.worldToLocal(new THREE.Vector3().copy(worlDirection));
        // return localDir;
        const forward = new THREE.Vector3();
        object.getWorldDirection(forward);
        const quat = new THREE.Quaternion();
        quat.setFromUnitVectors(forward, this.world);
        const result = new THREE.Vector3();
        result.copy(this.worldSpeed);
        result.applyQuaternion(quat);
        return result;
    }

}