import * as THREE from 'three';
import VJoyInput from "./vJoyInput";
import type Axis from '../../axes/axis';

export default class LeftVJoyInput extends VJoyInput {

    constructor(renderer: THREE.WebGLRenderer, screenWidthMultiplier: number, boxMultiplier: number, axisX: Axis, axisY: Axis) {
        super(renderer, screenWidthMultiplier, boxMultiplier, axisX, axisY);

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