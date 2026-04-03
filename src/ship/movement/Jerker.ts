export default class Jerker {
    private increaseRate: number;
    private currentValue: number;

    constructor(increaseRate: number) {
        this.increaseRate = increaseRate;
        this.currentValue = 0;
    }

    /**
     * applies the jerk, increasing if it needs to be increased, 
     * or decreasing if it needs to be decreased. Returns the new
     * value based on the desired value and the current value.
     */

    public applyJerk(
        deltaTime: number,
        desiredValue: number): number {
        //if positve jerk and current equal or above:
        if ((this.increaseRate > 0) && (this.currentValue >= desiredValue)) {
            return this.currentValue;
        }
        //if negative jerk and current equal or below:
        if ((this.increaseRate < 0) && (this.currentValue <= desiredValue)) {
            return this.currentValue;
        }

        return this.currentValue += (this.increaseRate * deltaTime)
    }
}