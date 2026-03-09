
/**
 * class which stores the desired axis value for an axis, which is the normalized 
 * axis value * the max or min.
 */
export default class DesiredAxis {
    private current: number = 0;
    private max: number;
    private min: number;

    constructor(min: number, max: number) {
        this.min = min;
        this.max = max;
    }
    /**
     * calculates the desired axis value based on the normalized axis value and max and min.
     * the max and min are stored on this object.
     * at the end it stores the current desired value on this object.
     * @param normalizedAxisValue ranges from -1 to 1.
     */
    calcDesiredAxialValue(normalizedAxisValue: number) {
        if (normalizedAxisValue > 0) {
            const calculatedDesiredValue = normalizedAxisValue * this.max;
            this.current = Math.max(calculatedDesiredValue, this.max);
        }
        else if (normalizedAxisValue < 0) {
            const calcualtedDesiredValue = normalizedAxisValue * this.min;
            this.current = Math.min(calcualtedDesiredValue, this.min);
        }
        else {
            this.current = 0;
        }
    }
    getValue(): number {
        return this.current;
    }
}