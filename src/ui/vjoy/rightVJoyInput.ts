import * as THREE from 'three';
import VJoyInput from "./vJoyInput";

export default class RightVJoyInput extends VJoyInput {

    constructor(renderer: THREE.WebGLRenderer, clickBoxSize: THREE.Vector2, screenWidthMultiplier: number, boxMultiplier: number) {
        super(renderer, clickBoxSize, screenWidthMultiplier, boxMultiplier);

        this.screenWidthMultiplier = 1;
        this.boxLeftMult = -1;
        this.leftPaddingMult = -2;
        this.innerPaddingMult = -1;
        this.rightPaddingMult = 0;
        this.boxRightMult = 0;
    }
}