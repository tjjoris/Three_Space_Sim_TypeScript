import Mover from "./mover";
import Axis from "../../axes/axis";
// import AxialThrust from "./axialThrust";
import MomentumManager from "./momentumManager";
import type Tickable from "../../game/tickable";
// import calculateSmartForward from "./smartForward";
import type AxisToAccelerationMediator from "./axisToAccelerationMediator";
import type SmartForward from "./smartForward";


/**
 * gets the input from the axes, and applies them to MomentumManager, then gets the acceleration from MomentumManager
 * as a world V3
 * and applies it to mover.
 */
export default class MovementMediator implements Tickable {

    private momentumManager: MomentumManager;
    private mover: Mover;
    // private verticalAxis: Axis;
    // private verticalAxialThrust: AxialThrust;
    // private horizontalAxis: Axis;
    // private horizontalAxialThrust: AxialThrust;
    // private forwardAxis: Axis;
    // private forwardAxialThrust: AxialThrust;
    private verticalMediator: AxisToAccelerationMediator;
    private horizontalMediator: AxisToAccelerationMediator;
    private forwardMediator: AxisToAccelerationMediator;
    private smartForward: SmartForward;

    // constructor(momentumManager: MomentumManager, mover: Mover, verticalAxis: Axis, horizontalAxis: Axis, forwardAxis: Axis,
    //     verticalAxialThrust: AxialThrust, horizontalAxialThrust: AxialThrust, forwardAxialThrust: AxialThrust
    constructor(momentumManager: MomentumManager, mover: Mover,
        verticalMediator: AxisToAccelerationMediator, horizontalMediator: AxisToAccelerationMediator, forwardMediator: AxisToAccelerationMediator,
        smartForward: SmartForward
    ) {
        this.momentumManager = momentumManager;
        this.mover = mover;
        // this.verticalAxis = verticalAxis;
        // this.horizontalAxis = horizontalAxis;
        // this.forwardAxis = forwardAxis;
        this.verticalMediator = verticalMediator;
        this.horizontalMediator = horizontalMediator;
        this.forwardMediator = forwardMediator;
        // this.verticalAxialThrust = verticalAxialThrust;
        // this.horizontalAxialThrust = horizontalAxialThrust;
        // this.forwardAxialThrust = forwardAxialThrust;
        this.smartForward = smartForward;
    }

    tick(deltaTime: number) {
        // //get axes inputs
        // const vertical = this.verticalAxis.getValue();
        // const horizontal = this.horizontalAxis.getValue();
        // //calculate smart forwward
        // const forwardToSet = calculateSmartForward(vertical, horizontal);
        // //set forward axis
        // this.forwardAxis.setValue(forwardToSet);
        // const forward = this.forwardAxis.getValue();
        this.smartForward.tick(deltaTime);
        // //find thrust values from axial thrusts.
        // const verticalThrust = this.verticalAxialThrust.calculateThrust(vertical, deltaTime);
        // const horizontalThrust = this.horizontalAxialThrust.calculateThrust(horizontal, deltaTime);
        // const forwardThrust = this.forwardAxialThrust.calculateThrust(forward, deltaTime);
        this.verticalMediator.tick(deltaTime);
        this.horizontalMediator.tick(deltaTime);
        this.forwardMediator.tick(deltaTime);
        const verticalThrust = this.verticalMediator.getAccelerationValue();
        const horizontalThrust = this.horizontalMediator.getAccelerationValue();
        const forwardThrust = this.forwardMediator.getAccelerationValue();

        //apply axes inputs to momentum manager
        const localSpeed = this.momentumManager.calculateLocalVelocity(verticalThrust, horizontalThrust, forwardThrust, this.mover);
        //set velocity of mover
        this.mover.setVelocity(localSpeed);
        //tick mover
        this.mover.tick(deltaTime);
    }

}