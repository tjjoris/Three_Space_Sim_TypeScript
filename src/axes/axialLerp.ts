import lerp from "../helpers/lerp";

export default function axialLerp(min: number, max: number, axisValue: number): number {
    const unitInteval = (axisValue * 0.5) + 0.5;
    return lerp(min, max, unitInteval);
}