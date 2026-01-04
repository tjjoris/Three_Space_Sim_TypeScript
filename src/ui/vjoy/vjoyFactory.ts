import * as THREE from 'three';
export default class VJoyFactory {
    private scene: THREE.Scene;
    private vJoySprite: THREE.Sprite | null = null;


    constructor(scene: THREE.Scene) {
        this.scene = scene;
        const texture = new THREE.TextureLoader().load('./public/circle map.png');
        const material = new THREE.SpriteMaterial({ map: texture, transparent: false, depthTest: false, depthWrite: false });
        this.vJoySprite = new THREE.Sprite(material);
        this.vJoySprite.center.set(0.5, 0.5);
        // this.vJoySprite.position.set(10, 10, 10);
        this.vJoySprite.scale.set(20, 20, 10);
        this.scene.add(this.vJoySprite);
        console.log("vjoy created");
    }

    public getVJoySprite(): THREE.Sprite | null {
        if (this.vJoySprite != null) {
            return this.vJoySprite;
        }
        console.error("inside get vJoySprite, in vJoyFactory, vjoy sprite is null");
        return null;
    }
}