import Mover from "./mover";
import Axis from "../../axes/axis";

export default class MovementMediator {
    private mover: Mover;
    private axis: Axis;

    constructor(mover: Mover, axis: Axis) {
        this.mover = mover;
        this.axis = axis;
    }

    tick(deltaTime: number) {
        // this.mover.tick(deltaTime);
    }
}