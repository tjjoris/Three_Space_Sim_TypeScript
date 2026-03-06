import * as THREE from "three";

export default class RotationLimiter {
    minRotationRates: THREE.Vector3;
    maxRotationRates: THREE.Vector3;

    constructor(minRotationRates: THREE.Vector3, maxRotationRates: THREE.Vector3) {
        this.minRotationRates = minRotationRates;
        this.maxRotationRates = maxRotationRates;
    }

    limitRotation(localRotation: THREE.Vector3) {
        const clampedRotation = localRotation.clamp(this.minRotationRates, this.maxRotationRates);
        return clampedRotation;
    }
}