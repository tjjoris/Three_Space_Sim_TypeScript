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
    }


    tick(deltaTime: number) {
        deltaTime;
        this.x += 0.001;
        if (this.vJoySprite) {
            this.vJoySprite.position.set(this.xOffset + this.x, this.yOffset + this.y, 0);
            // this.positionVJoy({ x: this.x, y: this.y });
            return;
        }
        console.error("no vjoy sprite in vJoyUpdater");
    }

    setPoint(position: THREE.Vector2) {
        this.x = position.x;
        this.y = position.y;
    }

    // positionVJoy(point: THREE.Vector2) {
    //     const origionalPos = new THREE.Vector3(0, 0, 0);
    //     const quaternion = this.camera.getWorldQuaternion(new THREE.Quaternion());
    //     const position = new THREE.Vector3((this.x * 0.02) + this.xOffset, (-this.y * 0.02) + this.yOffset, 0);
    //     const worldPos = origionalPos.clone().applyQuaternion(quaternion).add(position);

    //     // this.vJoySprite?.position.set(worldPos.x, worldPos.y, worldPos.z);
    //     // console.log("new vjoy pos ", worldPos);
    //     // this.vJoySprite?.position.set(this.xPos + (point.x * 0.01), this.yPos + (point.y * 0.01), -10);
    //     // console.log("re positioned sprite to ", this.vJoySprite?.position);
    // }
}