import * as THREE from 'three';

export default class CastRay {
    renderer: THREE.WebGLRenderer;
    camera: THREE.Camera;

    constructor(renderer: THREE.WebGLRenderer, camera: THREE.Camera) {
        this.renderer = renderer;
        this.camera = camera;
    }

    castRay(point: THREE.Vector2): THREE.Vector2 {
        const rect = this.renderer.domElement.getBoundingClientRect();
        const normalizedDeviceCoords = new THREE.Vector2(
            ((point.x - rect.left) / rect.width) * 2 - 1,
            - ((point.y - rect.top) / rect.height) * 2 + 1
        );
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(normalizedDeviceCoords, this.camera);

        //intersect with plane z=0
        const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
        const hit = new THREE.Vector3();
        if (raycaster.ray.intersectPlane(plane, hit)) {
            return new THREE.Vector2(hit.x, hit.y);
        }

        return new THREE.Vector2(0, 0);
    }
}