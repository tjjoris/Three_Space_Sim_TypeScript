import * as THREE from 'three'
/**
 * calculates the x value of point where y is y1 with the given slope.
 * @param slope 
 * @param pos2 
 * @param y1 
 * @returns 
 */
export default function CalcX1UsingPointSlopeForm(slope: number, pos2: THREE.Vector2, y1: number): number {
    return ((y1 - pos2.y) / slope) + pos2.x;
}