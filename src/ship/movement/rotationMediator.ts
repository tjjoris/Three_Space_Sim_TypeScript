import Mover from "./mover";
import axis from "../../axes/axis";
import * as THREE from "three";
import type Tickable from "../../game/tickable";
import RotationManager from "./rotationManager";
import SmartYaw from "../../axes/smartYaw";


export default class RotationMediator implements Tickable {
    pitchAxis: axis;
    yawAxis: axis;
    rollAxis: axis;
    rotationManager: RotationManager;
    mover: Mover;
    verticalAxis: axis;
    horizontalAxis: axis;
    smartYaw: SmartYaw;

    constructor(pitchAxis: axis,
        yawAxis: axis,
        rollAxis: axis,
        verticalAxis: axis,
        horizontalAxis: axis,
        rotationManager: RotationManager,
        mover: Mover,
        smartYaw: SmartYaw
    ) {
        this.pitchAxis = pitchAxis;
        this.yawAxis = yawAxis;
        this.rollAxis = rollAxis;
        this.verticalAxis = verticalAxis;
        this.horizontalAxis = horizontalAxis;
        this.rotationManager = rotationManager;
        this.mover = mover;
        this.smartYaw = smartYaw;
    }

    tick(deltaTime: number) {
        deltaTime;
        const pitchAxisValue = this.pitchAxis.getValue();
        const rollAxisValue = this.rollAxis.getValue();
        const verticalAxisValue = this.verticalAxis.getValue();
        const horizontalAxisValue = this.horizontalAxis.getValue();
        const calculatedYaw: number = this.smartYaw.calculateSmartYaw(rollAxisValue, pitchAxisValue, verticalAxisValue, horizontalAxisValue);
        this.yawAxis.setValue(calculatedYaw);
        const yawAxisValue = this.yawAxis.getValue();
        // console.log("yaw axis value", yawAxisValue);
        const localRotationRate: THREE.Vector3 = this.rotationManager.calculateLocalRotation(pitchAxisValue, yawAxisValue, rollAxisValue);
        this.mover.setRotationRate(localRotationRate);
    }

}