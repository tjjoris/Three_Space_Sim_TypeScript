/**
 * class tracks thrust for a single axis, it is based off of current thrust, and targeted based on 
 * desired thrust known from axis value and max thrust. the rate is controlled by max increase and decrease rates.
 */

import axialLerp from "../../axes/axialLerp"
export default class AxialThrust {
    private thrust: number = 0;
    private maxThrust: number;
    private maxIncreaseRate: number;
    private maxDecreaseRate: number;

    constructor(maxThrust: number, maxIncreaseRate: number, maxDecreaseRate: number) {
        this.maxThrust = maxThrust;
        this.maxIncreaseRate = maxIncreaseRate;
        this.maxDecreaseRate = maxDecreaseRate;
    }

    /**
     * calculate the thrust based on the axis value, delta time, thrust rate, and max thrust.
     * @param axisValue 
     * @param deltaTime 
     */
    calculateThrust(axisValue: number, deltaTime: number): number {
        const desiredThrust = axialLerp(- this.maxThrust, this.maxThrust, axisValue);

        //change thrust rate
        if (desiredThrust > this.thrust) {
            return this.increaseThrust(this.thrust, desiredThrust, this.maxIncreaseRate, deltaTime);
        }
        if (desiredThrust < this.thrust) {
            return this.reduceThrust(this.thrust, desiredThrust, this.maxDecreaseRate, deltaTime);
        }
        return this.thrust;
    }
    /**
     * increase thrust
     */
    increaseThrust(currentThurst: number, desiredThrust: number, maxIncreaseRate: number, deltaTime: number): number {
        let newThrust = currentThurst + (deltaTime * maxIncreaseRate);
        newThrust = Math.max(newThrust, desiredThrust);
        return newThrust;
    }
    /**
     * reduce thrust
     */
    reduceThrust(currentThrust: number, desiredThrust: number, maxDecreaseRate: number, deltaTime: number): number {
        let newThrust = currentThrust - (deltaTime * maxDecreaseRate);
        newThrust = Math.min(newThrust, desiredThrust);
        return newThrust;
    }
}