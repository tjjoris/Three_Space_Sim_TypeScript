import Mover from "../ship/movement/mover";
import * as THREE from "three";

export default class PowerUpFactory {
    playerMover: Mover;
    scene: THREE.Scene;

    constructor(playerMover: Mover, scene: THREE.Scene) {
        this.playerMover = playerMover;
        this.scene = scene;
    }

    createPowerUpOnMover(playerMover: Mover) {
        const localForward = new THREE.Vector3();
        playerMover.getWorldDirection(localForward);
        const invertedLocalForward = localForward.clone().negate();
        const distanceInFront = (Math.random() * 3) + 4//expectedDistanceInFront + (Math.random() * 1);
        const randomOffset = new THREE.Vector3(
            (Math.random() - 0.5) * 3,
            (Math.random() - 0.5) * 3,
            (Math.random() - 0.5) * 3
        );
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        const cube = new THREE.Mesh(geometry, material);
        cube.position.copy(playerMover.position).add(invertedLocalForward.multiplyScalar(distanceInFront)).add(randomOffset);
        this.scene.add(cube);
    }
}