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
    private desiredPitch: DesiredAxis;
    private desiredRoll: DesiredAxis;
    private desiredYaw: DesiredAxis;

    constructor(pitchMediator: AxisToAccelerationMediator,
        rollMediator: AxisToAccelerationMediator,
        yawMediator: AxisToAccelerationMediator,
        mover: Mover,
        desiredPitch: DesiredAxis,
        desiredRoll: DesiredAxis,
        desiredYaw: DesiredAxis
    ) {
        this.pitchMediator = pitchMediator;
        this.rollMediator = rollMediator;
        this.yawMediator = yawMediator;
        this.mover = mover;
        this.desiredPitch = desiredPitch;
        this.desiredRoll = desiredRoll;
        this.desiredYaw = desiredYaw;
    }

    public tick(deltaTime: number): void {
        this.pitchMediator.tick(deltaTime);
        this.rollMediator.tick(deltaTime);
        this.yawMediator.tick(deltaTime);
        const rotationRate = new THREE.Vector3(
            this.desiredPitch.getValue(),
            this.desiredYaw.getValue(),
            this.desiredRoll.getValue()
        );
        this.mover.setRotationRate(rotationRate);
    }
}