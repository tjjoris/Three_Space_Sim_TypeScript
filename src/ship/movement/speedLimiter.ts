import * as THREE from 'three';

export default class SpeedLimiter {
    readonly minSpeed: number = 0;
    readonly maxSpeed: number;
    readonly vectorZero: THREE.Vector3 = new THREE.Vector3(0, 0, 0);

    constructor(maxSpeed: number) {
        this.maxSpeed = maxSpeed;
    }

    /**
     * return the clamped world speed.
     * @param localSpeed 
     * @returns 
     */
    limitSpeed(localSpeed: THREE.Vector3,): THREE.Vector3 {
        if (localSpeed.distanceTo(this.vectorZero) <= this.maxSpeed) {
            return localSpeed;
        }
        let clampedSpeed: THREE.Vector3 = localSpeed.clampLength(this.minSpeed, this.maxSpeed);
        return clampedSpeed;
    }
}