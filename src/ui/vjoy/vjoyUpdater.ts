import * as THREE from "three";
import type { Tickable } from "../../game/tickable";

export default class VJoyUpdater implements Tickable {
    private x: number = 0;
    private y: number = 0;
    private xPos: number = 0;
    private yPos: number = 0;
    private vJoySprite: THREE.Sprite | null = null;

    constructor(vJoySprite: THREE.Sprite, xPos: number = 0, yPos: number = 0) {
        this.vJoySprite = vJoySprite;
        this.xPos = xPos;
        this.yPos = yPos;
    }


    tick(deltaTime: number) {
        deltaTime;
        this.x += 0.001;
        if (this.vJoySprite) {
            this.vJoySprite.position.set(this.xPos + this.x, this.yPos + this.y, 0);
            return;
        }
        console.error("no vjoy sprite in vJoyUpdater");
    }
}