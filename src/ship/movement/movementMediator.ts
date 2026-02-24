import Mover from "./mover";
import Axis from "../../axes/axis";

/**
 * gets the input from the axes, and applies them to MomentumManager, then gets the acceleration from MomentumManager
 * as a world V3
 * and applies it to mover.
 */
export default class MovementMediator {
    private mover: Mover;
    private verticalAxis: Axis;
    private horizontalAxis: Axis;
    private forwardAxis: Axis;

    constructor(mover: Mover, verticalAxis: Axis, horizontalAxis: Axis, forwardAxis: Axis) {
        this.mover = mover;
        this.verticalAxis = verticalAxis;
        this.horizontalAxis = horizontalAxis;
        this.forwardAxis = forwardAxis;

    }

    tick(deltaTime: number) {
        // this.mover.tick(deltaTime);
        const vertical = this.verticalAxis.getValue();
        const horizontal = this.horizontalAxis.getValue();
        const forward = this.forwardAxis.getValue();
    }
}