import Axis from "../../axes/axis";
// export default function calculateSmartForward(vertical: number, horizontal: number): number {
//     return 1 - Math.max(Math.abs(vertical), Math.abs(horizontal));
//     // return 1 - ((Math.abs(vertical) + Math.abs(horizontal)) * 0.5);
// }
/**
 * this class calculates the forward axis based on the horizontal and vertical values, and 
 * sets the forward axis based on those values.
 */
export default class SmartForward {
    private verticalAxis: Axis;
    private horizontalAxis: Axis;
    private forwardAxis: Axis;

    constructor(verticalAxis: Axis, horizontalAxis: Axis, forwardAxis: Axis) {
        this.verticalAxis = verticalAxis;
        this.horizontalAxis = horizontalAxis;
        this.forwardAxis = forwardAxis;
    }

    tick(deltaTime: number) {
        deltaTime;
        const vertical = this.verticalAxis.getValue();
        const horizontal = this.horizontalAxis.getValue();
        const forwardToSet = 1 - Math.max(Math.abs(vertical), Math.abs(horizontal));
        this.forwardAxis.setValue(forwardToSet);
    }
}