import * as THREE from 'three';
import type { Point } from './point.ts';
import VJoyUpdater from '../ui/vjoy/vjoyUpdater.ts';

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

    initClick(renderer: THREE.WebGLRenderer) {
        renderer.domElement.addEventListener("click", this.onClick.bind(this), false);
        console.log("ClickInput initialized");
    }

    onClick(event: MouseEvent) {
        this.point = { x: event.clientX, y: event.clientY };
        this.vJoyUpdater.setPoint(this.point);
        console.log('click at:', event.clientX, event.clientY);
    }


}