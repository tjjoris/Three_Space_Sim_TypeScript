import * as THREE from "three";
import Mover from "./mover";
import clamp from "../../helpers/clamp";

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
        const worldSpeed = this.applyWorldAcceleration(worldAccel, this.worldSpeed, this.massCoefficient);
        return this.calculateLocalDirectionFromWorld(worldSpeed, mover as THREE.Object3D);

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
        const worldDir = object.localToWorld(new THREE.Vector3().copy(relativeDirection));
        return worldDir;
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
        const localDir = object.worldToLocal(new THREE.Vector3().copy(worlDirection));
        return localDir;
    }

}