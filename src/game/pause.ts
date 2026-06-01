/**
 * Manages paused state of the game.
 */
export default class Pause {
    paused: boolean;
    constructor() {
        this.paused = false;
    }
    pause(): void {
        this.paused = true;
    }
    resume(): void {
        this.paused = false;
    }
    getPaused(): boolean {
        return this.paused;
    }
}