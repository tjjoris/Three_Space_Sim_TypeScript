import * as THREE from 'three';

export default class VJoyInput {
    private screenPoint: THREE.Vector2 = new THREE.Vector2(0, 0);
    private isDownId: number = -1;
    private renderer: THREE.WebGLRenderer;
    private origionalClickPoint: THREE.Vector2 = new THREE.Vector2(0, 0);
    private clickBoxSize: THREE.Vector2 = new THREE.Vector2(300, 200);
    private dragBoxSize: THREE.Vector2 = new THREE.Vector2(50, 50);
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
     * checks if the passed id matches the isDownId, and if it does, sets the x and y. 
     * after doing so, it checks if they are within bounds, and if they are not, sets them to bounds.
     */
    eventMoveVJoy(pos: THREE.Vector2, id: number) {

        if (this.isDownId == id) {
            if (this.posWithinDragBounds(pos)) {
                //pos within bounds, just update screen point to pos.
                this.updateScreenPoint(pos);
            }

        }
    }

    /**
     * check if x and y are within drag bounds
     */
    posWithinDragBounds(pos: THREE.Vector2): boolean {
        const rect = this.renderer.domElement.getBoundingClientRect();
        if ((pos.y > rect.height - this.clickBoxSize.y - (this.dragBoxSize.y * 2)) &&
            (pos.x > rect.width - this.clickBoxSize.x - (this.dragBoxSize.x * 2))) {
            return true;
        }
        return false;
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

}