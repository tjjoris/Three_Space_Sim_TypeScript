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
    eventDownVJoy(x: number, y: number, id: number) {
        const rect = this.renderer.domElement.getBoundingClientRect();
        // only register clicks in the click box area, click box size is the bounds, drag box size is how much further it 
        //extends so there is a margin for dragging.
        if ((x > rect.width - this.clickBoxSize.x - this.dragBoxSize.x) &&
            (y > rect.height - this.clickBoxSize.y - this.dragBoxSize.y) &&
            (x < rect.width - this.dragBoxSize.x) &&
            (y < rect.height - this.dragBoxSize.y)) {
            this.origionalClickPoint.set(x, y);
            this.isDownId = id;
            this.updateScreenPoint(new THREE.Vector2(x, y));
        }
    }

    /**
     * called when touch or mouse is released, passes the id for the event.
     * the isDownId is the mulittouch id, mouse is 10, -1 is it is not down.
     */
    eventUpVjoy(id: number) {
        if (id === this.isDownId) {
            //set to -1 to represent it is not down.
            this.isDownId = -1;
        }
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