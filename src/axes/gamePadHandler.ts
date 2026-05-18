import type Tickable from "../game/tickable";
import Axis from "./axis";

export default class GamePadHandler implements Tickable {
    gamepad: Gamepad;
    axis: Axis;
    axisIndex: number;
    constructor(gamepad: Gamepad, axis: Axis, axisIndex: number) {
        this.gamepad = gamepad;
        this.axis = axis;
        this.axisIndex = axisIndex;
    };

    public tick(deltaTime: number) {
        deltaTime;
        this.axis.setValue(this.gamepad.axes[this.axisIndex]);
    }
}