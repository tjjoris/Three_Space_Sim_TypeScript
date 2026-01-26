import * as THREE from 'three';
import VJoyInput from "./vJoyInput";

export default class RightVJoyInput extends VJoyInput {

    constructor(renderer: THREE.WebGLRenderer, screenWidthMultiplier: number, boxMultiplier: number) {
        super(renderer, screenWidthMultiplier, boxMultiplier);

        this.screenWidthMultiplier = 1;
        this.boxLeftMult = -1;
        this.leftPaddingMult = -2;
        this.innerPaddingMult = -1;
        this.rightPaddingMult = 0;
        this.boxRightMult = 0;
    }


    /**
     * for right side
     * this is the same as the super.
     * checks if dragging is outside the correct side for the sub class, 
     * then returns the x value of the side bounds. 
     * if not outside, returns null.
     * @param pos 
     * @returns 
     */
    calcSideBoundsIfDraggingOutSide(pos: THREE.Vector2): number | null {
        if (this.isXWithinLeftDragBounds(pos.x)) {
            return null;
        }
        //calc x for the left bounds
        return this.calcLeftXDragBounds();
    }

}