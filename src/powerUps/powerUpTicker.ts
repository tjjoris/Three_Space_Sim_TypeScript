import Mover from "../ship/movement/mover";
import * as THREE from 'three';

/**
 * this class ticks and handles if powerups have collided with the 
 * player mover. it stores the player mover, the powerups, and the 
 * collision range.
 */
export default class PowerUpTicker {
    private mover;
    private collisionRange: number;
    private powerUps: THREE.Mesh[];

    constructor(mover: Mover, collisionRange: number) {
        this.mover = mover;
        this.collisionRange = collisionRange;
        this.powerUps = [];
    }


    setCollisionRange(collisionRange: number) {
        this.collisionRange = collisionRange;
    }

    /**
     * add power up to the power up array.
     * @param powerUp 
     */
    addPowerUp(powerUp: THREE.Mesh) {
        this.powerUps.push(powerUp);
    }

    /**
     * removes the passed powerUp from the powerUps array.
     * @param powerUp 
     */
    removePowerUp(powerUp: THREE.Mesh) {
        //remove the power up from the array
        let newPowerUps = this.powerUps.filter(
            element => element != powerUp
        )
        this.powerUps = newPowerUps;
    }
}