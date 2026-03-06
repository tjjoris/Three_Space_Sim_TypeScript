import Mover from "./mover";
import axis from "../../axes/axis";
import * as THREE from "three";
import type Tickable from "../../game/tickable";


export default class RotationMediator implements Tickable {
    pitchAxis: axis;
    yawAxis: axis;
    rollAxis: axis;
    constructor(pitchAxis: axis, yawAxis: axis, rollAxis: axis) {
        this.pitchAxis = pitchAxis;
        this.yawAxis = yawAxis;
        this.rollAxis = rollAxis;
    }

    tick(deltaTime: number) {
        deltaTime;
        const pitchAxisValue = this.pitchAxis.getValue();
        const yawAxisValue = this.yawAxis.getValue();
        const rollAxisValue = this.rollAxis.getValue();

    }

}