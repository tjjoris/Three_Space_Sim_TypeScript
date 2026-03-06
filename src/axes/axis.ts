export default class axis {
    private value: number;
    private deadZone: number;
    private inverseMultiplier: number;

    constructor(deadZone: number, inverse: boolean) {
        this.value = 0;
        this.deadZone = deadZone;
        this.inverseMultiplier = 1;
        this.setInverseFromBoolean(inverse);
    }

    setValue(value: number) {
        this.value = value * this.inverseMultiplier;
    }

    getValue() {
        if (this.value > this.deadZone) {
            return this.value - this.deadZone;
        }
        if (this.value < -this.deadZone) {
            return this.value + this.deadZone;
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