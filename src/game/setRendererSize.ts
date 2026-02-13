import * as THREE from 'three';

type Listener = () => void;

/**
 * sets the renderer and aspect to the window size. called from resize event.
 */
export default class SetRendererSize {
    renderer: THREE.WebGLRenderer;
    camera: THREE.PerspectiveCamera;
    private listeners: Listener[] = []; //listeners subscribed to.
    private state: { isLandscape: boolean; } = { isLandscape: false };

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

    /**
     * 
     * @returns if in landscape
     */
    getIsLandscape(): boolean {
        if (window.innerWidth > window.innerHeight) {
            return true;
        }
        return false;
    }

    /**
     * 
     * @returns state including landscape boolean
     */
    getState() {
        this.state.isLandscape = this.getIsLandscape();
        return this.state;
    }

    /**
     * subscribe to listener for useLandscapeStore
     * @param listener 
     */
    public subscribe(listener: Listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter((l) => l !== listener);
        }
        console.log("usesyncexternalstore listeners ", this.listeners.length);
    }

    /**
     * notify all listeners
     */
    private notify() {
        this.listeners.forEach((listener) => listener());
    }
}