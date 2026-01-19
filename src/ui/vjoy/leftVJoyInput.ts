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


    /**
     * for the left side
     * checks if dragging is outside the correct side for the sub class, 
     * then returns the x value of the side bounds. 
     * if not outside, returns null.
     * @param pos 
     * @returns 
     */
    calcSideBoundsIfDraggingOutSide(pos: THREE.Vector2): number | null {
        if (this.isXWithinRightDragBounds(pos.x)) {
            return null;
        }
        //calc x for the left bounds
        return this.calcRightXDragBounds();
    }
}