import * as THREE from "three";
import type { Tickable } from "../../game/tickable";
import type CastRay from "../../axes/castRay";
import VJoyInput from '../vjoy/vJoyInput';

export default class VJoyUpdater implements Tickable {
    private xOffset: number = 0;
    private yOffset: number = 0;
    private vJoySprite: THREE.Sprite | null = null;
    private camera: THREE.Camera;
    private castRay: CastRay;
    private vJoyInput: VJoyInput;

    constructor(vJoySprite: THREE.Sprite, camera: THREE.Camera, castRay: CastRay, vJoyInput: VJoyInput, xOffset: number = 0, yOffset: number = 0) {
        this.vJoySprite = vJoySprite;
        this.xOffset = xOffset;
        this.yOffset = yOffset;
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
            }
            else {
                this.vJoySprite.visible = false;
            }
            return;
        }
        console.error("no vjoy sprite in vJoyUpdater");
    }
}