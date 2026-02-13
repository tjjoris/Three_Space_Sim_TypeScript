import Mover from "../ship/movement/mover";
import * as THREE from "three";
import teleportPowerUp from './teleportPowerUp';
import PowerUp from "./powerUp";

export default class PowerUpFactory {
    playerMover: Mover;
    scene: THREE.Scene;

    constructor(playerMover: Mover, scene: THREE.Scene) {
        this.playerMover = playerMover;
        this.scene = scene;
    }

    createPowerUpOnMover(playerMover: Mover): PowerUp {
        // const localForward = new THREE.Vector3();
        // playerMover.getWorldDirection(localForward);
        // const invertedLocalForward = localForward.clone().negate();
        // const distanceInFront = (Math.random() * 3) + 4//expectedDistanceInFront + (Math.random() * 1);
        // const randomOffset = new THREE.Vector3(
        //     (Math.random() - 0.5) * 3,
        //     (Math.random() - 0.5) * 3,
        //     (Math.random() - 0.5) * 3
        // );
        const geometry = new THREE.TorusGeometry(0.5, 0.07, 8, 18);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const powerUpMesh = new THREE.Mesh(geometry, material);
        const powerUp = new PowerUp(powerUpMesh);
        // powerUp.position.copy(playerMover.position).add(invertedLocalForward.multiplyScalar(distanceInFront)).add(randomOffset);
        this.scene.add(powerUpMesh);
        return powerUp;
    }

    //TODO removal of powerup mesh and it's existance on scene.
}