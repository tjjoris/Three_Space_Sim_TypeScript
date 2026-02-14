import * as THREE from 'three';

type Listener = () => void;

/**
 * sets the renderer and aspect to the window size. called from resize event.
 * uses useSyncExternalStore (../stores/UseLandscapeStore.ts) for updating the react component that overlays 
 * for landscape mode.
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
        this.changeStateLandscape();
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
     * change state of if in landscape
     */
    changeStateLandscape() {
        const newState: boolean = this.getIsLandscape();
        if (newState !== this.state.isLandscape) {
            console.log("resize state changed");
            //you need to rewrite the state otherwise react sees the 
            //mutable state and does not update.
            this.state = { isLandscape: newState };
            this.notify();
        }
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
        console.log("in listener");
        this.listeners.forEach((listener) => listener());
    }
}