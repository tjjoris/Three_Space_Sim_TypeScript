import * as THREE from 'three';
import VJoyInput from "./vJoyInput";

export default class LeftVJoyInput extends VJoyInput {

    constructor(renderer: THREE.WebGLRenderer, clickBoxSize: THREE.Vector2, screenWidthMultiplier: number, boxMultiplier: number) {
        super(renderer, clickBoxSize, screenWidthMultiplier, boxMultiplier);

        this.screenWidthMultiplier = 0;
        this.boxLeftMult = 0;
        this.leftPaddingMult = 0;
        this.innerPaddingMult = 1;
        this.rightPaddingMult = 2;
        this.boxRightMult = 1;
    }
}