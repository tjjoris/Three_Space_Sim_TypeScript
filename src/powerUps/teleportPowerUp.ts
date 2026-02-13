import Mover from "../ship/movement/mover";
import * as THREE from "three";
import type PowerUp from "./powerUp";


/**
 * teleports the passed powerup in front of the passed player mover.
 * @param powerUp 
 */
export default function teleportPowerUp(powerUp: PowerUp, playerMover: Mover, distance: number) {
    const localForward = new THREE.Vector3();
    playerMover.getWorldDirection(localForward);
    const invertedLocalForward = localForward.clone().negate();
    const distanceInFront = (Math.random() * 3) + distance;
    const randomOffset = new THREE.Vector3(
        (Math.random() - 0.5) * 3,
        (Math.random() - 0.5) * 3,
        (Math.random() - 0.5) * 3
    );
    //pos is a temporary position set to where the powerup will move.
    let pos = new THREE.Vector3();
    pos.copy(playerMover.position).add(invertedLocalForward.multiplyScalar(distanceInFront)).add(randomOffset);
    //have the powerup class copy the position.
    powerUp.copyPos(pos);
}