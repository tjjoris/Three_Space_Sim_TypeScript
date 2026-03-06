import * as THREE from "three";
import RotationLimiter from "./rotationLimiter";

/**
 * this class stores the local rotation rate, and using the calcualteLocalRotation
 * function it calcualtes the new rotatoin rate based on the passes axis values, and taking the
 * limits into account from RotationLimiter.
 */
export default class RotationManager {
    localRotationRate: THREE.Vector3 = new THREE.Vector3();
    rotationAccelerationIncrease: THREE.Vector3 = new THREE.Vector3(0.01, 0.01, 0.01);
    rotationAccelerationDecrease: THREE.Vector3 = new THREE.Vector3(-0.01, -0.01, -0.01);
    rotationLimiter: RotationLimiter;

    constructor(rotationLimiter: RotationLimiter) {
        this.rotationLimiter = rotationLimiter;
    }

    calculateLocalRotation(pitchAxisValue: number, yawAxisValue: number, rollAxisValue: number): THREE.Vector3 {
        yawAxisValue; //calling to eliminate build errors.
        this.increasePitch(pitchAxisValue);
        this.decreasePitch(pitchAxisValue);
        this.increaseRoll(rollAxisValue);
        this.decreaseRoll(rollAxisValue);
        this.localRotationRate = this.rotationLimiter.limitRotation(this.localRotationRate);
        return this.localRotationRate;
    }

    increasePitch(pitchAxisValue: number) {
        if (pitchAxisValue <= this.localRotationRate.x) {
            return
        }
        this.localRotationRate.x += this.rotationAccelerationIncrease.x;
    }

    decreasePitch(pitchAxisValue: number) {
        if (pitchAxisValue >= this.localRotationRate.x) {
            return;
        }
        this.localRotationRate.x += this.rotationAccelerationDecrease.x;
    }

    increaseRoll(rollAxisValue: number) {
        if (rollAxisValue <= this.localRotationRate.z) {
            return;
        }
        this.localRotationRate.z += this.rotationAccelerationIncrease.z;
    }

    decreaseRoll(rollAxisValue: number) {
        if (rollAxisValue >= this.localRotationRate.z) {
            return;
        }
        this.localRotationRate.z += this.rotationAccelerationDecrease.z;
    }
}