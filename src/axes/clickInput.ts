import * as THREE from 'three';
import VJoyInput from '../ui/vjoy/vJoyInput';

/**
 * this class handles click input for the appplication.
 * it listens for click events and passes the x and y pointer 
 * coordinates to the vJoy handler.
 */
export default class ClickInput {
    private screenPoint: THREE.Vector2 = new THREE.Vector2(0, 0);
    private mouseDown: boolean = false;
    private renderer: THREE.WebGLRenderer;
    private origionalClickPoint: THREE.Vector2 = new THREE.Vector2(0, 0);
    private clickBoxSize: THREE.Vector2 = new THREE.Vector2(300, 200);
    private dragBoxSize: THREE.Vector2 = new THREE.Vector2(50, 50);
    private leftVJoyInput: VJoyInput;

    constructor(renderer: THREE.WebGLRenderer, leftVJoyInput: VJoyInput) {
        this.renderer = renderer;
        this.initClick(renderer.domElement);
        this.leftVJoyInput = leftVJoyInput
    }

    /**
     * initilize click event listeners by binding click functions to renderer 
     * dom element click events.
     * @param rendererDOM html dom element
     */
    initClick(rendererDom: HTMLElement) {
        rendererDom.addEventListener("pointerdown", this.onClick.bind(this), false);
        rendererDom.addEventListener("pointermove", this.onPointerMove.bind(this), false);
        rendererDom.addEventListener("pointerup", this.onPointerEnd.bind(this), false);
        console.log("ClickInput initialized");
    }
    /**
     * call on mousedown event, sets mouseDown to true, 
     * and sets the screen point.
     * 
     * @param event 
     */
    onClick(event: MouseEvent) {
        // const rect = this.renderer.domElement.getBoundingClientRect();
        // // only register clicks in the click box area, click box size is the bounds, drag box size is how much further it 
        // //extends so there is a margin for dragging.
        // if ((event.x > rect.width - this.clickBoxSize.x - this.dragBoxSize.x) &&
        //     (event.y > rect.height - this.clickBoxSize.y - this.dragBoxSize.y) &&
        //     (event.x < rect.width - this.dragBoxSize.x) &&
        //     (event.y < rect.height - this.dragBoxSize.y)) {
        //     this.origionalClickPoint.set(event.x, event.y);
        //     this.mouseDown = true;
        //     this.updateScreenPoint(event);
        // }
        this.leftVJoyInput.eventDownVJoy(new THREE.Vector2(event.clientX, event.clientY), 10);
    }

    /**
     * call on pointer move event, if mousedown is true, 
     * updates the screen point.
     * @param event 
     */
    onPointerMove(event: MouseEvent) {
        // if (this.mouseDown === true) {
        //     const rect = this.renderer.domElement.getBoundingClientRect();
        //     if ((event.x > rect.width - (this.dragBoxSize.x * 2) - this.clickBoxSize.x) &&
        //         (event.y > rect.height - (this.dragBoxSize.y * 2) - this.clickBoxSize.y)) {
        //         this.updateScreenPoint(event);
        //     }
        // }
        this.leftVJoyInput.eventMoveVJoy(new THREE.Vector2(event.clientX, event.clientY), 10);
    }

    /**
     * call on pointer end event, sets the mouseDown boolean to false.
     * @param event 
     */
    onPointerEnd(event: MouseEvent) {
        event;
        // this.mouseDown = false;
        this.leftVJoyInput.eventUpVJoy(10);
    }

    /**
     * update screen point
     * 
     */
    updateScreenPoint(event: MouseEvent) {
        this.screenPoint.set(event.clientX, event.clientY);
    }

    /**
     * get the screen point
     */
    getScreenPoint(): THREE.Vector2 {
        return this.screenPoint;
    }

    /**
     * get the mouseDown boolean
     */
    // getMouseDown(): boolean {
    //     return this.mouseDown;
    // }

}