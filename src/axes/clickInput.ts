import * as THREE from 'three';
import VJoyUpdater from '../ui/vjoy/vJoyUpdater.ts';
import CastRay from './castRay.ts';

/**
 * this class handles click input for the appplication.
 * it listens for click events and passes the x and y pointer 
 * coordinates to the vJoy handler.
 */
export default class ClickInput {
    private worldPoint: THREE.Vector2 = new THREE.Vector2(0, 0);
    private vJoyUpdater: VJoyUpdater;
    private castRay: CastRay;
    private mouseDown: boolean = false;

    constructor(renderer: THREE.WebGLRenderer, vJoyUpdater: VJoyUpdater, castRay: CastRay) {
        this.vJoyUpdater = vJoyUpdater;
        this.initClick(renderer.domElement);
        this.castRay = castRay;

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
     * and updates the point and passes it to the vJoy updater
     * @param event 
     */
    onClick(event: MouseEvent) {
        this.mouseDown = true;
        this.setPointUpdateVJoy(event);

    }

    /**
     * call on pointer move event, if mousedown is true, 
     * updates the point and passes it to the vJoy updater
     * @param event 
     */
    onPointerMove(event: MouseEvent) {
        if (this.mouseDown === true) {
            this.setPointUpdateVJoy(event);
        }
    }

    /**
     * call on pointer end event, sets the mouseDown boolean to false.
     * @param event 
     */
    onPointerEnd(event: MouseEvent) {
        event;
        this.mouseDown = false;
    }

    /**
     * set point and pass to vJoy updater
     */
    setPointUpdateVJoy(event: MouseEvent) {
        const pointOnScreenClicked = new THREE.Vector2(event.clientX, event.clientY);
        this.worldPoint.copy(this.castRay.castRay(pointOnScreenClicked));
        this.vJoyUpdater.setPoint(this.worldPoint);
    }

    /**
     * get the point
     */
    getPoint(): THREE.Vector2 {

        return this.worldPoint;
    }

}