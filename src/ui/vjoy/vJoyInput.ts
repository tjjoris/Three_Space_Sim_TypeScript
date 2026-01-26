import * as THREE from 'three';
import calcSlope from '../../helpers/calcSlope';
import calcX1UsingPointSlopeForm from '../../helpers/calcX1UsingPointSlopeForm';
import calcY1UsingPointSlopeForm from '../../helpers/calcY1UsingPointSlopeForm';
import Axis from '../../axes/axis';
import ConvertVJoyToNormalizedAxis from '../../axes/convertVJoyToNormalizedAxis';
// import clamp from '../../helpers/clamp';
// import type { ThreeMFLoader } from 'three/examples/jsm/Addons.js';

/**
 * this class is used for moving hte vjoy based on inputs.
 * the mouse or touch talks to this class, and each vjoy corresponds with an input, for example one of multiple
 * touch.
 * This class is responsible for making the vjoy fit within bounds when dragged out of bounds.
 */
export default abstract class VJoyInput {
    private screenPoint: THREE.Vector2 = new THREE.Vector2(0, 0);
    private isDownId: number = -1;
    private renderer: THREE.WebGLRenderer;
    private origionalClickPoint: THREE.Vector2 = new THREE.Vector2(0, 0);
    private clickBoxSize: THREE.Vector2 = new THREE.Vector2(0.2, 0.2);
    private dragBoxSize: THREE.Vector2 = new THREE.Vector2(0.05, 0.05);
    private maxDragDistance: number = 50;
    //used for math for comparing input positions to left or right vjoy, is 1 when on the right.
    protected screenWidthMultiplier: number = 1;
    //used for math for comparing input positions to left or right vjoy, is 0 when on the right.
    private boxMultiplier: number = 1;
    /**
     * class variables for the function which checks if the x is within click or drag bounds.
     * these variables change depending on if it's a left or right vjoy and are set in the sub class.
     */
    protected boxLeftMult: number = 1;
    protected leftPaddingMult: number = 2;
    protected innerPaddingMult: number = 1;
    protected rightPaddingMult: number = 0;
    protected boxRightMult: number = 0;
    private axisX: Axis;
    private axisY: Axis;


    constructor(renderer: THREE.WebGLRenderer, screenWidthMultiplier: number, boxMultiplier: number, axisX: Axis, axisY: Axis) {
        this.renderer = renderer;
        this.screenWidthMultiplier = screenWidthMultiplier;
        this.boxMultiplier = boxMultiplier;
        //calling class variables to remove build errors:
        this.maxDragDistance;
        this.screenWidthMultiplier;
        this.boxMultiplier;
        this.axisX = axisX;
        this.axisY = axisY;
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
        // const rect: DOMRect = this.renderer.domElement.getBoundingClientRect();
        // only register clicks in the click box area, click box size is the bounds, drag box size is how much further it 
        //extends so there is a margin for dragging.
        if (this.isPosWithinClickBounds(pos)) {
            this.origionalClickPoint.copy(pos);
            this.isDownId = id;
            this.updateScreenPointAndAxes(pos);
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
            this.updateScreenPointAndAxes(pos);
            return;
        }
        //calculate the slope
        const slope = calcSlope(pos, this.origionalClickPoint);
        //if pos fits in top bounds when above.
        let newPos = this.calcPosWhenOutOfBoundsInTopBounds(pos, slope);
        if (newPos) {
            this.updateScreenPointAndAxes(newPos);
            return;
        }
        //if pos fits in left bounds when to left.
        newPos = this.calcPosWhenOutOfBoundsInSideBounds(pos, slope);
        if (newPos) {
            this.updateScreenPointAndAxes(newPos);
            return;
        }
        return;
    }

    /**
     * this function is used by the sub methods to get the x pos of vjoy box or outer bounds(padding).
     * @param boxMult 
     * @param boundsMult 
     */
    calcXBoundsWithParams(rectMult: number, boxMult: number, paddingMult: number): number {
        const rect = this.renderer.domElement.getBoundingClientRect();
        return ((rect.width * rectMult) + (this.calcClickBoxWidth() * boxMult) + (this.calcDragBoxWidth() * paddingMult));
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

    /**
     * checks if pos is within the side bounds, if it is it ends, 
     * if not it calculates the x of the side bounds, and the y where it intercepts.
     * if the y fits within bounds, it returns the pos, else it returns null.
     * @param pos 
     * @param slope 
     * @returns 
     */
    calcPosWhenOutOfBoundsInSideBounds(pos: THREE.Vector2, slope: number): THREE.Vector2 | null {
        const x = this.calcSideBoundsIfDraggingOutSide(pos);
        if (x === null) {
            return null;
        }
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
        return (rect.height - this.calcClickBoxHeight() - (this.calcDragBoxHeight() * 2))
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
        return this.calcXBoundsWithParams(this.screenWidthMultiplier, this.boxLeftMult, this.leftPaddingMult);
    }

    /**
     * calculates and returns the outer x bounds where the vjoy can be when dragging.
     * @returns 
     */
    calcRightXDragBounds(): number {
        return this.calcXBoundsWithParams(this.screenWidthMultiplier, this.boxRightMult, this.rightPaddingMult);
    }

    /**
     *used for click bounds.
     */

    /**
     * calculate if the pos is within the click bounds.
     * @param pos 
     * @returns 
     */
    isPosWithinClickBounds(pos: THREE.Vector2): boolean {
        if ((pos.x > this.calcLeftClickBounds()) &&
            (pos.x < this.calcRightClickBounds()) &&
            (pos.y > this.calcTopClickBounds()) &&
            (pos.y < this.calcBottomClickBounds())) {
            return true;
        }
        return false;
    }

    /**
     * calc top click bounds
     */
    calcTopClickBounds(): number {
        const rect = this.renderer.domElement.getBoundingClientRect();
        return (rect.height - this.calcClickBoxHeight() - this.calcDragBoxHeight());
    }

    /**
     * calc bottom click bounds
     */
    calcBottomClickBounds(): number {
        const rect = this.renderer.domElement.getBoundingClientRect();
        return (rect.height - this.dragBoxSize.y);
    }

    /**
     * calc left click bounds
     */
    calcLeftClickBounds(): number {
        return this.calcXBoundsWithParams(this.screenWidthMultiplier, this.boxLeftMult, this.innerPaddingMult);
    }


    /**
     * calc right click bounds
     */
    calcRightClickBounds(): number {
        return this.calcXBoundsWithParams(this.screenWidthMultiplier, this.boxRightMult, this.innerPaddingMult);
    }


    /**
     * update the axes on the axis objects
     * update screen point
     * 
     */
    updateScreenPointAndAxes(pos: THREE.Vector2) {
        this.axisX.setValue(ConvertVJoyToNormalizedAxis(this.origionalClickPoint.x, pos.x, this.calcMaxDeflectionX()));
        this.axisY.setValue(ConvertVJoyToNormalizedAxis(this.origionalClickPoint.y, pos.y, this.calcMaxDeflectionY()));
        this.screenPoint.set(pos.x, pos.y);
    }

    /**
     * get the screen point
     */
    getScreenPoint(): THREE.Vector2 {
        return this.screenPoint;
    }

    /**
     * get screen point x
     */
    getScreenPointX(): number {
        return this.screenPoint.x;
    }

    /**
     * get screen point y
     */
    get screenPointY(): number {
        return this.screenPoint.y;
    }

    /**
     * return if this vjoy is held down, if it is not -1 it is held down.
     */
    getDown(): boolean {
        return this.isDownId !== -1;
    }

    /**
     * get max deflection for x (half the click box width)
     */
    calcMaxDeflectionX(): number {
        return (this.calcRightClickBounds() - this.calcLeftClickBounds()) * 0.5;
    }

    /**
     * calc max deflection for y (half th eclick box height)
     */
    calcMaxDeflectionY(): number {
        return (this.calcTopClickBounds() - this.calcBottomClickBounds()) * 0.5;
    }

    /**
     * calculate the click box width based on the rect.
     */
    calcClickBoxWidth(): number {
        const widthOrHeight: number = this.findRectWidthOrHeightWhatsGreater();
        return widthOrHeight * this.clickBoxSize.x;
    }

    /**
     * calculate the click box height based on the rect.
     * 
     */

    calcClickBoxHeight(): number {
        const widthOrHeight: number = this.findRectWidthOrHeightWhatsGreater();
        return widthOrHeight * this.clickBoxSize.y;
    }

    /**
     * calculate the drag box width based on the rect.
     */
    calcDragBoxWidth(): number {
        const widthOrHeight: number = this.findRectWidthOrHeightWhatsGreater();
        return widthOrHeight * this.dragBoxSize.x;
    }

    /**
     * calculate the drag box height based on the rect.
     */
    calcDragBoxHeight(): number {
        const widthOrHeight: number = this.findRectWidthOrHeightWhatsGreater();
        return widthOrHeight * this.dragBoxSize.y;
    }

    /**
     * return rect width or height, whatever is greater or equal.
     */
    findRectWidthOrHeightWhatsGreater(): number {
        const rect = this.renderer.domElement.getBoundingClientRect();
        if (rect.height >= rect.width) {
            return rect.height;
        }
        return rect.width;
    }
}