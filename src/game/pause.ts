/**
 * this module manages the paused state of the game through the closure pattern.
 */
let paused = true;

export function isPaused() {
    return paused;
}
export function setPaused(value: boolean) {
    paused = value;
}
export function pause() {
    paused = true;
}

export function unPause() {
    paused = false;
}
