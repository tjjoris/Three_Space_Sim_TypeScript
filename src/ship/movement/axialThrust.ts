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
     * @param deltaTimer 
     */
    calculateThrust(axisValue: number, deltaTimer: number): number {
        return 0;
    }
}