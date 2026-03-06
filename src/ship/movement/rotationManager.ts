import * as THREE from "three";
import axis from "../../axes/axis";
import rotationMeiator from "./rotationMediator";
import RotationLimiter from "./rotationLimiter";

export default class RotationManager {
    localRotationRate: THREE.Vector3 = new THREE.Vector3();
    maxRotationRate: THREE.Vector3 = new THREE.Vector3(1, 1, 1)
}