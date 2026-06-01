import Ticker from "../game/ticker";
import type Axis from "./axis";
import GamePadHandler from "./gamePadHandler";
import { addPopup } from "../reactUi/popup/popupLifespan";

export default class GamePadHandlerLifecycle {
    gamePadHandler: GamePadHandler | null;
    axis: Axis;
    ticker: Ticker;
    axisIndex: number;
    private started = false;

    constructor(gamePadHandler: GamePadHandler | null, axis: Axis, ticker: Ticker, axisIndex: number = 0) {
        this.gamePadHandler = gamePadHandler;
        this.axis = axis;
        this.ticker = ticker;
        this.axisIndex = axisIndex;
        this.start();
    }

    private readonly onGamepadConnected = (e: GamepadEvent) => {
        console.log(
            "gamepad connected at index %d: %s, %d buttons, %d axes.",
            e.gamepad.index,
            e.gamepad.id,
            e.gamepad.buttons.length,
            e.gamepad.axes.length
        );
        addPopup(`Joystick detected: ${e.gamepad.id} index: ${e.gamepad.index}`);

        // if (this.gamePadHandler !== null) {
        //     this.ticker.removeTickable(this.gamePadHandler);
        // }

        this.gamePadHandler = new GamePadHandler(e.gamepad.index, this.axis, this.axisIndex);
        this.ticker.addTickable(this.gamePadHandler);
    };

    private readonly onGamepadDisconnected = (e: GamepadEvent) => {
        console.log(
            "Gamepad disconnected from index %d: %s",
            e.gamepad.index,
            e.gamepad.id,
        );

        if (this.gamePadHandler !== null) {
            this.ticker.removeTickable(this.gamePadHandler);
            this.gamePadHandler = null;
        }
    };

    start() {
        if (this.started) return;
        this.started = true;
        window.addEventListener("gamepadconnected", this.onGamepadConnected);
        window.addEventListener("gamepaddisconnected", this.onGamepadDisconnected);
    }

    stop() {
        if (!this.started) return;
        this.started = false;
        window.removeEventListener("gamepadconnected", this.onGamepadConnected);
        window.removeEventListener("gamepaddisconnected", this.onGamepadDisconnected);
    }
}