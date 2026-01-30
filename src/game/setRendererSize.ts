import * as THREE from 'three';

export default class SetRendererSize {
    private x: number;
    private y: number;
    renderer: THREE.WebGLRenderer;
    camera: THREE.Camera;

    constructor(x: number, y: number, renderer: THREE.WebGLRenderer, camera: THREE.Camera) {
        this.x = x;
        this.y = y;
        this.renderer = renderer;
        this.camera = camera;
    }

    checkAndSetSize() {
        this.renderer.setSize(this.x, this.y);
        // this.camera.
    }
}