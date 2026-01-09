import * as THREE from "three";
import type { Tickable } from "../../game/tickable";
import type CastRay from "../../axes/castRay";
import type ClickInput from "../../axes/clickInput";

export default class VJoyUpdater implements Tickable {
    private xOffset: number = 0;
    private yOffset: number = 0;
    private vJoySprite: THREE.Sprite | null = null;
    private camera: THREE.Camera;
    private castRay: CastRay;
    private clickInput: ClickInput;

    constructor(vJoySprite: THREE.Sprite, camera: THREE.Camera, castRay: CastRay, clickInput: ClickInput, xOffset: number = 0, yOffset: number = 0) {
        this.vJoySprite = vJoySprite;
        this.xOffset = xOffset;
        this.yOffset = yOffset;
        this.camera = camera;
        this.camera;
        this.castRay = castRay;
        this.clickInput = clickInput;
    }


    tick(deltaTime: number) {
        deltaTime;
        if (this.vJoySprite) {
            const worldPos: THREE.Vector3 = this.castRay.castRay(this.clickInput.getScreenPoint());
            this.vJoySprite.position.copy(worldPos);
            return;
        }
        console.error("no vjoy sprite in vJoyUpdater");
    }
}