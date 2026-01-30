import Dust from './dust';
import Mover from '../ship/movement/mover'
import * as THREE from 'three';
import type { Tickable } from '../game/tickable'

export default class DustHandler implements Tickable {
    mover: Mover;
    scene: THREE.Scene;
    _dustParticles: Dust[];
    constructor(mover: Mover, scene: THREE.Scene) {
        this.mover = mover;
        this.scene = scene;
        this._dustParticles = [];
    }

    /**
     * update dust particles - remove those behind camera and create new ones in front
     */
    tick(deltaTime: number) {
        deltaTime;
        let particlesToRpostion = [];
        //check which particles are behind camera
        for (let i = this._dustParticles.length - 1; i >= 0; i--) {
            const dustParticle = this._dustParticles[i];
            if (this.isDustParticleOutOfRange(dustParticle, this.mover)) {
                particlesToRpostion.push(dustParticle);
            }
        }
        //repostion particles behind camera
        for (let i = 0; i < particlesToRpostion.length; i++) {
            this.repostionParticleInFrontOfCamera(particlesToRpostion[i]);
        }
    }

    /**
     * initite a dust field in front of the camera
     * @param {*} camera 
     */
    initiateDustField(numParticles: number) {
        for (let i = 0; i < numParticles; i++) {
            const dustParticle = this.createDustParticleAndAddToScene();
            dustParticle;
        }
    }

    /**
     * create dust particle and add to scene and array
     */
    createDustParticleAndAddToScene() {
        const dustParticle = this.createDustParticle();
        this._dustParticles.push(dustParticle);
        this.scene.add(dustParticle);
    }

    /**
     * reposition a dust particle in front of the camera
     */
    repostionParticleInFrontOfCamera(dustParticle: Dust, expectedDistanceInFront = 5) {
        // const forward = new THREE.Vector3();
        // this.mover.getWorldDirection(forward);
        // const forward = this.mover._velocity

        // const forwardDir = forward.clone().normalize();


        // const localToWorldForward = this.mover.localToWorld(forwardDir);
        // console.log("local to world", localToWorldForward);
        // const localForward = this.mover._rotation.clone().normalize();
        const localForward = new THREE.Vector3();
        this.mover.getWorldDirection(localForward);
        const invertedLocalForward = localForward.clone().negate();
        // console.log("local forward", localForward);
        // const forwardSpeed = velocoity.dot(forwardDir);
        // const forwardVelocityVec = forwardDir.multiplyScalar(forwardSpeed);
        const distanceInFront = (Math.random() * 3) + expectedDistanceInFront//expectedDistanceInFront + (Math.random() * 1);
        const randomOffset = new THREE.Vector3(
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10
        );
        // console.log("random offset", randomOffset)
        // console.log("distance in front", distanceInFront);

        // console.log("repositioned distance from mover", dustParticle.position.distanceTo(this.mover.position));
        dustParticle.position.copy(this.mover.position).add(invertedLocalForward.multiplyScalar(distanceInFront)).add(randomOffset);
        // console.log("distance from mover", this.mover.position.distanceTo(dustParticle.position));
    }

    /**
     * create a single dust particle and place it in front of the camera
     * @param {} camera 
     * @returns 
     */
    createDustParticle(expectedDistanceInFront: number = 1) {
        expectedDistanceInFront;
        //create a dust particle at random x, y in front of the camera
        const dustParticle = new Dust(0xAAAAAA);
        //get the forward vector direction of the camera
        const forward = new THREE.Vector3();
        this.mover.getWorldDirection(forward);
        //create a dust particle in front of the forward vector
        // const distanceInFront = ((Math.random() - 5) * 5) + expectedDistanceInFront//expectedDistanceInFront + (Math.random() * 1);
        const distanceInFront = 0;
        const randomOffset = new THREE.Vector3(
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20
        );
        dustParticle.position.copy(this.mover.position).add(forward.multiplyScalar(distanceInFront)).add(randomOffset);
        // console.log("created distance from mover", dustParticle.position.distanceTo(this.mover.position));
        return dustParticle;
    }

    /**
     * check if a dust particle is behind the camera
     * may not use anymore.
     */
    isDustParticleBehindCamera(dustParticle: Dust) {
        const forward = new THREE.Vector3();
        this.mover.getWorldDirection(forward);
        // vector from camera to particle
        const toParticle = new THREE.Vector3().subVectors(dustParticle.position, this.mover.position).normalize();
        // dot > 0 -> in front, dot < 0 -> behind
        return toParticle.dot(forward) < 0;
    }

    /** 
     * check if dust particle is out of range of mover
     */
    isDustParticleOutOfRange(dustParticle: Dust, mover: Mover) {
        const distance = dustParticle.position.distanceTo(mover.position);
        if (distance > 12) {
            return true;
        }
        return false;
    }
}