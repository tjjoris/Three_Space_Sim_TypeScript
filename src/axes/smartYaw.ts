import Axis from "./axis";
/**
 * this class calculates a yaw axis value based on the the 
 * axis inputs of roll, pitch, vertical, and horizontal.
 * the output depends on the multipliers for each axis.
 */
//TODO rename from smart yaw to axis combiner.
export default class SmartYaw {
    private rollMult: number;
    private pitchMult: number;
    private verticalMult: number;
    private horizontalMult: number;
    private calculatedValue: number = 0;
    private pitchAxis: Axis;
    private rollAxis: Axis;
    private verticalAxis: Axis;
    private horizontalAxis: Axis;

    /**
     * 
     * @param rollMult 
     * @param pitchMult 
     * @param verticalMult 
     * @param horizontalMult 
     * @param pitchAxis 
     * @param rollAxis 
     * @param verticalAxis 
     * @param horizontalAxis 
     */
    constructor(rollMult: number,
        pitchMult: number,
        verticalMult: number,
        horizontalMult: number,
        pitchAxis: Axis,
        rollAxis: Axis,
        verticalAxis: Axis,
        horizontalAxis: Axis
    ) {

        this.rollMult = rollMult;
        this.pitchMult = pitchMult;
        this.verticalMult = verticalMult;
        this.horizontalMult = horizontalMult;
        this.pitchAxis = pitchAxis;
        this.rollAxis = rollAxis;
        this.verticalAxis = verticalAxis;
        this.horizontalAxis = horizontalAxis;
    }

    //TODO rename from smart yaw to calculate axis
    //TODO double check calculation.
    calculateSmartYaw(
    ) {
        const calculatedValue: number = (this.rollAxis.getValue() * this.rollMult) * (1 +
            ((this.pitchAxis.getValue() * this.pitchMult) +
                (this.verticalAxis.getValue() + this.verticalMult) +
                (this.horizontalAxis.getValue() + this.horizontalMult)));
        // console.log("calculated value ", calculatedValue)
        this.calculatedValue = calculatedValue;
    }

    getCalculatedValue(): number {
        return this.calculatedValue;
    }
}