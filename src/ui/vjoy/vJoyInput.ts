import * as THREE from 'three';
import calcSlope from '../../helpers/calcSlope';
import calcX1UsingPointSlopeForm from '../../helpers/calcX1UsingPointSlopeForm';
import calcY1UsingPointSlopeForm from '../../helpers/calcY1UsingPointSlopeForm';
import clamp from '../../helpers/clamp';

export default class VJoyInput {
    private screenPoint: THREE.Vector2 = new THREE.Vector2(0, 0);
    private isDownId: number = -1;
    private renderer: THREE.WebGLRenderer;
    private origionalClickPoint: THREE.Vector2 = new THREE.Vector2(0, 0);
    private clickBoxSize: THREE.Vector2 = new THREE.Vector2(300, 200);
    private dragBoxSize: THREE.Vector2 = new THREE.Vector2(50, 50);
    private maxDragDistance: number = 50;
    private screenWidthMultiplier: number = 1;


    constructor(renderer: THREE.WebGLRenderer, clickBoxSize: THREE.Vector2, screenWidthMultiplier: number) {
        this.renderer = renderer;
        this.clickBoxSize = clickBoxSize;
        this.screenWidthMultiplier = screenWidthMultiplier;
    }

    /**
     * called when touch input, or mouse is pressed down. 
     * this isDownId of the event is the multitouch id, or 10 if it is mouse. -1 is is is not down.
     * checks if within the vjoy area, then checks if that vjoy is being held down.
     * if it is not being held down, sets that vjoy to true, and sets the screenPoint
     * and origionalClickPoint for that vJoy.
     * @param x 
     * @param y 
     * @param id 
     */
    eventDownVJoy(pos: THREE.Vector2, id: number) {
        const rect: DOMRect = this.renderer.domElement.getBoundingClientRect();
        // only register clicks in the click box area, click box size is the bounds, drag box size is how much further it 
        //extends so there is a margin for dragging.
        if ((pos.x > rect.width - this.clickBoxSize.x - this.dragBoxSize.x) &&
            (pos.y > rect.height - this.clickBoxSize.y - this.dragBoxSize.y) &&
            (pos.x < rect.width - this.dragBoxSize.x) &&
            (pos.y < rect.height - this.dragBoxSize.y)) {
            this.origionalClickPoint.copy(pos);
            this.isDownId = id;
            this.updateScreenPoint(pos);
        }
    }

    /**
     * called when touch or mouse is released, passes the id for the event.
     * the isDownId is the mulittouch id, mouse is 10, -1 is it is not down.
     */
    eventUpVJoy(id: number) {
        if (id === this.isDownId) {
            //set to -1 to represent it is not down.
            this.isDownId = -1;
        }
    }

    /**
     * called when the touch or mouse is moved, is passed the id for the event, and the event, x and y.
     * checks if the passed id matches the isDownId, if it does not ends the function.
     * checks if the pos is within bounds, if it is it moves calls UpdateScreenPoint to move the vjoy then ends.
     * then it gets the slope of the vjoy from the origin point to the dragged point.
     * then it checks if the pos is above the top bounds, and if it fits inside the top bounds if it is above.
     * if it is it calls UpdateScreenPoint then ends.
     * 
     */
    eventMoveVJoy(pos: THREE.Vector2, id: number) {
        //end function if id of input for this vjoy does not match input
        if (this.isDownId != id) {
            return;
        }
        //if within bounds move vjoy
        if (this.isPosWithinDragBounds(pos)) {
            this.updateScreenPoint(pos);
            return;
        }
        //calculate the slope
        const slope = this.calucSlope(pos);
        //if above bounds check if it fits in top boundary.
        let newPos = this.calcPosWhenOutOfBoundsInTopBounds(pos, slope);
        if (newPos) {
            this.updateScreenPoint(newPos);
            return;
        }



        return;
        // const clampedVJoy: THREE.Vector2 = this.clampVJoy(pos);
        // this.updateScreenPoint(this.origionalClickPoint.clone().add(clampedVJoy));
        // return;

        // if (this.isPosWithinDragBounds(pos)) {
        //     //pos within bounds, just update screen point to pos.
        //     this.updateScreenPoint(pos);
        //     return;
        // }
        // let slope = calcSlope(pos, this.origionalClickPoint);
        // let xPosAtBounds = calcX1UsingPointSlopeForm(slope, this.origionalClickPoint, this.calcInnerYBounds());
        // if (this.isXWithinDragBounds(xPosAtBounds)) {
        //     this.updateScreenPoint(new THREE.Vector2(xPosAtBounds, this.calcInnerYBounds()));
        //     // console.log(" within x drag bounds ", xPosAtBounds);
        //     return;
        // }
        // let yPosAtBounds = calcY1UsingPointSlopeForm(slope, this.origionalClickPoint, this.calcInnerXBounds());
        // this.updateScreenPoint(new THREE.Vector2(this.calcInnerXBounds(), yPosAtBounds));
        // // console.log("within y drag bounds ", yPosAtBounds);
    }

    /**
     * checks if pos is above the top bounds, and if it fits in the top bounds when
     * fittinmg it within the bounds it returns the new pos, otherwise
     * returns null.
     * @param pos 
     * @param slope 
     * @returns 
     */
    calcPosWhenOutOfBoundsInTopBounds(pos: THREE.Vector2, slope: number): THREE.Vector2 | null {
        if (this.isYWithinTopDragBounds(pos.y)) {
            return null;
        }
        //calc y for the top bounds
        const y = this.calcInnerYBounds();
        //calc x for the slope form originationg point intercepting with the top bounds.
        const x = calcX1UsingPointSlopeForm(slope, this.origionalClickPoint, y);
        //check if x, y fits within the drag bounds, and if so return the new pos.
        if ((this.isXWithinDragBounds(x))) {
            return new THREE.Vector2(x, y);
        }
        return null;
    }


    /**
     * check if x and y are within drag bounds
     */
    isPosWithinDragBounds(pos: THREE.Vector2): boolean {
        const rect = this.renderer.domElement.getBoundingClientRect();
        if (this.isXWithinDragBounds(pos.x) && this.isYWithinDragBounds(pos.y)) {
            return true;
        }
        return false;
    }

    /**
     * check if x is within the drag bounds box size.
     * @param x 
     * @returns 
     */
    isXWithinDragBounds(x: number): boolean {
        if ((this.isXWithinLeftDragBounds(x)) && (this.isXWithinRightDragBounds(x))) {
            return true;
        }
        return false;
    }

    /**
     * is x within left drag bounds
     */
    isXWithinLeftDragBounds(x: number): boolean {
        if (x > this.calcInnerXBounds()) {
            return true;
        }
        return false;
    }

    /**
     * is x within right drag bounds
     */
    isXWithinRightDragBounds(x: number): boolean {
        if (x < this.calcOuterXBounds()) {
            return true;
        }
        return false;
    }

    /**
     * check if y is within the drag bounds box size
     * @param y 
     * @returns 
     */
    isYWithinDragBounds(y: number): boolean {
        if (this.isYWithinTopDragBounds(y)) {
            return true;
        }
        return false;
    }

    /**
     * is y within top bounds
     */
    isYWithinTopDragBounds(y: number): boolean {
        if (y > this.calcInnerYBounds()) {
            return true;
        }
        return false;
    }

    /**
     * is y within bottom drag bounds
     */
    isYWithinBottomDragBounds(y: number): boolean {
        if (y < this.calcOuterYBounds()) {
            return true;
        }
        return false;
    }

    /**
     * calculates and returns the inner y bounds where the vjoy can be within when dragging.
     * @returns 
     */
    calcInnerYBounds(): number {
        const rect = this.renderer.domElement.getBoundingClientRect();
        return (rect.height - this.clickBoxSize.y - (this.dragBoxSize.y * 2))
    }

    /**
     * calculate and returns the outer y bounds where vjoy can be within when dragging.
     */
    calcOuterYBounds(): number {
        const rect = this.renderer.domElement.getBoundingClientRect();
        return (rect.height)
    }

    /**
     * calculates and returns the inner x bounds where the vJoy can be within when dragging.
     * @returns 
     */
    calcInnerXBounds(): number {
        const rect = this.renderer.domElement.getBoundingClientRect();
        return (rect.width - this.clickBoxSize.x - (this.dragBoxSize.x * 2));
    }

    /**
     * calculates and returns the outer x bounds where the vjoy can be when dragging.
     * @returns 
     */
    calcOuterXBounds(): number {
        const rect = this.renderer.domElement.getBoundingClientRect();
        return (rect.width);
    }


    /**
     * calculate the slope for the x and y relative to the origional point.
     */
    calucSlope(pos: THREE.Vector2): number {
        return (this.origionalClickPoint.y - pos.y) / (this.origionalClickPoint.x - pos.x);
    }

    /**
     * calculate x for y and slope
     */
    calcXFromSlope(slope: number, y: number): number {
        return (y / slope);
    }
    /**
     * calculate y for x and the slope
     */
    calcYFromSlope(slope: number, x: number): number {
        return (x * slope);
    }

    /**
     * calculate the amount pos has passed the bounds on the y axis
     */
    calcYOutOfBounds(pos: THREE.Vector2, rect: DOMRect): number {
        if (pos.y < (rect.height - (this.dragBoxSize.y * 2) - this.clickBoxSize.y)) {
            return pos.y - (rect.height - (this.dragBoxSize.y * 2) - this.clickBoxSize.y);
        }
        return 0
    }

    /**
     * set x and y to within bounds.
     */
    getBoundsOfPos(pos: THREE.Vector2, rect: DOMRect): THREE.Vector2 {
        //the slope of the vJoy.
        this.calucSlope(pos);
        console.log(this.calcYOutOfBounds(pos, rect));
        return pos;

    }


    /**
     * update screen point
     * 
     */
    updateScreenPoint(pos: THREE.Vector2) {
        this.screenPoint.set(pos.x, pos.y);
    }

    /**
     * get the screen point
     */
    getScreenPoint(): THREE.Vector2 {
        return this.screenPoint;
    }

    /**
     * return if this vjoy is held down, if it is not -1 it is held down.
     */
    getDown(): boolean {
        return this.isDownId !== -1;
    }

    /**
     * returns a clamped vector2 from the origion point to the 
     * passed point. this vector is fitting within a square gate of bounds of this.dragboxSize.
     * @param pos 
     */
    clampVJoy(pos: THREE.Vector2): THREE.Vector2 {
        const negativeBounds: THREE.Vector2 = this.dragBoxSize.clone().negate();
        const vJoyDragVector: THREE.Vector2 = pos.sub(this.origionalClickPoint);
        const clampedVector: THREE.Vector2 = new THREE.Vector2(clamp(vJoyDragVector.x, negativeBounds.x, this.dragBoxSize.x),
            clamp(vJoyDragVector.y, negativeBounds.y, this.dragBoxSize.y));
        return clampedVector;
    }

    normalizeClampedVJoy(clampedVector: THREE.Vector2): THREE.Vector2 {
        const normalizedDistanceOfSquareGateVJoy: THREE.Vector2 = new THREE.Vector2(
            clampedVector.x / this.dragBoxSize.x,
            clampedVector.y / this.dragBoxSize.y
        );
        return normalizedDistanceOfSquareGateVJoy;
    }

}