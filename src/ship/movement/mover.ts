import * as THREE from 'three';
import type { Tickable } from '../../game/tickable';

export default class Mover extends THREE.Object3D implements Tickable {
    _rotation: THREE.Vector3;
    _rotationRate: THREE.Vector3;
    _rotationSpeed: THREE.Vector3;

    _velocity: THREE.Vector3;
    _velocitySpeed: THREE.Vector3;
    _position: THREE.Vector3;
    constructor() {
        super();
        this._rotation = new THREE.Vector3();
        this._rotationRate = new THREE.Vector3();
        this._rotationSpeed = new THREE.Vector3();

        this._velocity = new THREE.Vector3();
        this._velocitySpeed = new THREE.Vector3();
        this._position = new THREE.Vector3();

        //set x rotation rate
        this._rotationRate.x = 0; //radians per second
        this._rotationRate.y = 0;
        this._rotationRate.z = 0;

        //set rotations speed
        this._rotationSpeed.x = 600;
        this._rotationSpeed.y = 800;
        this._rotationSpeed.z = 1000;

        //set velocity speed
        this._velocitySpeed.x = 0.5;
        this._velocitySpeed.y = 0.5;
        this._velocitySpeed.z = 0.5;
    }

    setVelocity(velocity: THREE.Vector3) {
        this._velocity = velocity;
    }

    tick(deltaTime: number) {
        //rotate
        this.rotateX(this._rotationRate.x * (deltaTime / 1000));
        this.rotateY(this._rotationRate.y * (deltaTime / 1000));
        this.rotateZ(this._rotationRate.z * (deltaTime / 1000));
        this.translateZ(this._velocity.z * (deltaTime / 100));
    }

    setPitch(pitch: number) {
        this._rotationRate.x = pitch * this._rotationSpeed.x;
    }

    setYaw(yaw: number) {
        this._rotationRate.y = yaw * this._rotationSpeed.y;
    }

    setRoll(roll: number) {
        this._rotationRate.z = roll * this._rotationSpeed.z;
    }

    setLongitudional(longitudional: number) {
        this._velocity.z = longitudional * this._velocitySpeed.z;
    }

}