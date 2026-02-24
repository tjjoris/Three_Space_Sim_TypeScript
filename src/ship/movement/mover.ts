import * as THREE from 'three';
import type Tickable from '../../game/tickable';
import smartForward from './smartForward';

export default class Mover extends THREE.Object3D implements Tickable {
    _rotation: THREE.Vector3;
    _rotationRate: THREE.Vector3;
    _rotationSpeed: THREE.Vector3;

    _velocity: THREE.Vector3;
    _velocitySpeed: THREE.Vector3;
    _position: THREE.Vector3;

    // private maxVelocity: THREE.Vector3 = new THREE.Vector3(10, 10, 10);

    verticalInversionNum: number;
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
        this._rotationSpeed.x = 0.5;
        this._rotationSpeed.y = 0.5;
        this._rotationSpeed.z = 0.5;

        //set velocity speed
        this._velocitySpeed.x = 0.5;
        this._velocitySpeed.y = 0.5;
        this._velocitySpeed.z = 0.5;

        this.verticalInversionNum = 1;
    }

    //set the vertical inversion number based on the boolean.
    setVerticalInversion(value: boolean) {
        value ? this.verticalInversionNum = -1
            : this.verticalInversionNum = 1;
        console.log('set vertical inversion', this.verticalInversionNum);
    }

    setVelocity(velocity: THREE.Vector3) {
        this._velocity = velocity;
    }

    tick(deltaTime: number) {
        //rotate
        this.rotateX(this._rotationRate.x * (deltaTime));
        this.rotateY(this._rotationRate.y * (deltaTime));
        this.rotateZ(this._rotationRate.z * (deltaTime));
        this.translateZ(this._velocity.z * (deltaTime));
        this.translateY(this._velocity.y * (deltaTime));
        this.translateX(this._velocity.x * (deltaTime));
    }

    setPitch(pitch: number) {
        this._rotationRate.x = - pitch * this._rotationSpeed.x;
    }

    setYaw(yaw: number) {
        this._rotationRate.y = yaw * this._rotationSpeed.y;
    }

    setRoll(roll: number) {
        this._rotationRate.z = - roll * this._rotationSpeed.z;
    }

    setLongitudional(longitudional: number) {
        this._velocity.z = - longitudional * this._velocitySpeed.z;
    }

    setVertical(vertical: number) {
        this._velocity.y = this.verticalInversionNum * vertical * this._velocitySpeed.y;
        this.setLongitudional(smartForward(this._velocity.x, this._velocity.y,));
    }

    setHorizontal(horizontal: number) {
        this._velocity.x = horizontal * this._velocitySpeed.x;
        this.setLongitudional(smartForward(this._velocity.x, this._velocity.y,));
    }

}