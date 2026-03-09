import clamp from "../helpers/clamp";
export default class axis {
    private value: number;
    private deadZone: number;
    private saturation: number;
    private totalUsableDeflectionMult: number;
    private inverseMultiplier: number;

    constructor(deadZone: number, saturation: number, inverse: boolean) {
        this.value = 0;
        this.deadZone = deadZone;
        if (this.deadZone > 1) {
            this.deadZone = 1;
        }
        this.saturation = saturation;
        if (this.saturation < this.deadZone) {
            this.saturation = this.deadZone;
        }
        this.totalUsableDeflectionMult = 1 / (this.saturation - this.deadZone);
        console.log("total usable deflection ", this.totalUsableDeflectionMult);
        this.inverseMultiplier = 1;
        this.setInverseFromBoolean(inverse);
    }

    setValue(value: number) {
        let valueToSet: number = value * this.inverseMultiplier;
        this.value = clamp(valueToSet, -1, 1);
    }

    getValue() {

        const totalDeflection: number = this.value * this.totalUsableDeflectionMult;
        if (this.value > this.deadZone) {
            return totalDeflection - this.deadZone;
        }
        if (this.value < -this.deadZone) {
            return totalDeflection + this.deadZone;
        }
        return 0;
    }

    setInverseFromBoolean(value: boolean) {

        value ? this.inverseMultiplier = 1
            : this.inverseMultiplier = -1;
        console.log('set axis inversion from boolean', this.inverseMultiplier);
    }
    setInverse(value: number) {
        this.inverseMultiplier = value;
    }
}