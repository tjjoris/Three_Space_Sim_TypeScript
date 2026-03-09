import Mover from "./mover";
import axis from "../../axes/axis";
import * as THREE from "three";
import type Tickable from "../../game/tickable";
import RotationManager from "./rotationManager";
import SmartYaw from "../../axes/smartYaw";
import DesiredAxis from "./desiredAxis";


export default class RotationMediator implements Tickable {
    pitchAxis: axis;
    yawAxis: axis;
    rollAxis: axis;
    rotationManager: RotationManager;
    mover: Mover;
    verticalAxis: axis;
    horizontalAxis: axis;
    smartYaw: SmartYaw;
    desiredPitchAxis: DesiredAxis;
    desiredYawAxis: DesiredAxis;
    desiredRollAxis: DesiredAxis;

    constructor(pitchAxis: axis,
        yawAxis: axis,
        rollAxis: axis,
        verticalAxis: axis,
        horizontalAxis: axis,
        desiredPitchAxis: DesiredAxis,
        desiredYawAxis: DesiredAxis,
        desiredRollAxis: DesiredAxis,
        rotationManager: RotationManager,
        mover: Mover,
        smartYaw: SmartYaw
    ) {
        this.pitchAxis = pitchAxis;
        this.yawAxis = yawAxis;
        this.rollAxis = rollAxis;
        this.verticalAxis = verticalAxis;
        this.horizontalAxis = horizontalAxis;
        this.desiredPitchAxis = desiredPitchAxis;
        this.desiredYawAxis = desiredYawAxis;
        this.desiredRollAxis = desiredRollAxis;
        this.rotationManager = rotationManager;
        this.mover = mover;
        this.smartYaw = smartYaw;
    }

    tick(deltaTime: number) {
        deltaTime;
        const normalizedPitchAxisValue = this.pitchAxis.getValue();
        const normalizedRollAxisValue = this.rollAxis.getValue();
        const normalizedVerticalAxisValue = this.verticalAxis.getValue();
        const normalizedHorizontalAxisValue = this.horizontalAxis.getValue();
        const normalizedCalculatedYaw: number = this.smartYaw.calculateSmartYaw(normalizedRollAxisValue, normalizedPitchAxisValue, normalizedVerticalAxisValue, normalizedHorizontalAxisValue);
        this.yawAxis.setValue(normalizedCalculatedYaw);
        const normalizedYawAxisValue = this.yawAxis.getValue();
        this.desiredPitchAxis.calcDesiredAxialValue(normalizedPitchAxisValue);
        this.desiredYawAxis.calcDesiredAxialValue(normalizedYawAxisValue);
        this.desiredRollAxis.calcDesiredAxialValue(normalizedRollAxisValue);
        const desiredPitchAxisValue = this.desiredPitchAxis.getValue();
        const desiredYawAxisValue = this.desiredYawAxis.getValue();
        const desiredRollAxisValue = this.desiredRollAxis.getValue();
        const localRotationRate: THREE.Vector3 = this.rotationManager.calculateLocalRotation(desiredPitchAxisValue, desiredYawAxisValue, desiredRollAxisValue, deltaTime);
        this.mover.setRotationRate(localRotationRate);
    }

}