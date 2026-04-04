import Mover from "./mover";
import Axis from "../../axes/axis";
import * as THREE from "three";
import type Tickable from "../../game/tickable";
import RotationManager from "./rotationManager";
import SmartYaw from "../../axes/smartYaw";
import DesiredAxis from "./desiredAxis";

/**
 * gets the input from a smart axis if it exists and sets it to the axis,
 * then gets the input from the axis and applies it to the desired axis.
 */
//TODO rename from rotation mediator to axis to acceleration mediator.
export default class AxisToAccelerationMediator implements Tickable {
    axis: Axis;
    axisCombiner: SmartYaw | null;
    mover: Mover;
    desiredAxis: DesiredAxis;

    constructor(
        axis: Axis,
        desiredAxis: DesiredAxis,
        mover: Mover,
        axisCombiner: SmartYaw | null
    ) {
        this.axis = axis;
        this.desiredAxis = desiredAxis;
        this.mover = mover;
        this.axisCombiner = axisCombiner;
    }

    tick(deltaTime: number) {
        deltaTime;
        let normalizedAxis = 0;
        if (this.axisCombiner) {
            this.axisCombiner.calculateSmartYaw();
            normalizedAxis = this.axisCombiner.getCalculatedValue();
            this.axis.setValue(normalizedAxis);
        }
        normalizedAxis = this.axis.getValue();
        this.desiredAxis.calcDesiredAxialValue(normalizedAxis);
    }

}