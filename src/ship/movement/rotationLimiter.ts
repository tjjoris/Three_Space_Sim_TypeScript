import * as THREE from "three";

export default class RotationLimiter {
    maxRotationRates: THREE.Vector3;

    constructor(maxRotationRates: THREE.Vector3) {
        this.maxRotationRates = maxRotationRates;
    }
}