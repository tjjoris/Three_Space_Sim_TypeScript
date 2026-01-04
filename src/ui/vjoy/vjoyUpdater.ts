import type { Tickable } from "../../game/tickable";

export default class VJoyUpdater implements Tickable {
    private x: number = 0;
    private y: number = 0;
    private xPos: number = 0;
    private yPos: number = 0;

    constructor(xPos: number, yPos: number) {
        this.xPos = xPos;
        this.yPos = yPos;
    }


    tick(deltaTime: number) {

    }
}