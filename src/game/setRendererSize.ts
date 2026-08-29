import * as THREE from 'three';
import GameState from "../ui/menu/gameState";

type Listener = () => void;

/**
 * sets the renderer and aspect to the window size. called from resize event.
 * uses useSyncExternalStore (../stores/UseGameStateStore.ts) for updating the react component that overlays 
 * for landscape mode.
 */
export default class SetRendererSize {
    renderer: THREE.WebGLRenderer;
    camera: THREE.PerspectiveCamera;
    private listeners: Listener[] = []; //listeners subscribed to.
    private state: boolean = false ;
	private gameState: GameState;

    constructor(renderer: THREE.WebGLRenderer, camera: THREE.PerspectiveCamera, gameState: GameState) {
        this.renderer = renderer;
        this.camera = camera;
	this.gameState = gameState;
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
        this.state = this.getIsLandscape();
        return this.state;
    }

    /**
     * change state of if in landscape
     */
    changeStateLandscape() {
        const newState: boolean = this.getIsLandscape();
        if (newState !== this.state) {
            //you need to rewrite the state otherwise react sees the 
            //mutable state and does not update.
            this.state = newState ;
            //this.notify();
	    console.log("set to landscape ", newState);
	    this.gameState.setStateLandscapeMode( newState ) ;
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
    }

    /**
     * notify all listeners
     */
    private notify() {
        console.log("in listener");
        this.listeners.forEach((listener) => listener());
    }
}
