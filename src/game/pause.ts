/**
 * this module manages the paused state of the game through the closure pattern.
 */
let paused = false;

export function isPaused() {
    return paused;
}
export function setPaused(value: boolean) {
    paused = value;
}