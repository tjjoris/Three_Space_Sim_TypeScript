import type Tickable from "./tickable";

export default class Ticker implements Tickable {
    tickables: Tickable[] = [];

    addTickable(tickable: Tickable) {
        this.tickables.push(tickable);
    }

    removeTickable(tickable: Tickable) {
        this.tickables = this.tickables.filter(t => t !== tickable);
    }

    tick(deltaTime: number) {

        this.tickables.forEach(tick => {
            tick.tick(deltaTime);
        }); // assuming 60 FPS, so ~16ms per frame

    }
}