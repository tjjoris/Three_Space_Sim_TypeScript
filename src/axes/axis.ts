export default class axis {
    private value: number;

    constructor() {
        this.value = 0;
    }

    setValue(value: number) {
        this.value = value;
    }

    getValue() {
        return this.value;
    }
}