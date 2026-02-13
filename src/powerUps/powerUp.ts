import * as THREE from 'three'

/**
 * stores if a powerup is collidable, and the mesh for 
 * the power up.
 */
export default class PowerUp {
    mesh: THREE.Mesh;
    isCollidable: boolean;

    constructor(mesh: THREE.Mesh) {
        this.mesh = mesh;
        this.isCollidable = true;
    }

    getIsCollidable(): boolean {
        return this.isCollidable;
    }

    setIsCollidable(value: boolean) {
        this.isCollidable = value;
    }

    /**
     * returns the position of the powerUp mesh
     */
    getPos(): THREE.Vector3 {
        return this.mesh.position;
    }
}