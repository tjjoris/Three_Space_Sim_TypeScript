import * as THREE from "three";
import type { Tickable } from "../../game/tickable";
import type CastRay from "../../axes/castRay";
import type ClickInput from "../../axes/clickInput";

export default class VJoyUpdater implements Tickable {
    private x: number = 0;
    private y: number = 0;
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
            // this.vJoySprite.position.set(this.xOffset + this.x, this.yOffset + this.y, 0);
            return;
        }
        console.error("no vjoy sprite in vJoyUpdater");
    }

    setPoint(position: THREE.Vector2) {
        this.x = position.x;
        this.y = position.y;
    }
}