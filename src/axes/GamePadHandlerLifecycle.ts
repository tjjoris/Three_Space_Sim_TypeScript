import type Axis from "./axis";
import GamePadHandler from "./gamePadHandler";
export default class GamePadHandlerLifecycle {
    gamePadHandler: GamePadHandler | null;
    axis: Axis;

    constructor(gamePadHandler: GamePadHandler | null, axis: Axis) {
        this.gamePadHandler = gamePadHandler;
        this.axis = axis;
    }
}