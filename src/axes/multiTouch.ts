import * as THREE from 'three';
import type { Point } from './point.ts';
import type VJoyInput from '../ui/vjoy/vJoyInput.ts';

export default class MultiTouch {
    renderer: THREE.WebGLRenderer;
    pointers = new Map<number, Point>();
    leftVJoyInput: VJoyInput;
    rightVJoyInput: VJoyInput;

    constructor(renderer: THREE.WebGLRenderer, leftVJoyInput: VJoyInput, rightVJoyInput: VJoyInput) {
        this.renderer = renderer;
        this.renderer.domElement.style.touchAction = 'none'; // disable default touch actions
        this.leftVJoyInput = leftVJoyInput;
        this.rightVJoyInput = rightVJoyInput;
        this.initMultiTouch();
    }

    initMultiTouch() {
        this.renderer.domElement.addEventListener('touchstart', this.onTouchStart.bind(this), false);
        this.renderer.domElement.addEventListener('touchmove', this.onTouchMove.bind(this), false);
        this.renderer.domElement.addEventListener('touchend', this.onTouchEnd.bind(this), false);
        this.renderer.domElement.addEventListener('touchcancel', this.onTouchEnd.bind(this), false);
        console.log("renderer dom element", this.renderer.domElement)
        console.log("MultiTouch initialized");
    }

    /**
     * event triggers on touch start, it adds touch points to the pointers map
     * @param event 
     */
    onTouchStart(event: TouchEvent) {
        // console.log("touchstart event");
        // alert("touchstart event" + event);
        for (let i = 0; i < event.changedTouches.length; i++) {
            const touch = event.changedTouches[i];
            this.pointers.set(touch.identifier, { x: touch.clientX, y: touch.clientY });
            // console.log('touch start:', touch.identifier, touch.clientX, touch.clientY);
            const pos: THREE.Vector2 = new THREE.Vector2(touch.clientX, touch.clientY);
            this.leftVJoyInput.eventDownVJoy(pos, touch.identifier);
            this.rightVJoyInput.eventDownVJoy(pos, touch.identifier);

        }
    }

    /**
     * event triggers on touch move, it updates touch points in the pointers map
     * @param event 
     */
    onTouchMove(event: TouchEvent) {
        console.log("touchmove event");
        for (let i = 0; i < event.changedTouches.length; i++) {
            const touch = event.changedTouches[i];
            this.pointers.set(touch.identifier, { x: touch.clientX, y: touch.clientY });
            // console.log('touch move:', touch.identifier, touch.clientX, touch.clientY);
            const pos: THREE.Vector2 = new THREE.Vector2(touch.clientX, touch.clientY);
            this.leftVJoyInput.eventMoveVJoy(pos, touch.identifier);
            this.rightVJoyInput.eventMoveVJoy(pos, touch.identifier);
        }
    }

    /**
     * event triggers on touch end or touch cancel, it removes touch points from the pointers map
     * @param event 
     */
    onTouchEnd(event: TouchEvent) {
        console.log("touchend event");
        for (let i = 0; i < event.changedTouches.length; i++) {
            const touch = event.changedTouches[i];
            this.pointers.delete(touch.identifier);
            // console.log('touch end:', touch.identifier, touch.clientX, touch.clientY);
            this.leftVJoyInput.eventUpVJoy(touch.identifier);
            this.rightVJoyInput.eventUpVJoy(touch.identifier);
        }
    }

}