/**
 * basic lerp function
 */
export default function lerp(min: number, max: number, ratio: number): number {
    return min + ((max - min) * ratio);
}