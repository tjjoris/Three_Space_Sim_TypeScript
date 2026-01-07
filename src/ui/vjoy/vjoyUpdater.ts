import * as THREE from "three";
import type { Tickable } from "../../game/tickable";

export default class VJoyUpdater implements Tickable {
    private x: number = 0;
    private y: number = 0;
    private xOffset: number = 0;
    private yOffset: number = 0;
    private vJoySprite: THREE.Sprite | null = null;
    private camera: THREE.Camera;

    constructor(vJoySprite: THREE.Sprite, camera: THREE.Camera, xOffset: number = 0, yOffset: number = 0) {
        this.vJoySprite = vJoySprite;
        this.xOffset = xOffset;
        this.yOffset = yOffset;
        this.camera = camera;
        this.camera;
    }


    tick(deltaTime: number) {
        deltaTime;
        if (this.vJoySprite) {
            this.vJoySprite.position.set(this.xOffset + this.x, this.yOffset + this.y, 0);
            return;
        }
        console.error("no vjoy sprite in vJoyUpdater");
    }

    setPoint(position: THREE.Vector2) {
        this.x = position.x;
        this.y = position.y;
    }
}