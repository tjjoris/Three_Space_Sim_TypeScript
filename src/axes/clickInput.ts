import * as THREE from 'three';
import VJoyInput from '../ui/vjoy/vJoyInput';

/**
 * this class handles click input for the appplication.
 * it listens for click events and passes the x and y pointer 
 * coordinates to the vJoy handler.
 */
export default class ClickInput {
    private leftVJoyInput: VJoyInput;
    private rightVJoyInput: VJoyInput;

    constructor(renderer: THREE.WebGLRenderer, leftVJoyInput: VJoyInput, rightVJoyInput: VJoyInput) {
        this.initClick(renderer.domElement);
        this.leftVJoyInput = leftVJoyInput;
        this.rightVJoyInput = rightVJoyInput;
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
     * call on mousedown event, sends vector2 pos of mouse click to vJoyInputs
     * @param event 
     */
    onClick(event: MouseEvent) {
        this.leftVJoyInput.eventDownVJoy(new THREE.Vector2(event.clientX, event.clientY), 10);
        this.rightVJoyInput.eventDownVJoy(new THREE.Vector2(event.clientX, event.clientY), 10);
    }

    /**
     * call on pointer move event, sends vector2 pos of mouse position to vJoyInputs.
     * @param event 
     */
    onPointerMove(event: MouseEvent) {
        this.leftVJoyInput.eventMoveVJoy(new THREE.Vector2(event.clientX, event.clientY), 10);
        this.rightVJoyInput.eventMoveVJoy(new THREE.Vector2(event.clientX, event.clientY), 10);
    }

    /**
     * call on pointer end event, sends id of 10 to vJoyInputs to tell them mouse has been released.
     * @param event 
     */
    onPointerEnd(event: MouseEvent) {
        event;
        this.leftVJoyInput.eventUpVJoy(10);
        this.rightVJoyInput.eventUpVJoy(10);
    }
}