import Mover from "./mover";
import axis from "../../axes/axis";
import * as THREE from "three";
import type Tickable from "../../game/tickable";
import RotationManager from "./rotationManager";


export default class RotationMediator implements Tickable {
    pitchAxis: axis;
    yawAxis: axis;
    rollAxis: axis;
    rotationManager: RotationManager;
    mover: Mover;

    constructor(pitchAxis: axis,
        yawAxis: axis,
        rollAxis: axis,
        rotationManager: RotationManager,
        mover: Mover
    ) {
        this.pitchAxis = pitchAxis;
        this.yawAxis = yawAxis;
        this.rollAxis = rollAxis;
        this.rotationManager = rotationManager;
        this.mover = mover;
    }

    tick(deltaTime: number) {
        deltaTime;
        const pitchAxisValue = this.pitchAxis.getValue();
        const yawAxisValue = this.yawAxis.getValue();
        const rollAxisValue = this.rollAxis.getValue();
        const localRotationRate: THREE.Vector3 = this.rotationManager.calculateLocalRotation(pitchAxisValue, yawAxisValue, rollAxisValue);
        this.mover.setRotationRate(localRotationRate);
    }

}