import * as THREE from 'three';
import calcSlope from '../../helpers/calcSlope';
import calcX1UsingPointSlopeForm from '../../helpers/calcX1UsingPointSlopeForm';
import calcY1UsingPointSlopeForm from '../../helpers/calcY1UsingPointSlopeForm';
import clamp from '../../helpers/clamp';

/**
 * this class is used for moving hte vjoy based on inputs.
 * the mouse or touch talks to this class, and each vjoy corresponds with an input, for example one of multiple
 * touch.
 * This class is responsible for making the vjoy fit within bounds when dragged out of bounds.
 */
export default class VJoyInput {
    private screenPoint: THREE.Vector2 = new THREE.Vector2(0, 0);
    private isDownId: number = -1;
    private renderer: THREE.WebGLRenderer;
    private origionalClickPoint: THREE.Vector2 = new THREE.Vector2(0, 0);
    private clickBoxSize: THREE.Vector2 = new THREE.Vector2(300, 200);
    private dragBoxSize: THREE.Vector2 = new THREE.Vector2(50, 50);
    private maxDragDistance: number = 50;
    //used for math for comparing input positions to left or right vjoy, is 1 when on the right.
    private screenWidthMultiplier: number = 1;
    //used for math for comparing input positions to left or right vjoy, is 0 when on the right.
    private boxMultiplier: number = 0;


    constructor(renderer: THREE.WebGLRenderer, clickBoxSize: THREE.Vector2, screenWidthMultiplier: number, boxMultiplier: number) {
        this.renderer = renderer;
        this.clickBoxSize = clickBoxSize;
        this.screenWidthMultiplier = screenWidthMultiplier;
        this.boxMultiplier = boxMultiplier;
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
        const slope = calcSlope(pos, this.origionalClickPoint);
        //if pos fits in top bounds when above.
        let newPos = this.calcPosWhenOutOfBoundsInTopBounds(pos, slope);
        if (newPos) {
            this.updateScreenPoint(newPos);
            return;
        }
        //if pos fits in left bounds when to left.
        newPos = this.calcPosWhenOutOfBoundsInLeftBounds(pos, slope);
        if (newPos) {
            this.updateScreenPoint(newPos);
            return;
        }
        return;
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
        const y = this.calcTopYDragBounds();
        //calc x for the slope form originationg point intercepting with the top bounds.
        const x = calcX1UsingPointSlopeForm(slope, this.origionalClickPoint, y);
        //check if x, y fits within the drag bounds, and if so return the new pos.
        if ((this.isXWithinDragBounds(x))) {
            return new THREE.Vector2(x, y);
        }
        return null;
    }

    /**
     * checks if pos is within the left bounds, if it is it ends, 
     * if not it calculates the x of the left bounds, and the y where it intercepts.
     * if the y fits within bounds, it returns the pos, else it returns null.
     * @param pos 
     * @param slope 
     * @returns 
     */
    calcPosWhenOutOfBoundsInLeftBounds(pos: THREE.Vector2, slope: number): THREE.Vector2 | null {
        if (this.isXWithinLeftDragBounds(pos.x)) {
            return null;
        }
        //calc x for the left bounds
        const x = this.calcLeftXDragBounds();
        //calc y for the slope from originating point and intercepting with left bounds.
        const y = calcY1UsingPointSlopeForm(slope, this.origionalClickPoint, x);
        //check if x, y fits within the drag bounds and if so returns the new pos.
        if (this.isYWithinDragBounds(y)) {
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
        if (x > this.calcLeftXDragBounds()) {
            return true;
        }
        return false;
    }

    /**
     * is x within right drag bounds
     */
    isXWithinRightDragBounds(x: number): boolean {
        if (x < this.calcRightXDragBounds()) {
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
        if (y > this.calcTopYDragBounds()) {
            return true;
        }
        return false;
    }

    /**
     * is y within bottom drag bounds
     */
    isYWithinBottomDragBounds(y: number): boolean {
        if (y < this.calcBottomYDragBounds()) {
            return true;
        }
        return false;
    }

    /**
     * calculates and returns the inner y bounds where the vjoy can be within when dragging.
     * @returns 
     */
    calcTopYDragBounds(): number {
        const rect = this.renderer.domElement.getBoundingClientRect();
        return (rect.height - this.clickBoxSize.y - (this.dragBoxSize.y * 2))
    }

    /**
     * calculate and returns the outer y bounds where vjoy can be within when dragging.
     */
    calcBottomYDragBounds(): number {
        const rect = this.renderer.domElement.getBoundingClientRect();
        return (rect.height)
    }

    /**
     * calculates and returns the inner x bounds where the vJoy can be within when dragging.
     * @returns 
     */
    calcLeftXDragBounds(): number {
        const rect = this.renderer.domElement.getBoundingClientRect();
        return (rect.width - this.clickBoxSize.x - (this.dragBoxSize.x * 2));
    }

    /**
     * calculates and returns the outer x bounds where the vjoy can be when dragging.
     * @returns 
     */
    calcRightXDragBounds(): number {
        const rect = this.renderer.domElement.getBoundingClientRect();
        return (rect.width);
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
     * ==================
     * DEPRECIATED FUNCTIONS
     * ==================
     */



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
     * this function is depreciated.
     * calculate the amount pos has passed the bounds on the y axis
     */
    calcYOutOfBounds(pos: THREE.Vector2, rect: DOMRect): number {
        if (pos.y < (rect.height - (this.dragBoxSize.y * 2) - this.clickBoxSize.y)) {
            return pos.y - (rect.height - (this.dragBoxSize.y * 2) - this.clickBoxSize.y);
        }
        return 0
    }

    /**
     * this function is depreciated.
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

    /**
     * this function is depreciated.
     * used to convert a clamped vjoy to have a max x and y of 1.
     * @param clampedVector 
     * @returns 
     */
    normalizeClampedVJoy(clampedVector: THREE.Vector2): THREE.Vector2 {
        const normalizedDistanceOfSquareGateVJoy: THREE.Vector2 = new THREE.Vector2(
            clampedVector.x / this.dragBoxSize.x,
            clampedVector.y / this.dragBoxSize.y
        );
        return normalizedDistanceOfSquareGateVJoy;
    }

}