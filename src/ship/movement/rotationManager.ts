import * as THREE from "three";
import applyJerk from "./applyJerk";

/**
 * this class stores the local rotation rate, and using the calcualteLocalRotation
 * function it calcualtes the new rotatoin rate based on the passes axis values, and taking the
 * limits into account from RotationLimiter.
 */
export default class RotationManager {
    localRotationRate: THREE.Vector3 = new THREE.Vector3();
    rotationAccelerationIncrease: THREE.Vector3 = new THREE.Vector3(0.013, 0.07, 0.02);
    rotationAccelerationDecrease: THREE.Vector3 = new THREE.Vector3(-0.013, -0.07, -0.02);


    calculateLocalRotation(desiredPitch: number,
        desiredYaw: number,
        desiredRoll: number,
        deltaTime: number): THREE.Vector3 {
        //increase pitch
        this.localRotationRate.x = applyJerk(deltaTime, desiredPitch, this.localRotationRate.x, this.rotationAccelerationIncrease.x);
        //decrease pitch
        this.localRotationRate.x = applyJerk(deltaTime, desiredPitch, this.localRotationRate.x, this.rotationAccelerationDecrease.x);
        //increase yaw
        this.localRotationRate.y = applyJerk(deltaTime, desiredYaw, this.localRotationRate.y, this.rotationAccelerationIncrease.y);
        //decrease yaw
        this.localRotationRate.y = applyJerk(deltaTime, desiredYaw, this.localRotationRate.y, this.rotationAccelerationDecrease.y);
        //increaes roll
        this.localRotationRate.z = applyJerk(deltaTime, desiredRoll, this.localRotationRate.z, this.rotationAccelerationIncrease.z);
        //decrease roll
        this.localRotationRate.z = applyJerk(deltaTime, desiredRoll, this.localRotationRate.z, this.rotationAccelerationDecrease.z);
        // this.increasePitch(pitchAxisValue, deltaTime);
        // this.decreasePitch(pitchAxisValue, deltaTime);
        // this.increaseRoll(rollAxisValue, deltaTime);
        // this.decreaseRoll(rollAxisValue, deltaTime);
        // this.increaseYaw(yawAxisValue, deltaTime);
        // this.decreaseYaw(yawAxisValue, deltaTime);

        console.log("locl rotation rate ", this.localRotationRate);
        return this.localRotationRate;
    }

    // increasePitch(pitchAxisValue: number, deltaTime: number) {
    //     if (pitchAxisValue <= this.localRotationRate.x) {
    //         return
    //     }
    //     this.localRotationRate.x += (this.rotationAccelerationIncrease.x * deltaTime);
    // }

    // decreasePitch(pitchAxisValue: number, deltaTime: number) {
    //     if (pitchAxisValue >= this.localRotationRate.x) {
    //         return;
    //     }
    //     this.localRotationRate.x += (this.rotationAccelerationDecrease.x * deltaTime);
    // }

    // increaseRoll(rollAxisValue: number, deltaTime: number) {
    //     if (rollAxisValue <= this.localRotationRate.z) {
    //         return;
    //     }
    //     this.localRotationRate.z += (this.rotationAccelerationIncrease.z * deltaTime);
    // }

    // decreaseRoll(rollAxisValue: number, deltaTime: number) {
    //     if (rollAxisValue >= this.localRotationRate.z) {
    //         return;
    //     }
    //     this.localRotationRate.z += (this.rotationAccelerationDecrease.z * deltaTime);
    // }

    // increaseYaw(yawAxisValue: number, deltaTime: number) {
    //     if (yawAxisValue <= this.localRotationRate.y) {
    //         return;
    //     }
    //     this.localRotationRate.y += (this.rotationAccelerationIncrease.y * deltaTime);
    // }


    // decreaseYaw(yawAxisValue: number, deltaTime: number) {
    //     if (yawAxisValue >= this.localRotationRate.y) {
    //         return;
    //     }
    //     this.localRotationRate.y += (this.rotationAccelerationDecrease.y * deltaTime);
    // }


}