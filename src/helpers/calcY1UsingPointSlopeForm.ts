import * as THREE from 'three';

/**
 * calculate the y of a point at x1 from the slope and a point on the line.
 * @param slope slope of the line
 * @param pos point on a line
 * @param x1 x pos of point we are solving y for.
 * @returns y of point at x1.
 */
export default function CalcY1UsingPointSlopeForm(slope: number, pos: THREE.Vector2, x1: number) {
    return ((x1 - pos.x) * slope) + pos.y;
}