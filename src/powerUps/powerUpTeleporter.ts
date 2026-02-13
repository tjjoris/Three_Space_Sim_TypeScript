import Mover from "../ship/movement/mover";
import * as THREE from "three";
import type PowerUp from "./powerUp";

/**
 * teleports the power up to in front of the player mover
 */
export default class PowerUpTeleporter {
    playerMover: Mover;

    constructor(mover: Mover) {
        this.playerMover = mover;
    }

    /**
     * teleports the passed powerup in front of the player mover.
     * @param powerUp 
     */
    teleportPowerUp(powerUp: PowerUp) {
        const localForward = new THREE.Vector3();
        this.playerMover.getWorldDirection(localForward);
        const invertedLocalForward = localForward.clone().negate();
        const distanceInFront = (Math.random() * 3) + 4//expectedDistanceInFront + (Math.random() * 1);
        const randomOffset = new THREE.Vector3(
            (Math.random() - 0.5) * 3,
            (Math.random() - 0.5) * 3,
            (Math.random() - 0.5) * 3
        );
        //pos is a temporary position set to where the powerup will move.
        let pos = new THREE.Vector3();
        pos.copy(this.playerMover.position).add(invertedLocalForward.multiplyScalar(distanceInFront)).add(randomOffset);
        //have the powerup class copy the position.
        powerUp.copyPos(pos);
    }
}