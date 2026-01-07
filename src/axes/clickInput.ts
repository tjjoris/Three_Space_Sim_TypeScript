import * as THREE from 'three';
import type { Point } from './point.ts';
import VJoyUpdater from '../ui/vjoy/vJoyUpdater.ts';

/**
 * this class handles click input for the appplication.
 * it listens for click events and passes the x and y pointer 
 * coordinates to the vJoy handler.
 */
export default class ClickInput {
    private point: Point = { x: 0, y: 0 };
    private vJoyUpdater: VJoyUpdater;

    constructor(renderer: THREE.WebGLRenderer, vJoyUpdater: VJoyUpdater) {
        this.vJoyUpdater = vJoyUpdater;
        this.initClick(renderer);
    }

    /**
     * initilize click event listeners by binding click functions to renderer 
     * dom element click events.
     * @param renderer 
     */
    initClick(renderer: THREE.WebGLRenderer) {
        //variable to store renderer dom element.
        const rendererDom = renderer.domElement;
        rendererDom.addEventListener("click", this.onClick.bind(this), false);
        rendererDom.addEventListener("pointermove", this.onPointerMove.bind(this), false);
        console.log("ClickInput initialized");
    }
    /**
     * call on click event, updates the point and passes it to the vJoy updater
     * @param event 
     */
    onClick(event: MouseEvent) {
        this.point = { x: event.clientX, y: event.clientY };
        this.vJoyUpdater.setPoint(this.point);
        console.log('click at:', event.clientX, event.clientY);
    }

    /**
     * call on pointer move event, updates the point and passes it to the vJoy updater
     * @param event 
     */
    onPointerMove(event: MouseEvent) {
        this.point = { x: event.clientX, y: event.clientY };
        this.vJoyUpdater.setPoint(this.point);
    }


}