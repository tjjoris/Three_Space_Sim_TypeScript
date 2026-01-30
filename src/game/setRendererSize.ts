import * as THREE from 'three';

/**
 * sets the renderer and aspect to the window size. called from resize event.
 */
export default class SetRendererSize {
    renderer: THREE.WebGLRenderer;
    camera: THREE.PerspectiveCamera;

    constructor(renderer: THREE.WebGLRenderer, camera: THREE.PerspectiveCamera) {
        this.renderer = renderer;
        this.camera = camera;
    }

    setSize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        this.renderer.setSize(width, height);
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
    }
}