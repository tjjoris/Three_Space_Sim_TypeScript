export default class axis {
    private value: number;
    private deadZone: number;

    constructor(deadZone: number) {
        this.value = 0;
        this.deadZone = deadZone;
    }

    setValue(value: number) {
        this.value = value;
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
}