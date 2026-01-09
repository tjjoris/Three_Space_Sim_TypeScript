import * as THREE from 'three';
import { ThreeMFLoader } from 'three/examples/jsm/Addons.js';

export default class CastRay {
    renderer: THREE.WebGLRenderer;
    camera: THREE.Camera;

    constructor(renderer: THREE.WebGLRenderer, camera: THREE.Camera) {
        this.renderer = renderer;
        this.camera = camera;
    }

    /**
     * cast a screen point ray onto a plane and return the world coordinates in
     * 2D space.
     * @param point 
     * @returns 
     */
    castRay(point: THREE.Vector2): THREE.Vector3 {
        const rect = this.renderer.domElement.getBoundingClientRect();
        const normalizedDeviceCoords = new THREE.Vector2(
            ((point.x - rect.left) / rect.width) * 2 - 1,
            - ((point.y - rect.top) / rect.height) * 2 + 1
        );
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(normalizedDeviceCoords, this.camera);

        //intersect with plane z=0
        // const plane = new THREE.Plane(new THREE.Vector3(0, 0, 0), 0);
        //distance plane is in front of camera
        const distance = 1;

        //get camera front diretion
        const cameraDirection = new THREE.Vector3();
        this.camera.getWorldDirection(cameraDirection);
        const cameraPosition = new THREE.Vector3();
        this.camera.getWorldPosition(cameraPosition);
        //point on plane in front of camera:
        const pointOnPlane = cameraPosition.clone().add(cameraDirection.multiplyScalar(distance));

        const plane = new THREE.Plane().setFromNormalAndCoplanarPoint(cameraDirection, pointOnPlane);

        const hit = new THREE.Vector3();
        if (raycaster.ray.intersectPlane(plane, hit)) {
            return hit;
        }

        return new THREE.Vector3(0, 0, 0);
    }
}