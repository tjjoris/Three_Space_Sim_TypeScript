import Ticker from "../game/ticker";
import Axis from "./axis"
import GamePadHandler from "./gamePadHandler";
import GamePadHandlerLifecycle from "./GamePadHandlerLifecycle";
import GamePadDetector from "./GamePadDetector";

/**
 GamePadHandlerLifecycleMediator.ts
 @Author: Luke Johnson
 This class stores all flight axes, and active gamepads. for each flight axis it has a GamePadHandlerLifecycle, and passes it the gamepad id, and axis id.
 The GamePadHandlerLifecycle then sends those to the gamepad handler.
 TODO: add a gamepadIdentifier class for each connected gamepad.
 maybe it should handle gamepad connects and disconnects, and it should talk to this class.
 */
export default class GamePadHandlerLifeCycleMediator {
    horizontalAxis: Axis;
    verticalAxis: Axis;
    pitchAxis: Axis;
    rollAxis: Axis;
    horizontalGamePadHandler: GamePadHandler | null;
    verticalGamePadHandler: GamePadHandler | null;
    pitchGamePadHandler: GamePadHandler | null;
    rollGamePadHandler: GamePadHandler | null;
    ticker: Ticker;
    horizontalGamePadHandlerLifecycle: GamePadHandlerLifecycle;
    verticalGamePadHandlerLifecycle: GamePadHandlerLifecycle;
    pitchGamePadHandlerLifecycle: GamePadHandlerLifecycle;
    rollGamePadHandlerLifecycle: GamePadHandlerLifecycle;
    gamePadDetector: GamePadDetector = new GamePadDetector();

    constructor(
        horizontalAxis: Axis,
        verticalAxis: Axis,
        pitchAxis: Axis,
        rollAxis: Axis,
        horizontalGamePadHandler: GamePadHandler | null,
        verticalGamePadHandler: GamePadHandler | null,
        pitchGamePadHandler: GamePadHandler | null,
        rollGamePadHandler: GamePadHandler | null,
        ticker: Ticker,
    ) {
        this.horizontalAxis = horizontalAxis;
        this.verticalAxis = verticalAxis;
        this.pitchAxis = pitchAxis;
        this.rollAxis = rollAxis;
        this.horizontalGamePadHandler = horizontalGamePadHandler;
        this.verticalGamePadHandler = verticalGamePadHandler;
        this.pitchGamePadHandler = pitchGamePadHandler;
        this.rollGamePadHandler = rollGamePadHandler;
        this.ticker = ticker;
        this.horizontalGamePadHandlerLifecycle = new GamePadHandlerLifecycle(horizontalGamePadHandler, horizontalAxis, ticker, 0);
        this.verticalGamePadHandlerLifecycle = new GamePadHandlerLifecycle(verticalGamePadHandler, verticalAxis, ticker, 1);
        this.pitchGamePadHandlerLifecycle = new GamePadHandlerLifecycle(pitchGamePadHandler, pitchAxis, ticker, 3);
        this.rollGamePadHandlerLifecycle = new GamePadHandlerLifecycle(rollGamePadHandler, rollAxis, ticker, 2);

    }
}
