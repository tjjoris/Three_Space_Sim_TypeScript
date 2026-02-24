import * as THREE from "three";
import type Tickable from "../../game/tickable";
import type CastRay from "../../axes/castRay";
import VJoyInput from '../vjoy/vJoyInput';

export default class VJoyUpdater implements Tickable {
    private vJoySprite: THREE.Sprite | null = null;
    private camera: THREE.Camera;
    private castRay: CastRay;
    private vJoyInput: VJoyInput;

    constructor(vJoySprite: THREE.Sprite, camera: THREE.Camera, castRay: CastRay, vJoyInput: VJoyInput) {
        this.vJoySprite = vJoySprite;
        this.camera = camera;
        this.camera;
        this.castRay = castRay;
        this.vJoyInput = vJoyInput;
    }


    tick(deltaTime: number) {
        deltaTime;
        if (this.vJoySprite) {
            const worldPos: THREE.Vector3 = this.castRay.castRay(this.vJoyInput.getScreenPoint());
            this.vJoySprite.position.copy(worldPos);
            if (this.vJoyInput.getDown() === true) {
                this.vJoySprite.visible = true;
                this.vJoySprite.material.opacity = 1;
            }
            else {
                // this.vJoySprite.visible = false;
                this.vJoySprite.material.transparent = true;
                this.vJoySprite.material.opacity = 0.5;
                const worldPos: THREE.Vector3 = this.castRay.castRay(this.vJoyInput.getCenterPoint());
                this.vJoySprite.position.copy(worldPos);
            }
            return;
        }
        console.error("no vjoy sprite in vJoyUpdater");
    }
}