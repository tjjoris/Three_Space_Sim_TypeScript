import * as THREE from 'three';

export default class Dust extends THREE.Mesh {
    constructor(colour = 0xAAAAAA) {
        const size = (Math.random() * 0.02) + 0.02;
        const geometry = new THREE.SphereGeometry(size);
        const material = new THREE.MeshBasicMaterial({ color: colour });
        super(geometry, material);
    }
}