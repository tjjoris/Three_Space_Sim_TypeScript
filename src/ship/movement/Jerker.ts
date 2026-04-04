export default class Jerker {
    private increaseRate: number;

    constructor(increaseRate: number) {
        this.increaseRate = increaseRate;
    }

    /**
     * applies the jerk, increasing if it needs to be increased, 
     * or decreasing if it needs to be decreased. Returns the new
     * value based on the desired value and the current value.
     */

    public applyJerk(
        deltaTime: number,
        desiredValue: number, currentValue: number): number {
        //if positve jerk and current equal or above:
        if ((this.increaseRate > 0) && (currentValue >= desiredValue)) {
            return currentValue;
        }
        //if negative jerk and current equal or below:
        if ((this.increaseRate < 0) && (currentValue <= desiredValue)) {
            return currentValue;
        }

        return currentValue += (this.increaseRate * deltaTime)
    }
}