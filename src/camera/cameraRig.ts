import * as THREE from 'three';
import Mover from '../ship/movement/mover'
import type { Tickable } from '../game/tickable';
export default class CameraRig implements Tickable {

    _camera: THREE.Camera;
    _mover: Mover;
    constructor(camera: THREE.Camera, mover: Mover) {
        this._camera = camera;
        this._mover = mover;
    }

    tick(deltaTime: number) {
        //calling deltaTime to elimineate build errors.
        deltaTime;
        //set the position and rotation of the camera based on the mover
        this._camera.position.copy(this._mover.position);
        this._camera.quaternion.copy(this._mover.quaternion);
    }
}