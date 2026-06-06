import Mover from "./mover";
import Axis from "../../axes/axis";
import type Tickable from "../../game/tickable";
import SmartYaw from "../../axes/smartYaw";
import DesiredAxis from "./desiredAxis";
import type Jerker from "./Jerker";

/**
 * gets the input from a smart axis if it exists and sets it to the axis,
 * then gets the input from the axis and applies it to the desired axis.
 * then applies jerk to the current acceleration with the desired axis as the goal.
 */
export default class AxisToAccelerationMediator implements Tickable {
    axis: Axis;
    axisCombiner: SmartYaw | null;
    mover: Mover;
    desiredAxis: DesiredAxis;
    jerkerIncreaser: Jerker;
    jerkerDecreaser: Jerker;
    accelerationValue: number = 0;

    constructor(
        axis: Axis,
        desiredAxis: DesiredAxis,
        mover: Mover,
        axisCombiner: SmartYaw | null,
        jerkerIncreaser: Jerker,
        jerkerDecreaser: Jerker
    ) {
        this.axis = axis;
        this.desiredAxis = desiredAxis;
        this.mover = mover;
        this.axisCombiner = axisCombiner;
        this.jerkerIncreaser = jerkerIncreaser;
        this.jerkerDecreaser = jerkerDecreaser;
    }

    tick(deltaTime: number) {
        deltaTime;
        let normalizedAxis = 0;
        if (this.axisCombiner) {
            this.axisCombiner.calculateSmartYaw();
            normalizedAxis = this.axisCombiner.getCalculatedValue();
            console.log("normalized axis", normalizedAxis);
            this.axis.setValue(normalizedAxis);
            console.log("axis ", this.axis.getValue());
        }
        normalizedAxis = this.axis.getValue();
        if (this.axisCombiner) {
            console.log("normalized axis after combiner", normalizedAxis);
        }
        this.desiredAxis.calcDesiredAxialValue(normalizedAxis);
        const desiredValue: number = this.desiredAxis.getValue();
        this.accelerationValue = this.jerkerIncreaser.applyJerk(deltaTime, desiredValue, this.accelerationValue);
        this.accelerationValue = this.jerkerDecreaser.applyJerk(deltaTime, desiredValue, this.accelerationValue);
    }

    public getAccelerationValue(): number {
        return this.accelerationValue;
    }

}