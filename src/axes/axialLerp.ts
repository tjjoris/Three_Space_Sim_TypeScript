import lerp from "../helpers/lerp";

/**
 * lerp function using axial outputs with a min of -1 and max of 1.
 * @param min 
 * @param max 
 * @param axisValue 
 * @returns 
 */
export default function axialLerp(min: number, max: number, axisValue: number): number {
    const unitInteval = (axisValue * 0.5) + 0.5;

    return lerp(min, max, unitInteval);
}