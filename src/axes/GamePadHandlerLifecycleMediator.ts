import Ticker from "../game/ticker";
import Axis from "./axis"
import GamePadHandler from "./gamePadHandler";
import GamePadHandlerLifecycle from "./GamePadHandlerLifecycle";

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