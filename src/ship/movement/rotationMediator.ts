import AxisToAccelerationMediator from "./axisToAccelerationMediator"
import type DesiredAxis from "./desiredAxis";
import type Mover from "./mover";
import * as THREE from "three";
import type Tickable from "../../game/tickable";
export default class RotationMediator implements Tickable {
    private pitchMediator: AxisToAccelerationMediator;
    private rollMediator: AxisToAccelerationMediator;
    private yawMediator: AxisToAccelerationMediator;
    private mover: Mover;

    constructor(pitchMediator: AxisToAccelerationMediator,
        rollMediator: AxisToAccelerationMediator,
        yawMediator: AxisToAccelerationMediator,
        mover: Mover,
    ) {
        this.pitchMediator = pitchMediator;
        this.rollMediator = rollMediator;
        this.yawMediator = yawMediator;
        this.mover = mover;
    }

    public tick(deltaTime: number): void {
        this.pitchMediator.tick(deltaTime);
        this.rollMediator.tick(deltaTime);
        this.yawMediator.tick(deltaTime);
        const rotationRate = new THREE.Vector3(
            this.pitchMediator.getAccelerationValue(),
            this.yawMediator.getAccelerationValue(),
            this.rollMediator.getAccelerationValue()
        );
        this.mover.setRotationRate(rotationRate);
    }
}