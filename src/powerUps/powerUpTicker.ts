import Mover from "../ship/movement/mover";
import PowerUp from "./powerUp";
import teleportPowerUp from "./teleportPowerUp";
import type { Tickable } from "../game/tickable";

/**
 * this class ticks and handles if powerups have collided with the 
 * player mover. it stores the player mover, the powerups, and the 
 * collision range.
 */
export default class PowerUpTicker implements Tickable {
    private mover;
    private collisionRange: number;
    private powerUps: PowerUp[];

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
    addPowerUp(powerUp: PowerUp) {
        this.powerUps.push(powerUp);
    }

    /**
     * removes the passed powerUp from the powerUps array.
     * @param powerUp 
     */
    removePowerUp(powerUp: PowerUp) {
        //remove the power up from the array
        let newPowerUps = this.powerUps.filter(
            element => element != powerUp
        )
        this.powerUps = newPowerUps;
    }

    /**
     * ticks to see if the player mover has collided with any power ups.
     * if so moves them with teleport power up.
     */
    tick(deltaTime: number) {
        deltaTime;
        this.powerUps.forEach(powerUp => {
            // const distance = powerUp.getMesh().position.distanceTo(this.mover.position);
            // console.log("distance", distance);
            if (powerUp.getMesh().position.distanceTo(this.mover.position) < this.collisionRange) {
                teleportPowerUp(powerUp, this.mover, 10);
            }
        })
    }
}