import Mover from "./mover";
import Axis from "../../axes/axis";
import AxialThrust from "./axialThrust";
import MomentumManager from "./momentumManager";
import type Tickable from "../../game/tickable";

/**
 * gets the input from the axes, and applies them to MomentumManager, then gets the acceleration from MomentumManager
 * as a world V3
 * and applies it to mover.
 */
export default class MovementMediator implements Tickable {

    private momentumManager: MomentumManager;
    private mover: Mover;
    private verticalAxis: Axis;
    private verticalAxialThrust: AxialThrust;
    private horizontalAxis: Axis;
    private horizontalAxialThrust: AxialThrust;
    private forwardAxis: Axis;
    private forwardAxialThrust: AxialThrust;

    constructor(momentumManager: MomentumManager, mover: Mover, verticalAxis: Axis, horizontalAxis: Axis, forwardAxis: Axis,
        verticalAxialThrust: AxialThrust, horizontalAxialThrust: AxialThrust, forwardAxialThrust: AxialThrust
    ) {
        this.momentumManager = momentumManager;
        this.mover = mover;
        this.verticalAxis = verticalAxis;
        this.horizontalAxis = horizontalAxis;
        this.forwardAxis = forwardAxis;
        this.verticalAxialThrust = verticalAxialThrust;
        this.horizontalAxialThrust = horizontalAxialThrust;
        this.forwardAxialThrust = forwardAxialThrust;

    }

    tick(deltaTime: number) {
        //get axes inputs
        const vertical = this.verticalAxis.getValue();
        const horizontal = this.horizontalAxis.getValue();
        const forward = this.forwardAxis.getValue();
        //find thrust values from axial thrusts.
        const verticalThrust = this.verticalAxialThrust.calculateThrust(vertical, deltaTime);
        const horizontalThrust = this.horizontalAxialThrust.calculateThrust(horizontal, deltaTime);
        const forwardAxialThrust = this.forwardAxialThrust.calculateThrust(forward, deltaTime);
        //apply axes inputs to momentum manager
        const localSpeed = this.momentumManager.calculateRelativeSpeed(verticalThrust, horizontalThrust, forwardAxialThrust, this.mover);
        //set velocity of mover
        this.mover.setVelocity(localSpeed);
        //tick mover
        this.mover.tick(deltaTime);
    }
}