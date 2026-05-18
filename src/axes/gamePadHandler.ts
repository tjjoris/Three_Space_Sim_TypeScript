import type Tickable from "../game/tickable";
import Axis from "./axis";

export default class GamePadHandler implements Tickable {
    gamepadIndex: number;
    axis: Axis;
    axisIndex: number;
    constructor(gamepadIndex: number, axis: Axis, axisIndex: number) {
        this.gamepadIndex = gamepadIndex;
        this.axis = axis;
        this.axisIndex = axisIndex;
    };

    public tick(deltaTime: number) {
        deltaTime;

        const gamepad = navigator.getGamepads()[this.gamepadIndex];
        if (!gamepad) {
            this.axis.setValue(0);
            return;
        }

        const axisValue = gamepad.axes[this.axisIndex] ?? 0;
        // console.log("gamepad axis value ", axisValue);
        this.axis.setValue(axisValue);
        // console.log("axis value", this.axis.getValue());
    }
}