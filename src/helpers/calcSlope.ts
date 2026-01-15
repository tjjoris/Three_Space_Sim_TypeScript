import * as THREE from 'three';
export default function CalcSlope(pos1: THREE.Vector2, pos2: THREE.Vector2): number {
    return (pos2.y - pos1.y) / (pos2.x - pos1.x);
}