
import { addPopup } from "../reactUi/popup/popupLifespan";
import VJoyUsedTracker from "../ui/vjoy/vJoyUsedTracker";

export default class GamePadDetector {
    started: boolean = false;

    constructor() {
        this.started = false;
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
        VJoyUsedTracker.getVJoyUsedTracker().setVJoyToUsed();
        // if (this.gamePadHandler !== null) {
        //     this.ticker.removeTickable(this.gamePadHandler);
        // }

        // this.gamePadHandler = new GamePadHandler(e.gamepad.index, this.axis, this.axisIndex);
        // this.ticker.addTickable(this.gamePadHandler);
    };

    private readonly onGamepadDisconnected = (e: GamepadEvent) => {
        console.log(
            "Gamepad disconnected from index %d: %s",
            e.gamepad.index,
            e.gamepad.id,
        );

        // if (this.gamePadHandler !== null) {
        //     this.ticker.removeTickable(this.gamePadHandler);
        //     this.gamePadHandler = null;
        // }
    };

    start() {
        if (this.started) return;
        this.started = true;
        console.log("starting gamepad detector");
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