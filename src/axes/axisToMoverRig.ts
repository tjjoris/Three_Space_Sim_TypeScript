import Mover from '../ship/movement/mover';
import Axis from '../axes/axis';
import type Tickable from '../game/tickable';
export default class AxisToMoverRig implements Tickable {
    mover: Mover;
    pitchAxis: Axis;
    rollAxis: Axis;
    horizontalAxis: Axis;
    verticalAxis: Axis;

    constructor(mover: Mover, pitchAxis: Axis, rollAxis: Axis, verticalAxis: Axis, horizontalAxis: Axis) {
        this.mover = mover;
        this.pitchAxis = pitchAxis;
        this.rollAxis = rollAxis;
        this.verticalAxis = verticalAxis;
        this.horizontalAxis = horizontalAxis;

    }

    tick(deltaTime: number) {
        //calling dt to stop build errors.
        deltaTime;
        this.mover.setPitch(-this.pitchAxis.getValue());
        this.mover.setRoll(this.rollAxis.getValue());
        this.mover.setHorizontal(this.horizontalAxis.getValue());
        this.mover.setVertical(-this.verticalAxis.getValue());

    }
}