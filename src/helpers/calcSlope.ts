import * as THREE from 'three';
/**
 * calculate the slope from 2 points.
 * @param pos1 
 * @param pos2 
 * @returns 
 */
export default function calcSlope(pos1: THREE.Vector2, pos2: THREE.Vector2): number {
    return (pos2.y - pos1.y) / (pos2.x - pos1.x);
}