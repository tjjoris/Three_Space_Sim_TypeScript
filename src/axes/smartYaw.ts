/**
 * this class calculates a yaw axis value based on the the 
 * axis inputs of roll, pitch, vertical, and horizontal.
 * the output depends on the multipliers for each axis.
 */
export default class SmartYaw {
    private rollMult: number;
    private pitchMult: number;
    private verticalMult: number;
    private horizontalMult: number;

    constructor(rollMult: number,
        pitchMult: number,
        verticalMult: number,
        horizontalMult: number
    ) {

        this.rollMult = rollMult;
        this.pitchMult = pitchMult;
        this.verticalMult = verticalMult;
        this.horizontalMult = horizontalMult;
    }

    calculateSmartYaw(rollAxis: number,
        pitchAxis: number,
        verticalAxis: number,
        horizontalAxis: number
    ): number {
        return (rollAxis * this.rollMult) +
            (pitchAxis * this.pitchMult) +
            (verticalAxis + this.verticalMult) +
            (horizontalAxis + this.horizontalMult);
    }
}